"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CAMERA_SETUP, PHOTOS, type Photo } from "@/lib/content";

/**
 * Three.js is heavy (~500KB gz) and only needed inside the Photography
 * section. Lazy-load it so the initial page bundle stays lean; the viewer
 * boots when this component mounts and the observer scrolls the section into
 * view. `ssr: false` keeps the r3f Canvas out of the server render.
 */
const CameraViewer = dynamic(
  () => import("./CameraViewer").then((m) => m.CameraViewer),
  {
    ssr: false,
    loading: () => <div className="camera-viewer camera-viewer--loading" />,
  }
);

/**
 * Deterministic split used for SSR and the first client render. Once the
 * component mounts we swap in a fresh Fisher-Yates shuffle so every visit
 * gets a new order. Splitting server + client this way keeps hydration happy
 * and avoids a flash of empty marquees.
 */
const SSR_ROW_A: Photo[] = PHOTOS.filter((_, i) => i % 2 === 0);
const SSR_ROW_B: Photo[] = PHOTOS.filter((_, i) => i % 2 === 1);

function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [shuffled, setShuffled] = useState(false);

  useEffect(() => {
    setShuffled(true);
  }, []);

  const [rowA, rowB] = useMemo<[Photo[], Photo[]]>(() => {
    if (!shuffled) return [SSR_ROW_A, SSR_ROW_B];
    const mixed = shuffle(PHOTOS);
    return [
      mixed.filter((_, i) => i % 2 === 0),
      mixed.filter((_, i) => i % 2 === 1),
    ];
  }, [shuffled]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((delta: number) => {
    setOpen((i) =>
      i === null ? null : (i + delta + PHOTOS.length) % PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = document.body.style.cssText;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.cssText = prev;
    };
  }, [open, close, step]);

  const currentPhoto = open !== null ? PHOTOS[open] : null;

  return (
    <>
      {/* ---------- Camera showcase ---------- */}
      <div className="camera-showcase">
        <div className="camera-showcase__stage">
          <CameraViewer />
          <span className="camera-showcase__hint" aria-hidden="true">
            Drag to rotate · Scroll to zoom
          </span>
        </div>

        <aside className="glass panel camera-showcase__spec">
          <span className="eyebrow">Shot on</span>
          <h3 className="camera-showcase__body">{CAMERA_SETUP.body}</h3>
          <p className="camera-showcase__lens">{CAMERA_SETUP.lens}</p>

          <dl className="camera-showcase__meta">
            <div>
              <dt>Sensor</dt>
              <dd>{CAMERA_SETUP.sensor}</dd>
            </div>
            <div>
              <dt>Mount</dt>
              <dd>{CAMERA_SETUP.mount}</dd>
            </div>
          </dl>

          <p className="camera-showcase__notes">{CAMERA_SETUP.notes}</p>
        </aside>
      </div>

      {/* ---------- Photo marquees ---------- */}
      <div className="marquees">
        <Marquee photos={rowA} direction="right" onOpen={setOpen} />
        <Marquee photos={rowB} direction="left" onOpen={setOpen} />
      </div>

      {/* ---------- Lightbox ---------- */}
      {currentPhoto !== null && open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={close}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={close}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photograph"
          >
            &#8249;
          </button>

          <figure
            className="lightbox__figure"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt ?? currentPhoto.caption ?? ""}
              fill
              sizes="90vw"
              quality={88}
              priority
            />

            {(currentPhoto.caption || currentPhoto.location) && (
              <figcaption className="lightbox__caption">
                {currentPhoto.caption && (
                  <span className="lightbox__caption-text">
                    {currentPhoto.caption}
                  </span>
                )}
                {currentPhoto.location && (
                  <span className="lightbox__caption-loc">
                    {currentPhoto.location}
                  </span>
                )}
              </figcaption>
            )}
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photograph"
          >
            &#8250;
          </button>

          <span className="lightbox__count">
            {open + 1} / {PHOTOS.length}
          </span>
        </div>
      )}
    </>
  );
}

function Marquee({
  photos,
  direction,
  onOpen,
}: {
  photos: Photo[];
  direction: "left" | "right";
  onOpen: (i: number) => void;
}) {
  const track = [...photos, ...photos];

  return (
    <div className="marquee">
      <ul className={`marquee__track marquee__track--${direction}`}>
        {track.map((photo, i) => {
          const isClone = i >= photos.length;
          const lightboxIndex = PHOTOS.findIndex((p) => p.src === photo.src);

          return (
            <li
              key={`${photo.src}-${i}`}
              className="marquee__item"
              aria-hidden={isClone || undefined}
            >
              <button
                type="button"
                className="marquee__btn"
                onClick={() => onOpen(lightboxIndex)}
                tabIndex={isClone ? -1 : undefined}
                aria-label={`Open photograph ${lightboxIndex + 1} of ${PHOTOS.length}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 700px) 60vw, 30vw"
                  quality={78}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

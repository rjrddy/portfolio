"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PHOTOS, type Photo } from "@/lib/content";

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

  // One shuffle per page load. The shuffle runs after mount, so the server
  // and the initial client render both use the deterministic split above.
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
    setOpen((i) => (i === null ? null : (i + delta + PHOTOS.length) % PHOTOS.length));
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

  return (
    <>
      <div className="marquees">
        <Marquee photos={rowA} direction="right" onOpen={setOpen} />
        <Marquee photos={rowB} direction="left" onOpen={setOpen} />
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={close}
        >
          <button type="button" className="lightbox__close" onClick={close} aria-label="Close">
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

          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <Image
              src={PHOTOS[open].src}
              alt={PHOTOS[open].alt ?? ""}
              fill
              sizes="90vw"
              quality={88}
              priority
            />
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
  // The track holds the row twice. Each copy is exactly 50% of the track, so
  // translating by half its width lands on an identical frame — that's what
  // makes the loop seamless rather than snapping back.
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
                {/* Uncropped: the row fixes the height, width follows the
                    photo's own aspect ratio. */}
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

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CAMERAS, PHOTOS, type Photo } from "@/lib/content";

/**
 * The Photography section:
 *   1. A "Gear" strip with the two cameras.
 *   2. A masonry archive of every photo at its native aspect ratio, laid out
 *      via CSS columns so tall portraits and wide landscapes settle naturally
 *      next to each other.
 *   3. A lightbox that respects the source order for keyboard navigation.
 */

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

  // Shuffle the archive order once per page load. Keeps hydration clean by
  // starting from source order and reshuffling on the client after mount.
  useEffect(() => {
    setShuffled(true);
  }, []);

  const archive = useMemo(
    () => (shuffled ? shuffle(PHOTOS) : PHOTOS),
    [shuffled]
  );

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((delta: number) => {
    setOpen((i) =>
      i === null ? null : (i + delta + PHOTOS.length) % PHOTOS.length
    );
  }, []);

  const openAt = useCallback((photo: Photo) => {
    setOpen(PHOTOS.findIndex((p) => p.src === photo.src));
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
      {/* -------------------- Gear -------------------- */}
      <div className="gallery-subhead">
        <span className="eyebrow">The gear</span>
        <span className="gallery-subhead__aside">Two systems</span>
      </div>

      <div className="camera-credits">
        {CAMERAS.map((cam) => (
          <article key={cam.body} className="glass panel camera-credits__card">
            <span className="camera-credits__kind">{cam.kind}</span>
            <h3 className="camera-credits__body">{cam.body}</h3>
            <p className="camera-credits__lens">{cam.lens}</p>

            <dl className="camera-credits__meta">
              <div>
                <dt>Format</dt>
                <dd>{cam.format}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      {/* -------------------- Archive masonry -------------------- */}
      <div className="gallery-subhead">
        <span className="eyebrow">The archive</span>
        <span className="gallery-subhead__aside">
          {PHOTOS.length} frames
        </span>
      </div>

      <ul className="gallery-masonry">
        {archive.map((photo) => (
          <li key={photo.src} className="gallery-masonry__cell">
            <button
              type="button"
              className="gallery-masonry__btn"
              onClick={() => openAt(photo)}
              aria-label={
                photo.caption ??
                photo.location ??
                "Open photograph in lightbox"
              }
            >
              <Image
                src={photo.src}
                alt={photo.alt ?? photo.caption ?? ""}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 700px) 50vw, (max-width: 1200px) 33vw, 300px"
                quality={78}
              />
              {(photo.caption || photo.location) && (
                <span className="gallery-masonry__overlay">
                  {photo.caption && (
                    <span className="gallery-masonry__caption">
                      {photo.caption}
                    </span>
                  )}
                  {photo.location && (
                    <span className="gallery-masonry__loc">
                      {photo.location}
                    </span>
                  )}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* -------------------- Lightbox -------------------- */}
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

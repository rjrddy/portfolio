"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PHOTOS } from "@/lib/content";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

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
    // Preserve the scrollbar's width so the page doesn't jolt sideways.
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
      <ul className="gallery">
        {PHOTOS.map((photo, i) => (
          <li key={photo.src} className="gallery__cell">
            <button
              type="button"
              className="gallery__btn"
              onClick={() => setOpen(i)}
              aria-label={`Open photograph ${i + 1} of ${PHOTOS.length}`}
            >
              {/* Intrinsic width/height — the frame takes the photo's shape,
                  rather than the photo being cropped to fit the frame. */}
              <Image
                src={photo.src}
                alt={photo.alt ?? ""}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                quality={78}
              />
            </button>
          </li>
        ))}
      </ul>

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

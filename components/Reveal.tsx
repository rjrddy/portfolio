"use client";

import { useEffect } from "react";

/**
 * Watches every `.reveal` on the page and flips them to `.is-visible` the first
 * time they enter the viewport. One-shot: unobserved after firing.
 *
 * Actual animations live in globals.css, keyed per section by id so each one
 * gets its own signature entrance.
 */
export function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    if (targets.length === 0) return;

    if (reduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

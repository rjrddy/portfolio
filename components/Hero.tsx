"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";

const TEXT = `Hi, I'm ${SITE.name}.`;
const HOLD_MS = 700;
const SPEED_MS = 70;

type Phase = "hold" | "typing" | "done";

export function Hero() {
  const [phase, setPhase] = useState<Phase>("hold");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    // Respect users who'd rather not watch it type itself out.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(TEXT);
      setPhase("done");
      return;
    }

    const t = setTimeout(() => setPhase("typing"), HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TEXT.slice(0, i));
      if (i >= TEXT.length) {
        clearInterval(id);
        setPhase("done");
      }
    }, SPEED_MS);

    return () => clearInterval(id);
  }, [phase]);

  const done = phase === "done";

  return (
    <section id="home" className="hero">
      <div className="hero__inner" data-phase={phase}>
        <h1 className="hero__title">
          <span>{typed}</span>
          <span className={`hero__caret${done ? " hero__caret--blink" : ""}`} />
        </h1>

        <p className="hero__tagline" data-visible={done}>
          {SITE.tagline}
        </p>
      </div>

      <a href="#about" className="hero__scroll" data-visible={done} aria-label="Scroll to content">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

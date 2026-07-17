"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/content";

type Pos = { left: number; width: number };

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [pillPos, setPillPos] = useState<Pos | null>(null);
  const [pillOn, setPillOn] = useState(false);
  const [glow, setGlow] = useState<{ x: number; y: number; on: boolean }>({
    x: 0,
    y: 0,
    on: false,
  });

  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  /* --- Scroll: nav visibility + active section ---------------------- */
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.35);

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        setActive(NAV[NAV.length - 1].id);
        return;
      }

      let current = "home";
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Lock scroll while menu is open ------------------------------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* --- Position the sliding pill under the active link -------------- *
   * Position is set first (invisibly), then opacity flips on a
   * subsequent frame — so the pill fades in at its target rather than
   * appearing to slide out from (0,0) on first show.                    */
  useEffect(() => {
    const measure = () => {
      const listEl = listRef.current;
      const el = linkRefs.current.get(active);
      if (!listEl || !el || active === "home") {
        setPillOn(false);
        return;
      }
      const listRect = listEl.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setPillPos({ left: rect.left - listRect.left, width: rect.width });
      requestAnimationFrame(() => setPillOn(true));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <nav
      className={[
        "nav",
        visible && "nav--visible",
        menuOpen && "nav--open",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="glass nav__inner"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setGlow({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            on: true,
          });
        }}
        onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
      >
        <span
          className="nav__glow"
          data-on={glow.on}
          style={
            {
              "--nav-glow-x": `${glow.x}px`,
              "--nav-glow-y": `${glow.y}px`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />

        <a
          href="#home"
          className="nav__brand"
          onClick={() => setMenuOpen(false)}
        >
          RR
        </a>

        <ul className="nav__list" ref={listRef}>
          {pillPos && (
            <span
              className="nav__pill"
              data-on={pillOn}
              style={{
                transform: `translateX(${pillPos.left}px)`,
                width: pillPos.width,
              }}
              aria-hidden="true"
            />
          )}

          {NAV.map((item) => (
            <li key={item.id}>
              <a
                ref={(el) => {
                  if (el) linkRefs.current.set(item.id, el);
                  else linkRefs.current.delete(item.id);
                }}
                href={`#${item.id}`}
                className={`nav__link${
                  active === item.id ? " nav__link--active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nav__toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

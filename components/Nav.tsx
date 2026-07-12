"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.35);

      // At the page bottom the final section never clears the threshold, so
      // claim it outright — otherwise the nav stays stuck on the one before.
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      <div className="glass nav__inner">
        <a href="#home" className="nav__brand" onClick={() => setMenuOpen(false)}>
          RR
        </a>

        <ul className="nav__list">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav__link${active === item.id ? " nav__link--active" : ""}`}
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
          aria-label="Toggle navigation"
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

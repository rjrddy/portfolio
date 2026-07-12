"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TYPED_TEXT = "Hi, I'm Raj Reddy.";
const BG_HOLD_MS = 1000;
const TYPING_SPEED_MS = 75;

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "photography", label: "Photography" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
] as const;

const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: [
      "Python",
      "Java",
      "C#",
      "C",
      "C++",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "SQL",
    ],
  },
  {
    title: "Frameworks & Runtimes",
    items: ["React", "Next.js", "Node.js", "Django", ".NET", "MAUI", "Qt", "MSTest"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "Docker", "Linux / Unix", "Azure", "VS Code"],
  },
  {
    title: "Data",
    items: ["MySQL", "SQL", "LINQ"],
  },
  {
    title: "Interests",
    items: [
      "Algorithms",
      "Computer Vision",
      "AI / ML",
      "Photography",
      "Music",
      "Astronomy",
    ],
  },
];

const PHOTOS: string[] = [
  "/photos/_DSF3104.jpg",
  "/photos/_DSF0608.jpg",
  "/photos/_DSF0724.jpg",
  "/photos/_DSF1065.jpg",
  "/photos/_DSF1450.jpg",
  "/photos/_DSF1957.jpg",
  "/photos/_DSF2819.jpg",
  "/photos/_DSF3154.jpg",
  "/photos/_DSF3311.jpg",
  "/photos/_DSF3342.jpg",
  "/photos/_DSF3424.jpg",
];

const PROJECTS: {
  title: string;
  img: string;
  tags: string[];
  link: string | null;
}[] = [
  {
    title: "LMS Application",
    img: "/assets/works/login_page.jpg",
    tags: ["SQL", "C#", "LINQ"],
    link: null,
  },
  {
    title: "Snake Game: Client & Server",
    img: "/assets/works/snake.png",
    tags: ["C#", ".NET", "MAUI"],
    link: null,
  },
  {
    title: "Bitwise: A Circuit Learning App",
    img: "/assets/works/sprite_editor.png",
    tags: ["C++", "Qt"],
    link: "https://github.com/AhmedZ70/SpriteEditor",
  },
  {
    title: "Spreadsheet Application",
    img: "/assets/works/spreadsheet.png",
    tags: ["C#", ".NET", "MAUI"],
    link: null,
  },
  {
    title: "Flappy Bird",
    img: "/assets/works/flappy_bird.jpg",
    tags: ["Python", "PyGame"],
    link: "https://github.com/rjrddy/Flappy-Bird",
  },
  {
    title: "To-Do List Website",
    img: "/assets/works/to-do_website.png",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/rjrddy/To-Do-List",
  },
];

type Phase = "bg" | "typing" | "done";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("bg");
  const [typed, setTyped] = useState("");
  const [navVisible, setNavVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), BG_HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(TYPED_TEXT.slice(0, i));
      if (i >= TYPED_TEXT.length) {
        clearInterval(interval);
        setPhase("done");
      }
    }, TYPING_SPEED_MS);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavVisible(y > window.innerHeight * 0.35);

      let current: string = "home";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) current = item.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="page-bg" aria-hidden="true">
        <Image
          src="/photos/_DSF3104.jpg"
          alt=""
          fill
          priority
          quality={82}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <nav
        className={`floating-nav${navVisible ? " floating-nav--visible" : ""}${
          menuOpen ? " floating-nav--open" : ""
        }`}
      >
        <div className="glass floating-nav__inner">
          <a href="#home" className="floating-nav__brand" onClick={closeMenu}>
            RR
          </a>
          <ul className="floating-nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`floating-nav__link${
                    activeSection === item.id ? " active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="floating-nav__toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero__intro" data-phase={phase}>
            <h1 className="hero__title">
              <span className="hero__typed">{typed}</span>
              <span
                className={`hero__caret${
                  phase === "done" ? " hero__caret--blink" : ""
                }`}
              />
            </h1>
            <p
              className="hero__subtitle"
              data-visible={phase === "done" ? "true" : "false"}
            >
              Software engineer. Photographer. Curious mind.
            </p>
          </div>
          <a
            href="#about"
            className="hero__scroll"
            data-visible={phase === "done" ? "true" : "false"}
            aria-label="Scroll to content"
          >
            <span>Scroll</span>
            <span className="hero__scroll-arrow" />
          </a>
        </section>

        <section id="about" className="section">
          <div className="section__container">
            <h2 className="section__title">About</h2>
            <article className="glass card card--wide">
              <p className="card__body card__body--lead">
                I&apos;m a senior studying Computer Science at the University of
                Utah with a Physics minor, graduating May 2025. I love turning
                complex problems into elegant software — from advanced
                algorithms and computer vision to full-stack applications.
              </p>
              <p className="card__body">
                Outside of code, I chase light with a camera, read, play soccer,
                and practice guitar. I like sitting at the intersection of
                things: engineering with music, computer vision with astronomy,
                systems thinking with storytelling.
              </p>
            </article>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section__container">
            <h2 className="section__title">Experience</h2>
            <div className="card-grid">
              <article className="glass card">
                <span className="card__eyebrow">Education</span>
                <h3 className="card__title">University of Utah</h3>
                <p className="card__meta">B.S. Computer Science · Physics Minor</p>
                <p className="card__meta">Salt Lake City, UT · May 2025</p>
                <p className="card__body">
                  Relevant coursework: Algorithms, Software Practice I &amp; II,
                  Database Systems, Computer Networking, Computer Organization,
                  Data Structures, Foundations of Data Analysis, Image
                  Processing, and Computer Vision.
                </p>
              </article>
              <article className="glass card">
                <span className="card__eyebrow">Community</span>
                <h3 className="card__title">Clubs &amp; Activities</h3>
                <p className="card__body">
                  Technical Coding Club · Society of Hispanic Professional
                  Engineers (SHPE) · Software Development Club.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section__container">
            <h2 className="section__title">Skills</h2>
            <div className="card-grid card-grid--skills">
              {SKILL_GROUPS.map((group) => (
                <article key={group.title} className="glass card">
                  <span className="card__eyebrow">{group.title}</span>
                  <div className="badges">
                    {group.items.map((item) => (
                      <span key={item} className="badge">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="photography" className="section section--photography">
          <div className="section__container">
            <h2 className="section__title">Photography</h2>
            <p className="section__lead">
              A few of my favorite frames. The featured shot is the one you see
              behind everything.
            </p>
          </div>
          <div className="marquee">
            <div className="marquee__track">
              {PHOTOS.map((src, i) => (
                <figure key={`a-${i}`} className="glass marquee__item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Photograph by Raj Reddy" />
                </figure>
              ))}
              {PHOTOS.map((src, i) => (
                <figure
                  key={`b-${i}`}
                  className="glass marquee__item"
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section__container">
            <h2 className="section__title">Projects</h2>
            <div className="card-grid card-grid--projects">
              {PROJECTS.map((project) => {
                const inner = (
                  <article className="glass card card--project">
                    <div className="card__img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.img} alt={project.title} />
                    </div>
                    <div className="card--project__meta">
                      <h3 className="card__title">{project.title}</h3>
                      <div className="badges">
                        {project.tags.map((tag) => (
                          <span key={tag} className="badge">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
                return project.link ? (
                  <a
                    key={project.title}
                    href={project.link}
                    className="card-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={project.title} className="card-link">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="connect" className="section">
          <div className="section__container">
            <h2 className="section__title">Connect</h2>
            <article className="glass card card--wide connect-card">
              <p className="card__body card__body--lead">
                Let&apos;s make something.
              </p>
              <div className="connect-actions">
                <a
                  href="/assets/works/Raj_Reddy_Resume.pdf"
                  className="glass-btn glass-btn--accent"
                  download="Raj_Reddy_Resume.pdf"
                >
                  Resume
                </a>
                <a href="mailto:rajreddy23@outlook.com" className="glass-btn">
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/raj-reddy1"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rjrddy"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn"
                >
                  GitHub
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

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
    items: ["Python", "Java", "C++", "TypeScript", "C", "SQL"],
  },
  {
    title: "Software",
    items: [
      "Pandas",
      "NumPy",
      "React",
      "Node.js",
      "AWS",
      "Azure",
      "Docker",
      "Next.js",
      ".NET",
      "REST",
      "Django",
      "MongoDB",
      "Linux",
    ],
  },
  {
    title: "Interests",
    items: [
      "Embedded Systems",
      "Machine Learning",
      "Computer Vision",
      "Photography",
      "Music",
      "Astronomy",
    ],
  },
];

const EXPERIENCE: {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
}[] = [
  {
    company: "L3Harris Technologies",
    role: "Associate Software Engineer",
    location: "Dallas, TX",
    dates: "June 2025 – Present",
    bullets: [
      "Developed signal processing modules in Python and C++ on embedded systems, collaborating with hardware teams to optimize performance and resource utilization.",
      "Built microservices for high-frequency data ingestion, processing, and storage, leveraging Podman and serverless functions.",
      "Automated CI/CD testing with pipelines, integrating static code analysis and integration testing.",
    ],
  },
  {
    company: "Doxy.me",
    role: "Software Engineering Research Associate",
    location: "Charleston, SC",
    dates: "August 2024 – May 2025",
    bullets: [
      "Built transformer-based models with PyTorch and Llama, integrating WebRTC for real-time video streaming.",
      "Deployed inference pipelines on SageMaker & Fargate, improving diagnostic accuracy with reinforcement learning.",
    ],
  },
  {
    company: "University of Utah",
    role: "Undergraduate Research Assistant — FuTURES Lab",
    location: "Salt Lake City, UT",
    dates: "May 2024 – June 2025",
    bullets: [
      "Analyzed and optimized large-scale datasets, enhancing software configuration testing with tools like gcov and CMake, increasing code coverage by 30% on real-world APIs such as Libpng and PyTorch.",
      "Expanded OSS-Fuzz testing coverage, using compile-time options to improve the robustness of full-stack libraries.",
    ],
  },
  {
    company: "HEXstream",
    role: "Software Engineering Intern",
    location: "Chicago, IL",
    dates: "May 2022 – August 2022",
    bullets: [
      "Engineered backend ETL pipelines integrating data from 25+ enterprise sources into Azure SQL and Azure Data Lake.",
      "Developed automated workflows for ingestion, cleansing, and aggregation, supporting distributed analytics systems.",
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
  description: string;
  tags: string[];
  link: string | null;
}[] = [
  {
    title: "Course Planning & Review Platform",
    description:
      "Multi-service data platform for student schedule matching, course overlap detection, and behavioral insights. ETL pipelines process thousands of course records with interactive dashboards and calendar visualizations. Won class best project.",
    tags: ["Python", "React", "Tailwind", "ETL"],
    link: null,
  },
  {
    title: "Accountability Tracker",
    description:
      "Full-stack app for managing daily goals and recurring tasks. Features Firebase Auth, localStorage guest support, and PostgreSQL with Prisma for persistent data. Includes progress visualizations and social features.",
    tags: ["Next.js", "TypeScript", "Firebase", "PostgreSQL", "Prisma"],
    link: null,
  },
  {
    title: "Ray Tracing Engine",
    description:
      "Interactive WebGL-based ray tracing engine with realistic reflections, dynamic lighting, and customizable environment maps. Implemented shaders and user controls for rendering techniques and scene adjustments.",
    tags: ["JavaScript", "WebGL", "GLSL"],
    link: null,
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
                I&apos;m a software engineer at L3Harris Technologies, working
                on embedded signal processing systems and data infrastructure.
                I graduated from the University of Utah in May 2025 with a
                B.S. in Computer Science.
              </p>
              <p className="card__body">
                My interests span embedded systems, machine learning, and
                full-stack development. I enjoy building things that solve real
                problems — whether that&apos;s optimizing signal processing
                pipelines, training transformer models, or crafting interactive
                web applications.
              </p>
              <p className="card__body">
                Outside of work, I chase light with a camera, read, play soccer,
                and practice guitar.
              </p>
            </article>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section__container">
            <h2 className="section__title">Experience</h2>
            <div className="timeline">
              {EXPERIENCE.map((job) => (
                <article key={job.company} className="glass card timeline__item">
                  <div className="timeline__header">
                    <div>
                      <h3 className="card__title">{job.company}</h3>
                      <p className="timeline__role">{job.role}</p>
                    </div>
                    <div className="timeline__meta">
                      <span>{job.location}</span>
                      <span>{job.dates}</span>
                    </div>
                  </div>
                  <ul className="timeline__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="glass card timeline__item">
                <div className="timeline__header">
                  <div>
                    <h3 className="card__title">University of Utah</h3>
                    <p className="timeline__role">
                      B.S. Computer Science · Graduated May 2025
                    </p>
                  </div>
                  <div className="timeline__meta">
                    <span>Salt Lake City, UT</span>
                    <span>Education</span>
                  </div>
                </div>
                <p className="card__body">
                  Coursework: Computer Systems, Machine Learning, Computer
                  Graphics, Algorithms, Software Practice I &amp; II, Database
                  Systems, Computer Networks, Foundations of Data Analysis,
                  Models of Computation, and Linear Algebra.
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
              {PROJECTS.map((project, i) => {
                const inner = (
                  <article className="glass card card--project">
                    <div className="card--project__index">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="card__title">{project.title}</h3>
                    <p className="card__body">{project.description}</p>
                    <div className="badges">
                      {project.tags.map((tag) => (
                        <span key={tag} className="badge">
                          {tag}
                        </span>
                      ))}
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

import Image from "next/image";

import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { TechIcon, TechRow } from "@/components/TechIcon";
import {
  ABOUT,
  EDUCATION,
  EXPERIENCE,
  HERO_PHOTO,
  INTERESTS,
  LANGUAGES,
  PROJECTS,
  SITE,
  SKILL_GROUPS,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <Image src={HERO_PHOTO} alt="" fill priority quality={80} sizes="100vw" />
      </div>

      <Nav />
      <Reveal />

      <main>
        <Hero />

        {/* ---------------------------------------------------------- About */}
        <Section id="about" title="About">
          <div className="glass panel about">
            <p className="lead">{ABOUT[0]}</p>
            <div className="about__rest">
              {ABOUT.slice(1).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="about-languages">
            <span className="eyebrow">Languages</span>
            <ul className="languages">
              {LANGUAGES.map((lang) => (
                <li key={lang.name} className="glass panel language">
                  <h3 className="language__name">{lang.name}</h3>
                  {lang.native && (
                    <p className="language__native">{lang.native}</p>
                  )}
                  <span className="language__level">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ----------------------------------------------------- Experience */}
        <Section id="experience" title="Experience">
          <ol className="timeline">
            {EXPERIENCE.map((job) => (
              <li key={job.company} className="glass panel role">
                <header className="role__head">
                  <BrandMark
                    logo={job.logo}
                    monogram={job.monogram}
                    name={job.company}
                  />
                  <div className="role__title-block">
                    <h3 className="role__company">{job.company}</h3>
                    <p className="role__title">{job.role}</p>
                  </div>
                  <div className="role__meta">
                    <span>{job.dates}</span>
                    <span>{job.location}</span>
                  </div>
                </header>

                <ul className="role__bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <TechRow items={job.stack} />
              </li>
            ))}

            <li className="glass panel role role--edu">
              <header className="role__head">
                <BrandMark
                  logo={EDUCATION.logo}
                  monogram={EDUCATION.monogram}
                  name={EDUCATION.school}
                />
                <div className="role__title-block">
                  <h3 className="role__company">{EDUCATION.school}</h3>
                  <p className="role__title">{EDUCATION.degree}</p>
                </div>
                <div className="role__meta">
                  <span>{EDUCATION.dates}</span>
                  <span>{EDUCATION.location}</span>
                </div>
              </header>

              <p className="role__coursework">
                <span className="eyebrow">Coursework</span>
                {EDUCATION.coursework.join(" · ")}
              </p>
            </li>
          </ol>
        </Section>

        {/* --------------------------------------------------------- Skills */}
        <Section id="skills" title="Skills">
          <div className="skills">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="glass panel skills__group">
                <span className="eyebrow">{group.title}</span>
                <ul className="skills__grid">
                  {group.items.map((key, i) => (
                    <li
                      key={key}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <TechIcon name={key} showLabel />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="glass panel skills__group skills__group--interests">
              <span className="eyebrow">Interests</span>
              <ul className="interests">
                {INTERESTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------------- Projects */}
        <Section id="projects" title="Projects">
          <div className="projects">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>

        {/* ---------------------------------------------------- Photography */}
        <Section id="photography" title="Photography" >
          <Gallery />
        </Section>

        {/* -------------------------------------------------------- Connect */}
        <Section id="connect" title="Connect">
          <div className="glass panel connect">
            <p className="lead">Let&apos;s make something.</p>
            <div className="connect__actions">
              <a href={SITE.resume} className="btn btn--accent" download>
                Resume
              </a>
              <a href={`mailto:${SITE.email}`} className="btn">
                Email
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="btn">
                LinkedIn
              </a>
              <a href={SITE.github} target="_blank" rel="noreferrer" className="btn">
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
      </footer>
    </>
  );
}

function BrandMark({
  logo,
  monogram,
  name,
}: {
  logo?: string | null;
  monogram: string;
  name: string;
}) {
  if (logo) {
    return (
      <span className="role__brand" aria-hidden="true">
        {/* Plain <img> so a missing file degrades to broken-image rather than
            hard-failing next/image at build. Swap to next/image once locked. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" />
      </span>
    );
  }
  return (
    <span
      className="role__brand role__brand--monogram"
      aria-label={`${name} logo`}
    >
      {monogram}
    </span>
  );
}

function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section reveal">
      <div className="section__inner">
        <header className="section__head">
          <h2 className="section__title">
            <span className="section__title-text">
              {title.split("").map((ch, i) => (
                <span
                  key={i}
                  className="section__title-char"
                  style={{ "--i": i } as React.CSSProperties}
                  aria-hidden="true"
                >
                  {ch === " " ? " " : ch}
                </span>
              ))}
              <span className="visually-hidden">{title}</span>
            </span>
          </h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

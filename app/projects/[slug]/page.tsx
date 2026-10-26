import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/Reveal";
import { TechRow } from "@/components/TechIcon";
import {
  HERO_PHOTO,
  PROJECT_PAGES,
  SITE,
  projectBySlug,
} from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECT_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.blurb}`;
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      type: "article",
      images: [project.image ?? HERO_PHOTO],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const demo = project.links.find((l) => l.kind === "demo");
  const others = project.links.filter((l) => l !== demo);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <Image src={HERO_PHOTO} alt="" fill priority quality={80} sizes="100vw" />
      </div>

      <Reveal />

      <main className="work">
        <div className="work__inner">
          <Link href="/#projects" className="work__back">
            <span aria-hidden="true">←</span> Projects
          </Link>

          <header className="glass panel work__head">
            <h1 className="work__title">{project.title}</h1>
            <p className="work__blurb">{project.blurb}</p>
            {project.tagline && <p className="work__tagline">{project.tagline}</p>}

            {(demo || others.length > 0) && (
              <div className="work__actions">
                {demo && (
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--accent btn--lg"
                  >
                    {demo.label}
                    <span className="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                )}
                {others.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--lg"
                  >
                    {link.label}
                    <span className="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
              </div>
            )}
          </header>

          {project.image && (
            <figure className="glass work__hero reveal page-reveal" style={delay(0)}>
              <Image
                src={project.image}
                alt={`A screenshot of ${project.title}.`}
                width={project.imageSize?.width ?? 2000}
                height={project.imageSize?.height ?? 764}
                sizes="(max-width: 1200px) 100vw, 1120px"
                quality={88}
                priority
              />
            </figure>
          )}

          {project.stats && (
            <ul className="work__stats reveal page-reveal" style={delay(1)}>
              {project.stats.map((stat) => (
                <li key={stat.label} className="glass work__stat">
                  <span className="work__stat-value">{stat.value}</span>
                  <span className="work__stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="work__lead reveal page-reveal" style={delay(2)}>
            {project.description}
          </p>

          {project.features && (
            <section className="work__section reveal page-reveal" style={delay(3)}>
              <h2 className="work__section-title">
                <span className="eyebrow">What it does</span>
              </h2>
              <ul className="work__features">
                {project.features.map((feature) => (
                  <li key={feature} className="glass work__feature">
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.shots && (
            <section className="work__section reveal page-reveal" style={delay(4)}>
              <h2 className="work__section-title">
                <span className="eyebrow">Inside the app</span>
              </h2>
              <div className="work__shots">
                {project.shots.map((shot) => (
                  <figure key={shot.src} className="glass work__shot">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(max-width: 900px) 100vw, 548px"
                      quality={88}
                    />
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {(project.howItWorks || project.builtWith || project.note) && (
            <section className="work__section reveal page-reveal" style={delay(5)}>
              <h2 className="work__section-title">
                <span className="eyebrow">How it works</span>
              </h2>
              <div className="glass panel work__method">
                {project.howItWorks?.map((para) => (
                  <p key={para}>{para}</p>
                ))}

                <div className="work__stack">
                  <span className="eyebrow">Built with</span>
                  {project.builtWith && <p>{project.builtWith}</p>}
                  <TechRow items={project.stack} showLabels />
                </div>

                {project.note && (
                  <p className="work__note">
                    <span className="eyebrow">A note on the numbers</span>
                    {project.note}
                  </p>
                )}
              </div>
            </section>
          )}

          {demo && (
            <div className="glass panel work__cta reveal page-reveal" style={delay(6)}>
              <p className="lead">Have a matchup in mind?</p>
              <a
                href={demo.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn--accent btn--lg"
              >
                {demo.label}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
      </footer>
    </>
  );
}

/** Stagger index for the page's entrance animation. */
function delay(i: number): React.CSSProperties {
  return { "--i": i } as React.CSSProperties;
}

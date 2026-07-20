"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { ProjectVisual } from "./ProjectVisual";
import { TechRow } from "./TechIcon";
import type { Project } from "@/lib/content";

/**
 * A project card that tilts subtly in 3D as the cursor moves across it,
 * plus a cursor-tracked accent glow underneath the surface. Transitions are
 * off while the pointer is inside (so tilt tracks fluidly) and re-enabled on
 * leave so the card eases back to rest.
 */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{
    rx: number;
    ry: number;
    px: number;
    py: number;
  } | null>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const nx = px * 2 - 1; // -1 (left) → 1 (right)
    const ny = py * 2 - 1; // -1 (top)  → 1 (bottom)
    setPointer({
      rx: -ny * 5, // pitch
      ry: nx * 7, // yaw
      px: px * 100,
      py: py * 100,
    });
  }, []);

  const onLeave = useCallback(() => setPointer(null), []);

  const primary = project.links[0];
  const tilting = pointer !== null;

  const style: React.CSSProperties = tilting
    ? {
        transform: `perspective(1100px) rotateX(${pointer.rx}deg) rotateY(${pointer.ry}deg)`,
        transition: "transform 120ms linear, box-shadow 250ms ease",
        "--pointer-x": `${pointer.px}%`,
        "--pointer-y": `${pointer.py}%`,
      } as React.CSSProperties
    : {
        transform: "perspective(1100px) rotateX(0) rotateY(0)",
        transition: "transform 550ms var(--ease), box-shadow 350ms ease",
      };

  const body = (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-tilting={tilting || undefined}
      className={`glass panel project${
        project.featured ? " project--featured" : ""
      }`}
      style={style}
    >
      <span className="project__sheen" aria-hidden="true" />

      <div className="project__media">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            quality={80}
          />
        ) : project.visual ? (
          <ProjectVisual kind={project.visual} />
        ) : (
          <div className="project__placeholder" aria-hidden="true">
            <TechRow items={project.stack.slice(0, 3)} />
          </div>
        )}
        {project.award && (
          <span className="project__award">{project.award}</span>
        )}
        {project.status && (
          <span
            className={`project__status project__status--${project.status}`}
          >
            {project.status === "in-progress" ? "In Progress" : "Planned"}
          </span>
        )}
      </div>

      <div className="project__body">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__blurb">{project.blurb}</p>
        <p className="project__desc">{project.description}</p>

        <TechRow items={project.stack} />

        {project.links.length > 0 && (
          <div className="project__links">
            {project.links.map((link) => (
              <span key={link.href} className="project__link">
                {link.label}
                <span aria-hidden="true">→</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  return primary ? (
    <a
      href={primary.href}
      className="project__wrap project__wrap--link"
      target="_blank"
      rel="noreferrer"
    >
      {body}
    </a>
  ) : (
    <div className="project__wrap">{body}</div>
  );
}

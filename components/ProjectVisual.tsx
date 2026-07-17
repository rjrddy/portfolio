import type { ProjectVisualKind } from "@/lib/content";

/**
 * Signature SVG artwork per project. Each visual sits in the media slot of the
 * project card and hints at what the project is about without needing a
 * screenshot. All artwork inherits the site's accent + muted-ink palette.
 */
export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  switch (kind) {
    case "schedule":
      return <Schedule />;
    case "checklist":
      return <Checklist />;
    case "sphere":
      return <Sphere />;
    case "waveform":
      return <Waveform />;
    case "network":
      return <Network />;
    case "beacon":
      return <Beacon />;
  }
}

/* ------------------------------------------------------------------ *
 * Schedule — five columns of course blocks, one accent-highlighted.
 * ------------------------------------------------------------------ */
function Schedule() {
  const cols: { blocks: { y: number; h: number; accent?: boolean }[] }[] = [
    { blocks: [{ y: 18, h: 34 }, { y: 90, h: 26 }] },
    { blocks: [{ y: 10, h: 28 }, { y: 62, h: 52 }] },
    { blocks: [{ y: 28, h: 46, accent: true }, { y: 108, h: 22 }] },
    { blocks: [{ y: 22, h: 40 }, { y: 88, h: 34 }] },
    { blocks: [{ y: 14, h: 30 }, { y: 74, h: 38 }, { y: 128, h: 12 }] },
  ];
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {[35, 65, 95, 125].map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2="190"
          y2={y}
          stroke="rgba(255,255,255,0.05)"
        />
      ))}
      {cols.map((col, i) =>
        col.blocks.map((b, j) => (
          <rect
            key={`${i}-${j}`}
            x={16 + i * 34}
            y={b.y}
            width="26"
            height={b.h}
            rx="3"
            fill={b.accent ? "var(--accent)" : "rgba(255,255,255,0.16)"}
            opacity={b.accent ? 0.9 : 1}
          />
        ))
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Checklist — half ticked (accent) and half open.
 * ------------------------------------------------------------------ */
function Checklist() {
  const rows: { checked: boolean; w: number }[] = [
    { checked: true, w: 92 },
    { checked: true, w: 118 },
    { checked: true, w: 78 },
    { checked: false, w: 104 },
    { checked: false, w: 82 },
    { checked: false, w: 96 },
  ];
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {rows.map((r, i) => {
        const y = 22 + i * 20;
        return (
          <g key={i}>
            <rect
              x="24"
              y={y - 6}
              width="12"
              height="12"
              rx="3"
              fill={r.checked ? "var(--accent)" : "none"}
              stroke={
                r.checked ? "var(--accent)" : "rgba(255,255,255,0.28)"
              }
              strokeWidth="1.2"
            />
            {r.checked && (
              <path
                d={`M27 ${y}l2.5 2.5 5-5`}
                stroke="#08090b"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <line
              x1="46"
              y1={y}
              x2={46 + r.w}
              y2={y}
              stroke={
                r.checked
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(255,255,255,0.38)"
              }
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Sphere — reflective ball with specular highlight.
 * ------------------------------------------------------------------ */
function Sphere() {
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sphere-shade" cx="35%" cy="30%" r="72%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="30%" stopColor="rgba(89,255,185,0.55)" />
          <stop offset="70%" stopColor="rgba(16,20,26,0.9)" />
          <stop offset="100%" stopColor="rgba(0,0,0,1)" />
        </radialGradient>
        <radialGradient id="sphere-spec" cx="30%" cy="22%" r="15%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      {/* ground plane suggestion */}
      <ellipse
        cx="100"
        cy="138"
        rx="60"
        ry="6"
        fill="rgba(0,0,0,0.55)"
        opacity="0.6"
      />
      <circle cx="100" cy="80" r="52" fill="url(#sphere-shade)" />
      <circle cx="86" cy="60" r="14" fill="url(#sphere-spec)" />
      {/* scene lights */}
      <circle cx="30" cy="30" r="1.6" fill="rgba(255,255,255,0.5)" />
      <circle cx="170" cy="40" r="1.2" fill="rgba(255,255,255,0.35)" />
      <circle cx="160" cy="115" r="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Waveform — 24 vertical bars that pulse in a staggered wave.
 * ------------------------------------------------------------------ */
function Waveform() {
  const bars = Array.from({ length: 24 });
  return (
    <svg
      className="project-art project-art--waveform"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {bars.map((_, i) => {
        // Bell-shaped envelope, tallest in the middle, so it reads like an
        // FFT band rather than random noise.
        const t = i / (bars.length - 1);
        const envelope = Math.sin(t * Math.PI);
        const h = 12 + envelope * 90;
        return (
          <rect
            key={i}
            x={12 + i * 7.4}
            y={80 - h / 2}
            width="4"
            height={h}
            rx="1.5"
            fill="var(--accent)"
            opacity={0.35 + envelope * 0.55}
            style={{
              transformOrigin: "center",
              transformBox: "fill-box",
              animation: `wave-pulse 1.4s ease-in-out ${i * 55}ms infinite`,
            }}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Network — a control node connected to a ring of worker nodes.
 * ------------------------------------------------------------------ */
function Network() {
  const centerX = 100;
  const centerY = 80;
  const radius = 48;
  const nodes = 7;
  const workers = Array.from({ length: nodes }, (_, i) => {
    const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {workers.map((n, i) => (
        <line
          key={`e-${i}`}
          x1={centerX}
          y1={centerY}
          x2={n.x}
          y2={n.y}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
        />
      ))}
      {workers.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r="4.5"
          fill="rgba(255,255,255,0.22)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
        />
      ))}
      <circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="var(--accent)"
        opacity="0.85"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r="16"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Beacon — concentric rings pulsing outward from a bright core.
 * ------------------------------------------------------------------ */
function Beacon() {
  return (
    <svg
      className="project-art project-art--beacon"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="100"
          cy="80"
          r="20"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.5"
          style={{
            transformOrigin: "100px 80px",
            animation: `beacon-ring 3.2s ease-out ${i * 1.05}s infinite`,
          }}
        />
      ))}
      <circle cx="100" cy="80" r="6" fill="var(--accent)" />
      <circle
        cx="100"
        cy="80"
        r="14"
        fill="var(--accent)"
        opacity="0.18"
      />
    </svg>
  );
}

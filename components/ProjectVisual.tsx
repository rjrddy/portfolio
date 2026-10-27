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
    case "streams":
      return <Streams />;
    case "pipeline":
      return <Pipeline />;
    case "ledger":
      return <Ledger />;
    case "voice":
      return <Voice />;
    case "gate":
      return <Gate />;
    case "signals":
      return <Signals />;
    case "pitch":
      return <Pitch />;
    case "venn":
      return <Venn />;
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

/* ------------------------------------------------------------------ *
 * Streams — three sensor tracks whose events line up on a watermark.
 * ------------------------------------------------------------------ */
function Streams() {
  // Each track fires at its own cadence; the watermark is where they agree.
  const tracks = [
    { y: 46, events: [22, 40, 61, 83, 104, 126, 150, 172] },
    { y: 80, events: [28, 47, 66, 90, 112, 126, 144, 166] },
    { y: 114, events: [18, 36, 58, 78, 99, 126, 152, 178] },
  ];
  const watermark = 126;
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {tracks.map((t) => (
        <g key={t.y}>
          <line
            x1="12"
            y1={t.y}
            x2="188"
            y2={t.y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          {t.events.map((x) => {
            const aligned = x === watermark;
            return (
              <rect
                key={x}
                x={x - 1.5}
                y={t.y - (aligned ? 9 : 5)}
                width="3"
                height={aligned ? 18 : 10}
                rx="1.5"
                fill={aligned ? "var(--accent)" : "rgba(255,255,255,0.3)"}
              />
            );
          })}
        </g>
      ))}
      {/* The watermark itself — everything to its left is settled. */}
      <line
        x1={watermark}
        y1="28"
        x2={watermark}
        y2="132"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.75"
      />
      <circle cx={watermark} cy="24" r="3" fill="var(--accent)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Pipeline — a workflow chain with a retry arc and a dead-letter stub.
 * ------------------------------------------------------------------ */
function Pipeline() {
  const nodes = [34, 76, 118, 160];
  const y = 72;
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {nodes.slice(0, -1).map((x, i) => (
        <line
          key={x}
          x1={x + 11}
          y1={y}
          x2={nodes[i + 1] - 11}
          y2={y}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
        />
      ))}

      {nodes.map((x, i) => (
        <rect
          key={x}
          x={x - 11}
          y={y - 11}
          width="22"
          height="22"
          rx="5"
          fill={i === 2 ? "var(--accent)" : "rgba(255,255,255,0.14)"}
          stroke={i === 2 ? "var(--accent)" : "rgba(255,255,255,0.32)"}
          strokeWidth="1"
          opacity={i === 2 ? 0.9 : 1}
        />
      ))}

      {/* Retry: the third step hands work back to the second. */}
      <path
        d="M118 55 C118 32, 76 32, 76 55"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
        opacity="0.65"
      />
      <path
        d="M73 51 l3 5 l3 -5"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Dead letter: what the last step gives up on. */}
      <line
        x1="160"
        y1={y + 13}
        x2="160"
        y2="112"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <rect
        x="149"
        y="112"
        width="22"
        height="16"
        rx="4"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Ledger — debits and credits mirrored across a centre rule.
 * ------------------------------------------------------------------ */
function Ledger() {
  // Every row balances: the two sides are always the same length.
  const rows = [34, 58, 70, 46, 62, 28];
  const mid = 100;
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {rows.map((w, i) => {
        const y = 28 + i * 18;
        const accent = i === 2;
        const fill = accent ? "var(--accent)" : "rgba(255,255,255,0.22)";
        return (
          <g key={i} opacity={accent ? 0.9 : 1}>
            <rect x={mid - 4 - w} y={y} width={w} height="9" rx="2" fill={fill} />
            <rect x={mid + 4} y={y} width={w} height="9" rx="2" fill={fill} />
          </g>
        );
      })}
      <line
        x1={mid}
        y1="18"
        x2={mid}
        y2="142"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />
      {/* Closing rule: the books tie out. */}
      <line
        x1="28"
        y1="136"
        x2="172"
        y2="136"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Voice — speech in, inference, speech out, cut short by a barge-in.
 * ------------------------------------------------------------------ */
function Voice() {
  const inBars = [14, 26, 40, 22, 34, 18];
  const outBars = [20, 36, 28, 44, 12, 24];
  const cut = 162; // where the caller interrupts
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {inBars.map((h, i) => {
        const x = 16 + i * 9;
        return (
          <rect
            key={`i-${i}`}
            x={x}
            y={80 - h / 2}
            width="4"
            height={h}
            rx="2"
            fill="rgba(255,255,255,0.34)"
          />
        );
      })}

      {/* The model in the middle. */}
      <line x1="72" y1="80" x2="84" y2="80" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
      <rect
        x="84"
        y="62"
        width="36"
        height="36"
        rx="9"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <circle cx="102" cy="80" r="5" fill="var(--accent)" opacity="0.85" />
      <line x1="120" y1="80" x2="132" y2="80" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

      {outBars.map((h, i) => {
        const x = 132 + i * 9;
        // Anything past the barge-in never reaches the speaker.
        const dropped = x >= cut;
        return (
          <rect
            key={`o-${i}`}
            x={x}
            y={80 - (dropped ? 6 : h) / 2}
            width="4"
            height={dropped ? 6 : h}
            rx="2"
            fill={dropped ? "rgba(255,255,255,0.14)" : "var(--accent)"}
            opacity={dropped ? 1 : 0.75}
          />
        );
      })}

      <line
        x1={cut - 4}
        y1="40"
        x2={cut - 4}
        y2="120"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Gate — a release check that splits a thin canary off the main path.
 * ------------------------------------------------------------------ */
function Gate() {
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Traffic arriving at the gate. */}
      <line
        x1="14"
        y1="80"
        x2="78"
        y2="80"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* The gate: two posts with a gap only passing builds get through. */}
      <rect x="84" y="30" width="5" height="34" rx="2" fill="var(--accent)" />
      <rect x="84" y="96" width="5" height="34" rx="2" fill="var(--accent)" />

      {/* Stable traffic carries straight on. */}
      <line
        x1="96"
        y1="80"
        x2="178"
        y2="80"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* The canary: a thin slice peeled off and watched. */}
      <path
        d="M96 76 C124 76, 134 46, 170 46"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="170" cy="46" r="4" fill="var(--accent)" />

      {/* Rollback: the way back if the canary goes bad. */}
      <path
        d="M160 116 A26 26 0 1 1 134 90"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <path
        d="M130 86 l4 4 l-4 4"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Signals — three modality lanes graded by intensity, with the flagged
 * moment lining up across all of them under a playhead.
 * ------------------------------------------------------------------ */
function Signals() {
  // Each lane is one modality; each number is a segment's intensity 0-3,
  // where 3 is the flagged moment the three lanes agree on.
  const lanes = [
    [1, 1, 2, 1, 3, 2, 1, 1],
    [1, 2, 1, 2, 3, 1, 2, 1],
    [0, 1, 1, 1, 3, 1, 1, 0],
  ];
  const x0 = 26;
  const segW = 19;
  const gap = 2;
  const playhead = x0 + 4 * segW + segW / 2;

  const shade = (v: number) =>
    v === 3 ? "var(--accent)" : `rgba(255,255,255,${0.08 + v * 0.1})`;

  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lanes.map((lane, i) => {
        const y = 54 + i * 26;
        return (
          <g key={i}>
            {/* Lane label dot — audio, language, vision. */}
            <circle cx="16" cy={y + 6} r="2.5" fill="rgba(255,255,255,0.28)" />
            {lane.map((v, j) => (
              <rect
                key={j}
                x={x0 + j * segW}
                y={y}
                width={segW - gap}
                height="12"
                rx="2.5"
                fill={shade(v)}
                opacity={v === 3 ? 0.9 : 1}
              />
            ))}
          </g>
        );
      })}

      {/* The playhead, and the flag it has been dragged to. */}
      <line
        x1={playhead}
        y1="36"
        x2={playhead}
        y2="124"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <path
        d={`M${playhead - 5} 30 l10 0 l-5 7 z`}
        fill="var(--accent)"
      />
      <circle cx={playhead} cy="130" r="2.5" fill="var(--accent)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Pitch — a shot map: two sides attacking opposite ends, one goal.
 * ------------------------------------------------------------------ */
function Pitch() {
  // x, y, radius (bigger = higher xG), and whether it found the net.
  const shots = [
    { x: 56, y: 62, r: 3, goal: false },
    { x: 48, y: 78, r: 4.5, goal: false },
    { x: 62, y: 86, r: 3.5, goal: false },
    { x: 52, y: 98, r: 3, goal: false },
    { x: 68, y: 70, r: 2.5, goal: false },
    { x: 44, y: 88, r: 5, goal: true },
    { x: 144, y: 58, r: 3, goal: false },
    { x: 150, y: 74, r: 4, goal: false },
    { x: 136, y: 84, r: 3, goal: false },
    { x: 152, y: 96, r: 4.5, goal: false },
    { x: 130, y: 66, r: 2.5, goal: false },
  ];
  const line = "rgba(255,255,255,0.22)";
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* The pitch: touchlines, halfway, centre circle, both boxes. */}
      <rect
        x="16"
        y="30"
        width="168"
        height="100"
        rx="3"
        fill="rgba(255,255,255,0.03)"
        stroke={line}
        strokeWidth="1"
      />
      <line x1="100" y1="30" x2="100" y2="130" stroke={line} strokeWidth="1" />
      <circle cx="100" cy="80" r="16" fill="none" stroke={line} strokeWidth="1" />
      <circle cx="100" cy="80" r="1.6" fill={line} />
      <rect x="16" y="56" width="26" height="48" fill="none" stroke={line} strokeWidth="1" />
      <rect x="158" y="56" width="26" height="48" fill="none" stroke={line} strokeWidth="1" />
      <rect x="16" y="70" width="9" height="20" fill="none" stroke={line} strokeWidth="1" />
      <rect x="175" y="70" width="9" height="20" fill="none" stroke={line} strokeWidth="1" />

      {shots.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.goal ? "var(--accent)" : "rgba(255,255,255,0.3)"}
          stroke={s.goal ? "var(--accent)" : "rgba(255,255,255,0.45)"}
          strokeWidth="0.8"
          opacity={s.goal ? 0.95 : 1}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Venn — three overlapping outcome lobes, each carrying its share.
 * Numbers are the simulator's own home/draw/away split.
 * ------------------------------------------------------------------ */
function Venn() {
  const r = 34;
  const lobes = [
    { cx: 80, cy: 66, label: "32%", lx: 58, ly: 50, accent: false },
    { cx: 120, cy: 66, label: "24%", lx: 142, ly: 50, accent: false },
    { cx: 100, cy: 102, label: "45%", lx: 100, ly: 128, accent: true },
  ];
  return (
    <svg
      className="project-art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Fills first, translucent, so the intersections read brighter. */}
      {lobes.map((l, i) => (
        <circle
          key={`f-${i}`}
          cx={l.cx}
          cy={l.cy}
          r={r}
          fill={l.accent ? "var(--accent)" : "rgba(255,255,255,0.9)"}
          fillOpacity={l.accent ? 0.16 : 0.08}
        />
      ))}
      {lobes.map((l, i) => (
        <circle
          key={`s-${i}`}
          cx={l.cx}
          cy={l.cy}
          r={r}
          fill="none"
          stroke={l.accent ? "var(--accent)" : "rgba(255,255,255,0.45)"}
          strokeWidth="1.2"
        />
      ))}
      {lobes.map((l, i) => (
        <text
          key={`t-${i}`}
          x={l.lx}
          y={l.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fontWeight="600"
          fill={l.accent ? "var(--accent)" : "rgba(255,255,255,0.85)"}
          style={{ fontFamily: "inherit" }}
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}

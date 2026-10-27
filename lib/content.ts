import type { TechKey } from "./tech-icons";

/**
 * Everything on the site lives here. Editing this file is the only thing
 * needed to add a project, swap a photo, or change a role.
 */

export const SITE = {
  name: "Raj",
  role: "Software Engineer",
  tagline: "Software engineer. Photographer. Curious mind.",
  email: "rajreddy23@outlook.com",
  github: "https://github.com/rjrddy",
  linkedin: "https://www.linkedin.com/in/raj-reddy1",
  resume: "/assets/works/Raj_Reddy_Resume.pdf",
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "photography", label: "Photography" },
  { id: "connect", label: "Connect" },
] as const;

export const ABOUT = [
  "I'm a software engineer at L3Harris Technologies, working on embedded signal processing systems and data infrastructure. I graduated from the University of Utah in May 2025 with a B.S. in Computer Science.",
  "My interests span embedded systems, machine learning, and full-stack development. I enjoy building things that solve real problems — whether that's optimizing signal processing pipelines, training transformer models, or crafting interactive web applications.",
  "Outside of work, I chase light with a camera, read, play soccer, and practice guitar.",
];

/* ------------------------------------------------------------------ *
 * Experience
 * ------------------------------------------------------------------ */

export type Job = {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
  stack: TechKey[];
  /** Path to a logo in /public/logos/, e.g. "/logos/l3harris.svg". */
  logo?: string | null;
  /** 1–3 char fallback shown when `logo` is unset. Use to keep the mark visually tight. */
  monogram: string;
};

export const EXPERIENCE: Job[] = [
  {
    company: "L3Harris Technologies",
    role: "Associate Software Engineer",
    location: "Dallas, TX",
    dates: "Jun 2025 — Present",
    bullets: [
      "Developed signal processing modules in Python and C++ on embedded systems, collaborating with hardware teams to optimize performance and resource utilization.",
      "Built microservices for high-frequency data ingestion, processing, and storage, leveraging Podman and serverless functions.",
      "Automated CI/CD testing with pipelines, integrating static code analysis and integration testing.",
    ],
    stack: ["python", "cpp", "podman", "linux", "githubactions"],
    logo: null,
    monogram: "L3",
  },
  {
    company: "Doxy.me",
    role: "Software Engineering Research Associate",
    location: "Charleston, SC",
    dates: "Aug 2024 — May 2025",
    bullets: [
      "Built transformer-based models with PyTorch and Llama, integrating WebRTC for real-time video streaming.",
      "Deployed inference pipelines on SageMaker & Fargate, improving diagnostic accuracy with reinforcement learning.",
    ],
    stack: ["pytorch", "python", "aws", "docker"],
    logo: null,
    monogram: "D",
  },
  {
    company: "University of Utah",
    role: "Undergraduate Research Assistant — FuTURES Lab",
    location: "Salt Lake City, UT",
    dates: "May 2024 — Jun 2025",
    bullets: [
      "Analyzed and optimized large-scale datasets, enhancing software configuration testing with tools like gcov and CMake, increasing code coverage by 30% on real-world APIs such as Libpng and PyTorch.",
      "Expanded OSS-Fuzz testing coverage, using compile-time options to improve the robustness of full-stack libraries.",
    ],
    stack: ["c", "cpp", "python", "linux", "git"],
    logo: null,
    monogram: "U",
  },
  {
    company: "HEXstream",
    role: "Software Engineering Intern",
    location: "Chicago, IL",
    dates: "May 2022 — Aug 2022",
    bullets: [
      "Engineered backend ETL pipelines integrating data from 25+ enterprise sources into Azure SQL and Azure Data Lake.",
      "Developed automated workflows for ingestion, cleansing, and aggregation, supporting distributed analytics systems.",
    ],
    stack: ["azure", "python", "pandas"],
    logo: null,
    monogram: "H",
  },
];

export const EDUCATION = {
  school: "University of Utah",
  degree: "B.S. Computer Science",
  location: "Salt Lake City, UT",
  dates: "Graduated May 2025",
  logo: null as string | null,
  monogram: "U",
  coursework: [
    "Computer Systems",
    "Machine Learning",
    "Computer Graphics",
    "Algorithms",
    "Software Practice I & II",
    "Database Systems",
    "Computer Networks",
    "Foundations of Data Analysis",
    "Models of Computation",
    "Linear Algebra",
  ],
};

/* ------------------------------------------------------------------ *
 * Skills — keys map to lib/tech-icons.ts
 * ------------------------------------------------------------------ */

export const SKILL_GROUPS: { title: string; items: TechKey[] }[] = [
  {
    title: "Languages",
    items: ["python", "cpp", "c", "java", "typescript", "javascript"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["react", "nextjs", "node", "django", "dotnet", "pytorch", "pandas", "numpy", "webgl"],
  },
  {
    title: "Infrastructure & Data",
    items: [
      "aws",
      "azure",
      "docker",
      "kubernetes",
      "podman",
      "linux",
      "raspberrypi",
      "postgresql",
      "mongodb",
      "git",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Spoken languages
 * ------------------------------------------------------------------ */

export type Language = {
  name: string;
  /** The language's endonym — how it names itself. Null for English. */
  native: string | null;
  level: "Native" | "Fluent" | "Conversational" | "Basic";
};

export const LANGUAGES: Language[] = [
  { name: "English", native: null, level: "Native" },
  { name: "Telugu", native: "తెలుగు", level: "Native" },
  { name: "Spanish", native: "Español", level: "Conversational" },
  { name: "Japanese", native: "日本語", level: "Conversational" },
];

/** Non-technical interests — rendered as text, no logos. */
export const INTERESTS = [
  "Embedded Systems",
  "Machine Learning",
  "Computer Vision",
  "Photography",
  "Music",
  "Astronomy",
];

/* ------------------------------------------------------------------ *
 * Projects
 *
 * To add one: append an object below.
 *   image  — drop the file in /public/assets/works/ and reference it here,
 *            or set to null for a typographic fallback card.
 *   links  — any number; the first is the card's primary click target.
 * ------------------------------------------------------------------ */

export type ProjectLink = {
  label: string;
  href: string;
  kind?: "repo" | "demo" | "writeup";
};

/** A screenshot in a project page's tour. */
export type ProjectShot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

/**
 * Bespoke SVG artwork rendered in the media slot when there's no screenshot.
 * Each key corresponds to a component in components/ProjectVisual.tsx.
 */
export type ProjectVisualKind =
  | "schedule"
  | "checklist"
  | "sphere"
  | "waveform"
  | "network"
  | "beacon"
  | "streams"
  | "pipeline"
  | "ledger"
  | "voice"
  | "gate"
  | "signals"
  | "pitch"
  | "venn";

export type Project = {
  title: string;
  blurb: string;
  description: string;
  image: string | null;
  /** Natural pixel size of `image`. Lets the project page reserve the right
   *  box before the file loads, whatever crop the screenshot happens to be. */
  imageSize?: { width: number; height: number };
  stack: TechKey[];
  links: ProjectLink[];
  featured?: boolean;
  award?: string;
  /** Undefined = shipped. Anything else surfaces a badge — flip to undefined on ship. */
  status?: "in-progress" | "planned";
  /** What a saved local run actually measured. Keep it to numbers you can show. */
  proof?: string;
  /** What isn't done yet. Printed under the proof so the claim stays honest. */
  caveat?: string;
  /**
   * A limit on what the project may be used for, not just what's unfinished.
   * Rendered on the card itself, in its own warning colour — never tucked
   * away on the project page where someone clicking straight to a demo
   * would miss it.
   */
  disclaimer?: string;
  /** Signature visual for the card. Falls back to tech-icon placeholder if unset. */
  visual?: ProjectVisualKind;

  /* --- Optional: gives the project its own page at /projects/<slug> ------ *
   * The card stays concise either way — everything below only ever renders
   * on the project page.                                                    */

  /** Set this and the card grows a "Project details" link. */
  slug?: string;
  /** One line under the page title, in place of the card's blurb. */
  tagline?: string;
  /** Headline numbers, rendered as a strip under the page intro. */
  stats?: { value: string; label: string }[];
  /** What the thing actually does. */
  features?: string[];
  /** How it works under the hood. */
  howItWorks?: string[];
  /** Prose list of everything in the stack, including things without an icon. */
  builtWith?: string;
  /** Screenshot tour. */
  shots?: ProjectShot[];
  /** Caveat printed alongside the technical notes. */
  note?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Telesense",
    slug: "telesense",
    blurb: "Multimodal Behavioral Analysis for Telehealth",
    description:
      "Over video, clinicians lose many of the nonverbal cues they rely on — facial expression, tone of voice, pauses, how a patient's affect shifts mid-conversation. Telesense takes a recorded session and returns timestamped flags for moments that may need follow-up, alongside an emotion timeline, protective factors the patient mentioned, and intake topics that were never covered.",
    image: null,
    stack: ["python", "pytorch", "fastapi", "react", "docker", "vercel"],
    links: [
      {
        label: "Open the demo",
        href: "https://telesense.vercel.app",
        kind: "demo",
      },
      {
        label: "Source code",
        href: "https://github.com/rjrddy/telesense",
        kind: "repo",
      },
    ],
    featured: true,
    disclaimer:
      "Research prototype. It does not diagnose, screen for, or assess risk of any condition, and its output must not be used to make clinical decisions. The public demo runs an uncalibrated pretrained pipeline — not a trained Telesense checkpoint, and not a diagnostic classifier.",

    tagline:
      "A second observer for recorded sessions — timestamped, auditable, and explicit about what it cannot tell you.",
    stats: [
      { value: "3", label: "Modalities fused" },
      { value: "Per-frame", label: "Concern localization" },
      { value: "Local-first", label: "Recordings stay on device" },
    ],
    features: [
      "Upload a session and get timestamped flags for moments that may warrant follow-up, scored across audio, video and transcript.",
      "A synchronized review workspace: video playback, audio waveform, searchable transcript, and per-modality signal timelines that seek to the moment.",
      "Whisper transcription with model-derived word timestamps, so every passage links back to a point in the recording.",
      "Protective factors the patient mentioned and intake topics never covered, from transparent phrase-matching rules that send nothing to an external service.",
      "An emotion timeline and combined flag counts, with the engine that produced them labelled in the interface.",
      "A trainable multimodal model in the repository: per-modality encoders, cross-modal attention fusion, and a TCN + Transformer temporal encoder scoring every frame.",
      "A separate unsupervised track — temporal VAE plus contrastive learning — that surfaces unusual moments without any labels.",
      "JSON export, a sample library open without a key, and a gated upload path against a Fly.io CPU backend.",
    ],
    howItWorks: [
      "A session is uploaded and stored locally. The backend extracts audio with ffmpeg, transcribes it with Whisper, then runs one of two engines. The deployed demo runs the pretrained pipeline: Wav2Vec2 (SUPERB) scores three-second windows of speech for vocal emotion, RoBERTa (GoEmotions) scores transcript passages across 28 labels, and a keyword detector plus temporal smoothing turn those scores into timestamped flags.",
      "The second engine is the Telesense model itself, which runs when a trained checkpoint is configured. Each modality goes through its own pretrained encoder — Wav2Vec2 for audio, ResNet-50 or DenseNet-121 per frame for video, DistilBERT for text. The features are projected to a shared size and passed through a multi-scale temporal encoder that pairs a TCN with a Transformer, so short patterns like a pause or a shift in tone and longer arcs across the session are both in reach. A localization head then scores every frame, and high-scoring frames merge into segments.",
      "Localizing in time rather than emitting one label per session is the design decision the rest follows from: a reviewer can jump to the moment and judge it, and frame-level scores are auditable in a way a single verdict is not. Protective factors and missing intake questions stay deliberately rule-based — phrase matching is predictable and inspectable. The backend binds to 127.0.0.1 and keeps uploads, extracted audio and results on the local filesystem.",
    ],
    builtWith:
      "Python, PyTorch, FastAPI and a React + Vite frontend, over Whisper, Wav2Vec2, RoBERTa, DistilBERT and ResNet/DenseNet encoders. Docker for the backend image, Vercel for the demo frontend, Fly.io for the gated CPU backend.",
    visual: "signals",
    note: "Telesense is a research prototype. It does not diagnose, screen for, or assess risk of any condition, and its output — including flags, protective factors and missing-question prompts — must not be used to make clinical decisions. The public demo runs an uncalibrated pretrained fallback on CPU, not a trained Telesense checkpoint and not a diagnostic classifier; it flags readily and produces both false positives and false negatives. Severity labels are uncalibrated application thresholds, not clinical cut-offs, and a model score is not the probability that someone has a condition. Anyone at risk needs evaluation by a qualified clinician; in an emergency, call local emergency services.",
  },
  {
    title: "Jogo Bonito",
    slug: "jogo-bonito",
    blurb: "Cross-Era Football Simulator",
    description:
      "An interactive football simulator that matches teams from different eras — 2023 Manchester City against 2016 Real Madrid. Explore historical squads, pick starting lineups and tactics, replay simulated matches, and compare outcomes across thousands of simulations.",
    image: null,
    stack: ["javascript", "html", "css", "python", "vercel"],
    links: [
      {
        label: "Try the Simulator",
        href: "https://jogo-bonito-gamma.vercel.app",
        kind: "demo",
      },
      {
        label: "Source code",
        href: "https://github.com/rjrddy/jogo_bonito",
        kind: "repo",
      },
    ],
    featured: true,

    tagline: "Pick two eras. Pick the XI. See how the match might have gone.",
    stats: [
      { value: "2,002", label: "Team editions" },
      { value: "2010–2026", label: "Seasons covered" },
      { value: "10,000", label: "Matches per experiment" },
    ],
    features: [
      "2,002 team editions spanning 2010–2026 across Europe's top five leagues, the World Cup, Euros, and Copa América.",
      "Historical player rosters and recorded coach snapshots.",
      "Custom starting XIs, six formations, five tactical approaches, and home or neutral venues.",
      "Interactive match replays, shot maps, momentum charts, expected goals, and player reports.",
      "Scoreline probability grids and experiments of up to 10,000 simulated matches.",
      "Real club badges, national flags, team-specific chart colours, and system-aware light/dark mode.",
      "Shareable matchups, locally saved fixtures, and CSV/JSON exports.",
    ],
    howItWorks: [
      "Each team edition carries the scoring and conceding rates it actually recorded that season. A matchup turns those rates into per-side goal expectations, then plays them out as a seeded simulation — the same seed always replays the same match, minute for minute.",
      "Alongside the replay, a Poisson model turns the same goal expectations into a scoreline probability grid, so a single result can be read against the full distribution it came from. Batch experiments sample that distribution up to 10,000 times to show how often each outcome turns up.",
      "Python pipelines assemble the squad, coach, and season-results data into static JSON. The front end is plain ES modules with hand-written SVG for every chart — no framework, no runtime dependencies.",
    ],
    builtWith:
      "JavaScript ES modules, HTML, CSS, SVG visualizations, Python data pipelines, and Vercel hosting.",
    visual: "venn",
    note: "Every result is a hypothetical simulation built from historical rates. Jogo Bonito has no live match feed, makes no calibrated prediction claims, uses no machine-learned modelling, and does not rate individual players — tactical approaches are experimental multipliers, not learned tactics.",
  },
  {
    title: "Meridian",
    blurb: "Sensor-stream alignment and deterministic replay",
    description:
      "Aligns noisy sensor streams using bounded buffers, timestamp watermarks and scalar Kalman filtering. Durable event storage, deterministic replay, a WebSocket operations console and synthetic instrument monitoring.",
    image: null,
    stack: ["cpp", "python", "fastapi", "sqlite", "react"],
    links: [
      { label: "Source code", href: "https://github.com/rjrddy/meridian", kind: "repo" },
    ],
    proof:
      "Replayed 900 public sensor records with bit-identical output; browser message-arrival p99 of 6.187 ms. 14 tests pass.",
    caveat:
      "Local implementation — deployment and the finished demo recording are still outstanding.",
    visual: "streams",
  },
  {
    title: "Relay",
    blurb: "Durable workflow execution",
    description:
      "Runs ordered workflows with idempotent admission, worker leases, fencing, retries, dead letters and replay. Internal effects commit atomically with workflow state, and the console drives pause, rollout and recovery.",
    image: null,
    stack: ["go", "postgresql", "react", "opentelemetry", "python"],
    links: [
      {
        label: "Demo",
        href: "https://relay-brown-six.vercel.app",
        kind: "writeup",
      },
      { label: "Source code", href: "https://github.com/rjrddy/relay", kind: "repo" },
    ],
    proof:
      "Reconciled 67,688 workflows and 203,064 internal effects across a one-hour fault campaign — zero lost workflows, zero duplicate effects. 20 tests pass.",
    caveat:
      "Local runtime and recorded demo; the full hour-audit export and interactive hosting are unfinished.",
    visual: "pipeline",
  },
  {
    title: "Tally",
    blurb: "Auditable ledger and decision platform",
    description:
      "A double-entry ledger with exact money arithmetic, transactional idempotency, immutable journal records and balance reconstruction. Adds versioned decision rules, reconciliation review, merchant enrichment and feed-health monitoring over synthetic financial data.",
    image: null,
    stack: ["typescript", "nestjs", "postgresql", "react"],
    links: [
      {
        label: "Demo",
        href: "https://tally-gamma-lac.vercel.app",
        kind: "writeup",
      },
      { label: "Source code", href: "https://github.com/rjrddy/tally", kind: "repo" },
    ],
    proof:
      "Replayed 1,003 journal events to identical balances; decision HTTP p99 of 14.386 ms over 400 requests at concurrency 16. 27 tests pass.",
    caveat:
      "Local application and recorded demo; persistent interactive hosting is outstanding.",
    visual: "ledger",
  },
  {
    title: "Pulse",
    blurb: "Voice inference gateway with cancellation and recovery",
    description:
      "Connects speech recognition, language-model inference and speech synthesis through an authenticated WebSocket gateway — faster-whisper, SmolLM2 and Piper behind bounded admission, circuit breakers, fallback before audio starts, interruption handling, worker recovery and latency instrumentation.",
    image: null,
    stack: ["go", "python", "react"],
    links: [
      {
        label: "Demo",
        href: "https://pulse-delta-ten-68.vercel.app",
        kind: "writeup",
      },
      { label: "Source code", href: "https://github.com/rjrddy/pulse", kind: "repo" },
    ],
    proof:
      "First-audio p99 of 734.14 ms at concurrency 4 on local CPU (8-token output cap, 8 samples), with worker-kill recovery and stale audio rejected after interruption. 17 tests pass.",
    caveat:
      "Local CPU inference and recorded demo; continuous microphone capture, hosted inference and GPU measurements are unfinished.",
    visual: "voice",
  },
  {
    title: "Gatekeeper",
    blurb: "Release verification and canary rollback",
    description:
      "Combines flaky-test detection, CI failure clustering, Terraform-plan risk checks and signed artifact verification, then puts a real HTTP canary proxy in front of the rollout with fenced controls, rollback and crash recovery.",
    image: null,
    stack: ["python", "fastapi", "rust", "terraform", "sqlite", "react"],
    links: [
      {
        label: "Demo",
        href: "https://gatekeeper-ten-sandy.vercel.app",
        kind: "writeup",
      },
      {
        label: "Source code",
        href: "https://github.com/rjrddy/gatekeeper",
        kind: "repo",
      },
    ],
    proof:
      "Caught 6/6 seeded risky infrastructure plans with zero false positives across 10 fixtures; two HTTP rollbacks, one promotion and controller-restart recovery. 31 tests pass.",
    caveat:
      "Local system and recorded demo; GitHub App installation, live JUnit ingestion and persistent hosting are unfinished.",
    visual: "gate",
  },
  {
    title: "Course Planning & Review Platform",
    blurb: "Schedule matching and course insights for students.",
    description:
      "Multi-service data platform for student schedule matching, course overlap detection, and behavioral insights. ETL pipelines process thousands of course records with interactive dashboards and calendar visualizations.",
    image: null,
    stack: ["python", "react", "tailwind", "postgresql"],
    links: [],
    featured: true,
    award: "Class Best Project",
    visual: "schedule",
  },
  {
    title: "Accountability Tracker",
    blurb: "Daily goals and recurring tasks, with people to answer to.",
    description:
      "Full-stack app for managing daily goals and recurring tasks. Firebase Auth with localStorage guest support, and PostgreSQL via Prisma for persistence. Includes progress visualizations and social features.",
    image: null,
    stack: ["nextjs", "typescript", "firebase", "postgresql", "prisma"],
    links: [],
    visual: "checklist",
  },
  {
    title: "Ray Tracing Engine",
    blurb: "Real-time reflections and lighting in the browser.",
    description:
      "Interactive WebGL ray tracing engine with realistic reflections, dynamic lighting, and customizable environment maps. Hand-written shaders plus user controls for rendering techniques and scene adjustment.",
    image: null,
    stack: ["javascript", "webgl"],
    links: [
      {
        label: "Live demo",
        href: "https://ray-tracing-engine.vercel.app/",
        kind: "demo",
      },
    ],
    visual: "sphere",
  },
];

/** Every project that has earned its own page. */
export const PROJECT_PAGES = PROJECTS.filter(
  (p): p is Project & { slug: string } => Boolean(p.slug)
);

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Photography — files live in /public/photos/
 * ------------------------------------------------------------------ */

/** The fixed page backdrop. Deliberately not in PHOTOS — it's the wallpaper,
 *  so it shouldn't also scroll past in the carousels. */
export const HERO_PHOTO = "/photos/wallpaper.jpg";

/**
 * The two cameras that shot every photo below — one digital, one film.
 * Surfaced as glass "gear" cards inside the Photography section.
 */
export type Camera = {
  kind: "Digital" | "Film";
  body: string;
  lens: string;
  format: string;
};

export const CAMERAS: Camera[] = [
  {
    kind: "Digital",
    body: "Fujifilm X-T4",
    lens: "XF 18-55mm f/2.8-4 R LM OIS",
    format: "APS-C · 26.1MP X-Trans CMOS 4",
  },
  {
    kind: "Film",
    body: "Canon AE-1",
    lens: "FD 50mm f/1.8",
    format: "35mm · Shutter-priority",
  },
];

/**
 * Photos keep their native aspect ratio — never cropped. `width`/`height` are
 * the file's true pixel dimensions; the gallery derives the ratio from them.
 * `caption` is a short description of the subject; `location` is where it was
 * shot. Both are optional — omit for photos you'd rather leave untitled.
 */
export type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  /** What the photograph is of, or the scene. Shown in the lightbox. */
  caption?: string;
  /** Where it was shot. Shown next to the caption in the lightbox. */
  location?: string;
};

export const PHOTOS: Photo[] = [
  { src: "/photos/0520057_0021.JPG", width: 2128, height: 1501 },
  { src: "/photos/0520057_0029.JPG", width: 2128, height: 1501 },
  { src: "/photos/0520240_0012.JPG", width: 2128, height: 1501 },
  { src: "/photos/0520240_0018.JPG", width: 2128, height: 1501 },
  { src: "/photos/0520240_0024.JPG", width: 1719, height: 2128 },
  { src: "/photos/0520240_0034.JPG", width: 2128, height: 1501 },
  { src: "/photos/_DSF0198.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF0555.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF0721.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF0724.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF0862.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF1450.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF1983.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF2286.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF2308.JPG", width: 1445, height: 2128 },
  { src: "/photos/_DSF2362.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF2454.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF2583.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF2691.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF2737.jpg", width: 2128, height: 1577 },
  { src: "/photos/_DSF2819.jpg", width: 2128, height: 1511 },
  { src: "/photos/_DSF2933.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF3102.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF3116.jpg", width: 1697, height: 2128 },
  { src: "/photos/_DSF3154.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF3243.jpg", width: 2128, height: 1694 },
  { src: "/photos/_DSF3274.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF3279.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF3387.jpg", width: 1445, height: 2128 },
  { src: "/photos/_DSF3424.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF3479.jpg", width: 2128, height: 1445 },
  { src: "/photos/_DSF3510.jpg", width: 2128, height: 1361 },
  { src: "/photos/_DSF3576.jpg", width: 2128, height: 1445 },
];

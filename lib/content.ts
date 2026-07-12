import type { TechKey } from "./tech-icons";

/**
 * Everything on the site lives here. Editing this file is the only thing
 * needed to add a project, swap a photo, or change a role.
 */

export const SITE = {
  name: "Raj Reddy",
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
  },
];

export const EDUCATION = {
  school: "University of Utah",
  degree: "B.S. Computer Science",
  location: "Salt Lake City, UT",
  dates: "Graduated May 2025",
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
    items: ["react", "nextjs", "node", "django", "dotnet", "pytorch", "pandas", "numpy"],
  },
  {
    title: "Infrastructure & Data",
    items: ["aws", "azure", "docker", "podman", "linux", "postgresql", "mongodb", "git"],
  },
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

export type Project = {
  title: string;
  blurb: string;
  description: string;
  image: string | null;
  stack: TechKey[];
  links: ProjectLink[];
  featured?: boolean;
  award?: string;
};

export const PROJECTS: Project[] = [
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
  },
  {
    title: "Accountability Tracker",
    blurb: "Daily goals and recurring tasks, with people to answer to.",
    description:
      "Full-stack app for managing daily goals and recurring tasks. Firebase Auth with localStorage guest support, and PostgreSQL via Prisma for persistence. Includes progress visualizations and social features.",
    image: null,
    stack: ["nextjs", "typescript", "firebase", "postgresql", "prisma"],
    links: [],
  },
  {
    title: "Ray Tracing Engine",
    blurb: "Real-time reflections and lighting in the browser.",
    description:
      "Interactive WebGL ray tracing engine with realistic reflections, dynamic lighting, and customizable environment maps. Hand-written shaders plus user controls for rendering techniques and scene adjustment.",
    image: null,
    stack: ["javascript", "webgl"],
    links: [],
  },
];

/* ------------------------------------------------------------------ *
 * Photography — files live in /public/photos/
 * ------------------------------------------------------------------ */

/** The frame used as the fixed page backdrop. */
export const HERO_PHOTO = "/photos/_DSF3104.jpg";

/**
 * Photos keep their native aspect ratio — never cropped. `width`/`height` are
 * the file's true pixel dimensions; the gallery derives the ratio from them,
 * so a new photo only needs its real numbers here (`sips -g pixelWidth -g
 * pixelHeight <file>`).
 */
export type Photo = { src: string; width: number; height: number; alt?: string };

export const PHOTOS: Photo[] = [
  { src: "/photos/_DSF3104.jpg", width: 6240, height: 4160 },
  { src: "/photos/_DSF0608.jpg", width: 1270, height: 2048 },
  { src: "/photos/_DSF0724.jpg", width: 1365, height: 2048 },
  { src: "/photos/_DSF1065.jpg", width: 2048, height: 1365 },
  { src: "/photos/_DSF1450.jpg", width: 1365, height: 2048 },
  { src: "/photos/_DSF1957.jpg", width: 1365, height: 2048 },
  { src: "/photos/_DSF2819.jpg", width: 2048, height: 1431 },
  { src: "/photos/_DSF3154.jpg", width: 1365, height: 2048 },
  { src: "/photos/_DSF3311.jpg", width: 1365, height: 2048 },
  { src: "/photos/_DSF3342.jpg", width: 1365, height: 2048 },
  { src: "/photos/_DSF3424.jpg", width: 2048, height: 1365 },
];

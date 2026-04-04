export type GalleryItem = {
  type: "video" | "image" | "color";
  src?: string;
  color?: string;
  caption?: string;
  span?: "full" | "half";
};

export type ProjectStatus = "completed" | "in-progress";

export type ProjectPhase =
  | "Discovery"
  | "Research"
  | "Design"
  | "Build"
  | "Testing"
  | "Launch"
  | "Post-Launch";

export type Project = {
  id: number;
  slug: string;
  title: string;
  discipline: string;
  description: string;
  overview: string;
  year: string;
  role: string[];
  deliverables: string[];
  mediaType: "video" | "image" | "color";
  mediaSrc?: string;
  mediaColor?: string;
  featured: boolean;
  gallery: GalleryItem[];
  status: ProjectStatus;
  // In-progress fields
  currentPhase?: ProjectPhase;
  phases?: ProjectPhase[];
  challenges?: string[];
  lessonsLearned?: string[];
  nextSteps?: string[];
  // Completed fields
  results?: string[];
};

export const projects: Project[] = [
  // ── COMPLETED PROJECTS ─────────────────────────
  {
    id: 1,
    slug: "aether-brand-system",
    title: "Aether Brand System",
    discipline: "Graphic Design",
    status: "completed",
    description: "A comprehensive identity system for a luxury wellness brand — logotype, color, typography, and motion guidelines woven into a single cohesive language.",
    overview: "Aether approached me to build a brand identity from the ground up. The challenge was capturing a sense of elevated calm — something that felt both modern and timeless. The resulting system draws from minimalist principles, using generous whitespace, a refined typographic hierarchy, and a muted palette anchored by warm neutrals and a single terracotta accent.\n\nEvery touchpoint — from business cards to packaging to digital templates — was designed to feel like it belonged to the same world.",
    year: "2024",
    role: ["Brand Strategy", "Identity Design", "Art Direction", "Motion Guidelines"],
    deliverables: ["Logo System", "Brand Guidelines", "Color & Typography", "Stationery Suite", "Digital Templates", "Motion Principles"],
    results: ["Brand recognition increased 40% in first quarter", "System adopted across 12 touchpoints", "Design consistency score improved from 45% to 92%"],
    mediaType: "color",
    mediaColor: "#1A1814",
    featured: true,
    gallery: [
      { type: "color", color: "#1A1814", caption: "Primary brand palette — warm neutrals anchored by a terracotta accent", span: "full" },
      { type: "color", color: "#C8593A", caption: "Logo lockup — primary version", span: "half" },
      { type: "color", color: "#2A2620", caption: "Logo lockup — reversed version", span: "half" },
    ],
  },
  {
    id: 2,
    slug: "flux-ui-design-system",
    title: "Flux UI Design System",
    discipline: "UI/UX Design",
    status: "completed",
    description: "End-to-end design system for a fintech product — components, tokens, and interaction patterns built for scale.",
    overview: "Flux needed a design system that could scale across web, iOS, and Android without losing coherence. Starting from a comprehensive audit of the existing product, I rebuilt the component library from scratch — establishing design tokens for color, spacing, and typography, then building every component in Figma with full documentation.\n\nThe system now supports a team of 12 designers and 30+ engineers across three platforms.",
    year: "2024",
    role: ["UX Strategy", "UI Design", "Design Systems", "Documentation"],
    deliverables: ["Design Tokens", "Component Library", "Figma System", "Documentation Site", "Handoff Specs"],
    results: ["Reduced design-to-dev handoff time by 60%", "Scaled across 3 platforms with full parity", "Adopted by team of 42 across design and engineering"],
    mediaType: "color",
    mediaColor: "#1A1814",
    featured: false,
    gallery: [
      { type: "color", color: "#1A1814", caption: "Design token architecture", span: "full" },
      { type: "color", color: "#3A5A8C", caption: "Component library — button variants", span: "half" },
      { type: "color", color: "#2A3A5A", caption: "Component library — form elements", span: "half" },
    ],
  },
  {
    id: 3,
    slug: "solstice-title-sequence",
    title: "Solstice Title Sequence",
    discipline: "Motion Design",
    status: "completed",
    description: "Opening titles for an independent documentary — hand-lettered type animated through film grain and light leaks.",
    overview: "The director of Solstice wanted titles that felt handmade — something that pushed back against the sterile precision of digital tools. I started with hand-lettered type, scanned at high resolution, then built the animation entirely in After Effects using real film grain overlays and practical light leak footage.\n\nThe result is a 90-second sequence that feels like it was pulled from an archive.",
    year: "2023",
    role: ["Motion Design", "Hand Lettering", "Art Direction"],
    deliverables: ["Title Sequence", "Lower Thirds", "End Credits", "Motion Style Guide"],
    mediaType: "color",
    mediaColor: "#2A2620",
    featured: false,
    gallery: [
      { type: "color", color: "#2A2620", caption: "Full title sequence", span: "full" },
      { type: "color", color: "#4A3A30", caption: "Hand-lettered type studies", span: "half" },
      { type: "color", color: "#1A1410", caption: "Film grain texture exploration", span: "half" },
    ],
  },

  // ── IN-PROGRESS PROJECTS ─────────────────────────
  {
    id: 4,
    slug: "portfolio-rebuild",
    title: "Portfolio Rebuild",
    discipline: "UI/UX Design",
    status: "in-progress",
    description: "Rebuilding my personal portfolio from the ground up — dark aesthetic blending Wabi Sabi, Dark Magic Academia, and Neo-Brutalism.",
    overview: "This is the site you're looking at right now. The previous version was warm and editorial — this rebuild pushes into darker, bolder territory. The goal is a portfolio that works as both a showcase and a living document of my process.",
    year: "2026",
    role: ["Design", "Development", "Content Strategy"],
    deliverables: ["Full Website", "Design System", "MDX Content Architecture", "CI/CD Pipeline"],
    currentPhase: "Build",
    phases: ["Discovery", "Research", "Design", "Build", "Testing", "Launch"],
    challenges: [
      "Balancing three distinct aesthetics (Wabi Sabi, Dark Academia, Neo-Brutalism) without visual chaos",
      "Building an MDX content system that supports both case studies and living project docs",
    ],
    lessonsLearned: [
      "Grain textures at low opacity add organic warmth to even the darkest palettes",
      "Neo-Brutalist typography needs breathing room — thick borders help contain bold type",
    ],
    nextSteps: [
      "Populate with real project content and photography",
      "Add scroll-triggered animations",
      "Performance audit and Lighthouse optimization",
    ],
    mediaType: "color",
    mediaColor: "#0C0A09",
    featured: false,
    gallery: [],
  },
  {
    id: 5,
    slug: "meridian-app",
    title: "Meridian App",
    discipline: "UI/UX Design",
    status: "in-progress",
    description: "Travel companion app — research, wireframes, and high-fidelity prototype for iOS.",
    overview: "Meridian started with a simple observation: spontaneous travel is broken. Every existing tool assumes you know where you're going. Meridian is designed for the opposite — helping people discover and plan trips on the fly, with minimal friction and maximum delight.",
    year: "2025",
    role: ["UX Research", "Product Strategy", "UI Design", "Prototyping"],
    deliverables: ["Research Report", "User Flows", "Wireframes", "High-fidelity Prototype", "Usability Test Report"],
    currentPhase: "Design",
    phases: ["Discovery", "Research", "Design", "Build", "Testing", "Launch"],
    challenges: [
      "Designing for spontaneity while maintaining enough structure to be useful",
      "Handling offline-first architecture in the prototype",
    ],
    lessonsLearned: [
      "User interviews revealed that 'discovery' means different things to different travel personas",
      "Map-based interfaces need aggressive progressive disclosure",
    ],
    nextSteps: [
      "Complete high-fidelity prototype",
      "Run usability testing round 2",
      "Refine based on feedback",
    ],
    mediaType: "color",
    mediaColor: "#1A1814",
    featured: false,
    gallery: [
      { type: "color", color: "#3A5A8C", caption: "Discovery screen — personalized recommendations", span: "full" },
      { type: "color", color: "#2A4A7C", caption: "Trip planning interface", span: "half" },
      { type: "color", color: "#1A3A6C", caption: "Map exploration mode", span: "half" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function getCompletedProjects(): Project[] {
  return projects.filter((p) => p.status === "completed");
}

export function getInProgressProjects(): Project[] {
  return projects.filter((p) => p.status === "in-progress");
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

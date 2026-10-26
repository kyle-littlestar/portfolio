export type GalleryItem = {
  type: "video" | "image" | "color";
  src?: string;
  color?: string;
  caption?: string;
  span?: "full" | "half";
};

export type ProjectStatus = "completed" | "in-progress";

// What kind of evidence this project represents to a visitor — shown as a visible
// label near the title everywhere the project appears (cards, detail page, metadata).
// "Sample exercise" = fictional/self-directed practice, no real client or results.
// "Self-initiated concept" = real work, done independently, not a paying engagement.
// "Live product" = real, shipped, in-use work.
export type ProjectProvenance = "Sample exercise" | "Self-initiated concept" | "Live product";

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
  provenance: ProjectProvenance;
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
    id: 6,
    slug: "flight-trip-planner",
    title: "Flight Trip Planner",
    discipline: "UI/UX Design",
    status: "completed",
    provenance: "Self-initiated concept",
    description: "Planning a drone shoot day in one flow — location, airspace/LAANC/weather status, an optional shot list, gear, and a trip-readiness summary.",
    overview: "A solo UX/UI concept exploring how a recreational drone pilot might assemble a clear, revisit-able shoot-day plan instead of manually cross-checking maps, an airspace tool, LAANC, and a weather service. Research is a retrospective self-audit of my own most recent Orlando drone shoot, paired with a narrow competitive scan. The result is a 14-frame, high-fidelity interactive Figma prototype covering the full flow and every status state. This is an exploratory concept: moderated usability testing is written and ready to run, but hasn't happened yet — see the full case study for the evidence, decisions, and boundaries.",
    year: "2026",
    role: ["UX Research", "Interaction Design", "Wireframing", "Prototyping", "Accessibility Review"],
    deliverables: ["Research Audit", "Persona & Journey Map", "Lo-fi & Hi-fi Wireframes", "Interactive Figma Prototype", "Case Study"],
    mediaType: "image",
    mediaSrc: "/projects/flight-trip-planner/cover.svg",
    featured: true,
    gallery: [],
  },
  // ── IN-PROGRESS PROJECTS (real) ─────────────────
  {
    id: 7,
    slug: "design-fieldnotes",
    title: "Design Fieldnotes",
    discipline: "UI/UX Design",
    status: "in-progress",
    provenance: "Self-initiated concept",
    description: "A daily reading habit for design principles — one lesson at a time, source kept visibly separate from interpretation.",
    overview: "A self-initiated concept: returning to design after time away, treated as a skill that needs deliberate retraining, not just remembering. Design Fieldnotes is a local reading prototype pairing an editorial interpretation with a separately-cited source for each lesson, so the two are never blended into one voice. Three lessons exist today — visual hierarchy, typography, and contrast/accessibility. Built and working; reading it with someone other than its author hasn't happened yet. See the full case study for the reasoning and the honest open questions.",
    year: "2026",
    role: ["Product Concept", "Content", "UI Design", "Build"],
    deliverables: ["3 Hand-Authored Lessons", "Reading Experience Prototype", "Case Study"],
    currentPhase: "Testing",
    phases: ["Discovery", "Research", "Design", "Build", "Testing", "Launch"],
    nextSteps: [
      "Read the three existing lessons with someone other than their author, and record what happens.",
      "Expand toward a real library of lessons, using the existing reading/practice reference material.",
      "Build a gallery of completed practice exercises.",
    ],
    mediaType: "image",
    mediaSrc: "/projects/design-fieldnotes/03-active-lesson.png",
    featured: true,
    gallery: [],
  },
  // ── IN-PROGRESS PROJECTS ─────────────────────────
  {
    id: 8,
    slug: "zzz-disc-drive-calculator",
    title: "ZZZ Disc Drive Calculator",
    discipline: "UI/UX Design",
    status: "in-progress",
    provenance: "Live product",
    description: "A live build planner for Zenless Zone Zero — compare your own Disc Drives against your own build and see which are worth keeping.",
    overview: "A passion project built for myself and a small group of friends: import or hand-enter a real build, then see what each Disc Drive is actually worth and which substats to farm toward next. Live and in a friends-testing phase. The first-time flow had a structured, scored UX audit (18/30 baseline) and a verified redesign; the deeper screens haven't had the same review yet. See the full case study for the evidence and the honest gaps.",
    year: "2026",
    role: ["Product Owner", "Formula & Data Accuracy", "UX Direction"],
    deliverables: ["Live Build Planner & Optimizer", "Onboarding UX Audit & Redesign", "Case Study"],
    currentPhase: "Testing",
    phases: ["Discovery", "Research", "Design", "Build", "Testing", "Launch"],
    nextSteps: [
      "Run a full UX/UI heuristic pass on the manual-build and optimizer screens, using the same scored method as the onboarding audit.",
      "Continue the friends-testing feedback loop before considering any wider release.",
    ],
    mediaType: "image",
    mediaSrc: "/projects/zzz-disc-drive-calculator/after-home-desktop.png",
    featured: true,
    gallery: [],
  },
  {
    id: 4,
    slug: "portfolio-rebuild",
    title: "Portfolio Rebuild",
    discipline: "UI/UX Design",
    status: "in-progress",
    provenance: "Self-initiated concept",
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

export function getSampleProjects(): Project[] {
  return projects.filter((p) => p.provenance === "Sample exercise");
}

export function getRealProjects(): Project[] {
  return projects.filter((p) => p.provenance !== "Sample exercise");
}

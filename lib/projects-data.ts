export type GalleryItem = {
  type: "video" | "image" | "color";
  src?: string;
  color?: string;
  caption?: string;
  span?: "full" | "half";
};

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
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "aether-brand-system",
    title: "Aether Brand System",
    discipline: "Graphic Design",
    description: "A comprehensive identity system for a luxury wellness brand — logotype, color, typography, and motion guidelines woven into a single cohesive language.",
    overview: "Aether approached me to build a brand identity from the ground up. The challenge was capturing a sense of elevated calm — something that felt both modern and timeless. The resulting system draws from minimalist principles, using generous whitespace, a refined typographic hierarchy, and a muted palette anchored by warm neutrals and a single terracotta accent.\n\nEvery touchpoint — from business cards to packaging to digital templates — was designed to feel like it belonged to the same world.",
    year: "2024",
    role: ["Brand Strategy", "Identity Design", "Art Direction", "Motion Guidelines"],
    deliverables: ["Logo System", "Brand Guidelines", "Color & Typography", "Stationery Suite", "Digital Templates", "Motion Principles"],
    mediaType: "video",
    mediaSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    featured: true,
    gallery: [
      { type: "color", color: "#E8E2D9", caption: "Primary brand palette — warm neutrals anchored by a terracotta accent", span: "full" },
      { type: "color", color: "#C8593A", caption: "Logo lockup — primary version", span: "half" },
      { type: "color", color: "#1A1814", caption: "Logo lockup — reversed version", span: "half" },
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Brand in motion — intro animation", span: "full" },
      { type: "color", color: "#6B6560", caption: "Stationery suite — business cards and letterhead", span: "half" },
      { type: "color", color: "#3A3530", caption: "Packaging application", span: "half" },
    ],
  },
  {
    id: 2,
    slug: "flux-ui-design-system",
    title: "Flux UI Design System",
    discipline: "UI/UX Design",
    description: "End-to-end design system for a fintech product — components, tokens, and interaction patterns built for scale.",
    overview: "Flux needed a design system that could scale across web, iOS, and Android without losing coherence. Starting from a comprehensive audit of the existing product, I rebuilt the component library from scratch — establishing design tokens for color, spacing, and typography, then building every component in Figma with full documentation.\n\nThe system now supports a team of 12 designers and 30+ engineers across three platforms.",
    year: "2024",
    role: ["UX Strategy", "UI Design", "Design Systems", "Documentation"],
    deliverables: ["Design Tokens", "Component Library", "Figma System", "Documentation Site", "Handoff Specs"],
    mediaType: "color",
    mediaColor: "#1A1814",
    featured: false,
    gallery: [
      { type: "color", color: "#1A1814", caption: "Design token architecture", span: "full" },
      { type: "color", color: "#3A5A8C", caption: "Component library — button variants", span: "half" },
      { type: "color", color: "#2A3A5A", caption: "Component library — form elements", span: "half" },
      { type: "color", color: "#4A6A9C", caption: "Mobile application screens", span: "full" },
    ],
  },
  {
    id: 3,
    slug: "solstice-title-sequence",
    title: "Solstice Title Sequence",
    discipline: "Motion Design",
    description: "Opening titles for an independent documentary — hand-lettered type animated through film grain and light leaks.",
    overview: "The director of Solstice wanted titles that felt handmade — something that pushed back against the sterile precision of digital tools. I started with hand-lettered type, scanned at high resolution, then built the animation entirely in After Effects using real film grain overlays and practical light leak footage.\n\nThe result is a 90-second sequence that feels like it was pulled from an archive.",
    year: "2023",
    role: ["Motion Design", "Hand Lettering", "Art Direction"],
    deliverables: ["Title Sequence", "Lower Thirds", "End Credits", "Motion Style Guide"],
    mediaType: "video",
    mediaSrc: "https://www.w3schools.com/html/movie.mp4",
    featured: false,
    gallery: [
      { type: "video", src: "https://www.w3schools.com/html/movie.mp4", caption: "Full title sequence", span: "full" },
      { type: "color", color: "#2A2620", caption: "Hand-lettered type studies", span: "half" },
      { type: "color", color: "#4A3A30", caption: "Film grain texture exploration", span: "half" },
      { type: "color", color: "#1A1410", caption: "Lower thirds — documentary chapter cards", span: "full" },
    ],
  },
  {
    id: 4,
    slug: "golden-hour",
    title: "Golden Hour",
    discipline: "Photography",
    description: "A series of landscape photographs shot across the American Southwest — exploring scale, solitude, and the quality of late light.",
    overview: "Golden Hour is an ongoing personal project — a slow accumulation of landscapes shot during the hour before sunset across Utah, Arizona, and New Mexico. The work is about the particular quality of that light: the way it flattens distance, saturates color, and makes vast spaces feel intimate.\n\nAll images shot on medium format film.",
    year: "2023",
    role: ["Photography", "Film Processing", "Print Editing"],
    deliverables: ["40-image Series", "Exhibition Prints", "Photo Book (in progress)"],
    mediaType: "color",
    mediaColor: "#C8593A",
    featured: false,
    gallery: [
      { type: "color", color: "#C8593A", caption: "Monument Valley, Utah — October 2023", span: "full" },
      { type: "color", color: "#D4724A", caption: "Antelope Canyon, Arizona", span: "half" },
      { type: "color", color: "#8C4A30", caption: "Arches National Park, Utah", span: "half" },
      { type: "color", color: "#E8A060", caption: "White Sands, New Mexico — dusk", span: "full" },
      { type: "color", color: "#6B3A20", caption: "Zion National Park, Utah", span: "half" },
      { type: "color", color: "#A06040", caption: "Horseshoe Bend, Arizona", span: "half" },
    ],
  },
  {
    id: 5,
    slug: "meridian-app",
    title: "Meridian App",
    discipline: "UI/UX Design",
    description: "Travel companion app — research, wireframes, and high-fidelity prototype for iOS.",
    overview: "Meridian started with a simple observation: spontaneous travel is broken. Every existing tool assumes you know where you're going. Meridian is designed for the opposite — helping people discover and plan trips on the fly, with minimal friction and maximum delight.\n\nThe project ran from initial research through to a fully interactive Figma prototype, tested with 24 participants across three rounds of usability testing.",
    year: "2023",
    role: ["UX Research", "Product Strategy", "UI Design", "Prototyping"],
    deliverables: ["Research Report", "User Flows", "Wireframes", "High-fidelity Prototype", "Usability Test Report"],
    mediaType: "color",
    mediaColor: "#3A5A8C",
    featured: false,
    gallery: [
      { type: "color", color: "#3A5A8C", caption: "Discovery screen — personalized recommendations", span: "full" },
      { type: "color", color: "#4A6A9C", caption: "Onboarding flow", span: "half" },
      { type: "color", color: "#2A4A7C", caption: "Trip planning interface", span: "half" },
      { type: "color", color: "#1A3A6C", caption: "Map exploration mode", span: "full" },
    ],
  },
  {
    id: 6,
    slug: "concrete-and-type",
    title: "Concrete & Type",
    discipline: "Graphic Design",
    description: "Editorial poster series exploring the relationship between brutalist architecture and experimental typography.",
    overview: "Concrete & Type is a personal project born from a fascination with the visual language of brutalist architecture — its repetition, weight, and uncompromising geometry. Each poster in the series takes a different brutalist building as its subject and uses experimental typography to echo the building's formal qualities.\n\nThe series has been exhibited in three cities and is available as limited edition prints.",
    year: "2022",
    role: ["Concept Development", "Typographic Design", "Print Production"],
    deliverables: ["12-poster Series", "Exhibition Design", "Limited Edition Prints"],
    mediaType: "color",
    mediaColor: "#6B6560",
    featured: false,
    gallery: [
      { type: "color", color: "#6B6560", caption: "Barbican Centre, London — poster 01", span: "full" },
      { type: "color", color: "#4A4540", caption: "Trellick Tower, London — poster 02", span: "half" },
      { type: "color", color: "#8A8580", caption: "Habitat 67, Montreal — poster 03", span: "half" },
      { type: "color", color: "#3A3530", caption: "Boston City Hall — poster 04", span: "full" },
    ],
  },
  {
    id: 7,
    slug: "drift-motion-reel",
    title: "Drift Motion Reel",
    discipline: "Motion Design",
    description: "Annual showreel — a curated edit of motion work spanning brand films, kinetic typography, and 3D explorations.",
    overview: "Drift is my annual motion reel — a two-minute edit of the work I'm most proud of from the past year. The 2022 edition spans brand films for three clients, a series of kinetic typography experiments, and early explorations in 3D motion.\n\nThe reel itself was designed as a piece of work in its own right — with custom transitions, a commissioned soundtrack, and a consistent visual language that ties disparate projects together.",
    year: "2022",
    role: ["Motion Design", "3D Animation", "Sound Design", "Editing"],
    deliverables: ["2-minute Showreel", "Individual Project Cuts", "Social Edits"],
    mediaType: "video",
    mediaSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    featured: false,
    gallery: [
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Full showreel — 2022", span: "full" },
      { type: "color", color: "#2A2A3A", caption: "Brand film — client 01", span: "half" },
      { type: "color", color: "#3A3A4A", caption: "Kinetic typography series", span: "half" },
      { type: "color", color: "#1A1A2A", caption: "3D motion explorations", span: "full" },
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

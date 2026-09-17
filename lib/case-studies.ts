import fs from "fs";
import path from "path";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/projects");

// Rich, narrative project case studies live as MDX here, keyed by project slug.
// Projects without a matching file fall back to the structured overview/gallery
// fields in lib/projects-data.ts — this is additive, not a replacement.
export function getCaseStudyContent(slug: string): string | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

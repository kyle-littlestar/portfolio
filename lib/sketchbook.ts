import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ENTRIES_DIR = path.join(process.cwd(), "content/sketchbook");

export type SketchbookEntry = {
  slug: string;
  title: string;
  date: string;
  discipline: string;
  image: string;
  takeaway: string;
  note: string;
};

export function getAllSketchbookEntries(): SketchbookEntry[] {
  if (!fs.existsSync(ENTRIES_DIR)) return [];

  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        discipline: data.discipline || "Design",
        image: data.image || "",
        takeaway: data.takeaway || "",
        note: content.trim(),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

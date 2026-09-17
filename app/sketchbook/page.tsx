import { getAllSketchbookEntries } from "@/lib/sketchbook";
import SketchbookPage from "./SketchbookPage";

export const metadata = {
  title: "Sketchbook",
  description:
    "Daily design exercises and quick studies — the practice behind the polished work.",
};

export default function Sketchbook() {
  const entries = getAllSketchbookEntries();
  return <SketchbookPage entries={entries} />;
}

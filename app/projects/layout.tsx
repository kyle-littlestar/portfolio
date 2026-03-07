import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects spanning graphic design, motion design, UI/UX, and photography by Kyle Littlestar.",
  openGraph: {
    title: "Work | Kyle Littlestar",
    description: "Selected projects spanning graphic design, motion design, UI/UX, and photography.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

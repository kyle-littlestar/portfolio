import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kyle Littlestar for freelance, collaboration, or full-time opportunities.",
  openGraph: {
    title: "Contact | Kyle Littlestar",
    description: "Get in touch for freelance, collaboration, or full-time opportunities.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

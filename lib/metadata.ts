import type { Metadata } from "next";

const BASE_URL = "https://ltlstar.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kyle Littlestar — Creative Designer",
    template: "%s | Kyle Littlestar",
  },
  description: "Multi-disciplinary creative designer specialising in graphic design, motion design, UI/UX, and photography.",
  keywords: ["graphic design", "motion design", "UI/UX design", "photography", "creative designer", "Kyle Littlestar"],
  authors: [{ name: "Kyle Littlestar" }],
  creator: "Kyle Littlestar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Kyle Littlestar",
    title: "Kyle Littlestar — Creative Designer",
    description: "Multi-disciplinary creative designer specialising in graphic design, motion design, UI/UX, and photography.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kyle Littlestar — Creative Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyle Littlestar — Creative Designer",
    description: "Multi-disciplinary creative designer specialising in graphic design, motion design, UI/UX, and photography.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

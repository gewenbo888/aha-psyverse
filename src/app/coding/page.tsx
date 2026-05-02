import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoon } from "./client";

export const metadata: Metadata = {
  title: "Interactive Coding Lessons | aha",
  description: "Learn programming by writing code in the browser with instant visual feedback. Coming soon.",
  alternates: { canonical: "/coding" },
  openGraph: {
    title: "Interactive Coding Lessons — aha",
    description: "Learn programming by doing. Visual debugging, instant feedback. Coming soon.",
    url: "https://aha.psyverse.fun/coding",
    type: "article",
  },
};

export default function CodingPage() {
  return <ComingSoon />;
}

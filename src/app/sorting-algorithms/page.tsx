import type { Metadata } from "next";
import Sorting from "@/visualizations/Sorting";
import { DemoFrameClient } from "./client";

export const metadata: Metadata = {
  title: "Sorting Algorithm Animation | aha",
  description:
    "Watch bubble sort, quicksort, and merge sort race side-by-side on the same array. See comparisons and swaps in real time.",
  alternates: { canonical: "/sorting-algorithms" },
  openGraph: {
    title: "Sorting Algorithms — animated, interactive — aha",
    description:
      "Three sorting algorithms race on the same data. See why quicksort wins.",
    url: "https://aha.psyverse.fun/sorting-algorithms",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Sorting Algorithm Visualization",
  description: "Side-by-side animated comparison of bubble sort, quicksort, and merge sort.",
  educationalLevel: "Beginner to Advanced",
  inLanguage: ["en", "zh-CN"],
  url: "https://aha.psyverse.fun/sorting-algorithms",
  about: { "@type": "Thing", name: "Sorting algorithms" },
  learningResourceType: "Interactive simulation",
  isAccessibleForFree: true,
};

export default function SortingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DemoFrameClient>
        <Sorting />
      </DemoFrameClient>
    </>
  );
}

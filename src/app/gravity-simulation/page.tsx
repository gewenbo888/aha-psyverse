import type { Metadata } from "next";
import Gravity from "@/visualizations/Gravity";
import { DemoFrameClient } from "./client";

export const metadata: Metadata = {
  title: "Gravity & Orbit Simulation | aha",
  description:
    "Interactive n-body gravity simulator. Click and drag to launch planets. Watch real orbits, binary stars, and three-body chaos.",
  alternates: { canonical: "/gravity-simulation" },
  openGraph: {
    title: "Gravity & Orbits — interactive physics — aha",
    description:
      "Click-drag to launch a body. Real n-body gravity. Solar, binary, and three-body presets.",
    url: "https://aha.psyverse.fun/gravity-simulation",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Gravity & Orbits Simulation",
  description: "Interactive n-body gravity simulation with launchable bodies and presets.",
  educationalLevel: "Beginner to Advanced",
  inLanguage: ["en", "zh-CN"],
  url: "https://aha.psyverse.fun/gravity-simulation",
  about: { "@type": "Thing", name: "Newtonian gravity" },
  learningResourceType: "Interactive simulation",
  isAccessibleForFree: true,
};

export default function GravityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DemoFrameClient>
        <Gravity />
      </DemoFrameClient>
    </>
  );
}

import type { Metadata } from "next";
import Fourier from "@/visualizations/Fourier";
import { DemoFrameClient } from "./client";

export const metadata: Metadata = {
  title: "Fourier Transform Visualization | aha",
  description:
    "Interactive Fourier transform demo. See how any signal decomposes into pure frequencies. Drag the sliders, watch the spectrum update in real time.",
  alternates: { canonical: "/fourier-transform" },
  openGraph: {
    title: "Visualize the Fourier Transform — aha",
    description:
      "Drag sliders. Watch a signal decompose into pure waves. Finally understand frequency.",
    url: "https://aha.psyverse.fun/fourier-transform",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Fourier Transform Visualization",
  description: "Interactive visualization of the Fourier transform.",
  educationalLevel: "Beginner to Advanced",
  inLanguage: ["en", "zh-CN"],
  url: "https://aha.psyverse.fun/fourier-transform",
  about: { "@type": "Thing", name: "Fourier transform" },
  learningResourceType: "Interactive simulation",
  isAccessibleForFree: true,
};

export default function FourierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DemoFrameClient>
        <Fourier />
      </DemoFrameClient>
    </>
  );
}

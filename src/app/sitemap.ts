import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aha.psyverse.fun";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/fourier-transform`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sorting-algorithms`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gravity-simulation`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/coding`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}

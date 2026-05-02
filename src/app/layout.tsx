import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { AhaProvider } from "@/lib/providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aha.psyverse.fun"),
  title: "aha — visual learning engine | 可视化学习引擎",
  description:
    "Interactive visualizations of algorithms, mathematics, and physics. Drag the sliders. Watch the math move. Finally understand it.",
  keywords: [
    "visualize Fourier transform",
    "sorting algorithm animation",
    "interactive physics simulation",
    "gravity orbit simulator",
    "learn algorithms visually",
    "math visualization",
    "傅里叶变换可视化",
    "排序算法动画",
    "交互式物理模拟",
    "数学可视化",
    "Psyverse",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "aha · 啊哈 (Visual Learning Engine)" }],
    title: "aha — visual learning engine",
    description:
      "Play with abstract ideas until they click. Fourier transforms, sorting algorithms, gravity simulations — all interactive.",
    url: "https://aha.psyverse.fun/",
    siteName: "aha",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: "aha — see it. play with it. finally understand it.",
    description:
      "Interactive visualizations that turn abstract ideas into intuition.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#FFE15A" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <AhaProvider>
          <Nav />
          {children}
          <Footer />
        </AhaProvider>
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

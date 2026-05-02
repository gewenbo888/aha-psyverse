"use client";

import Link from "next/link";
import { useAha } from "@/lib/providers";

export function ComingSoon() {
  const { tr, lang } = useAha();
  return (
    <main className="container-aha py-24 md:py-32">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ash transition hover:text-spark"
      >
        ← {tr("back")}
      </Link>
      <div className="max-w-3xl">
        <div className="eyebrow mb-3">aha · {tr("navCoding")}</div>
        <h1 className="display-h1 mb-6">{tr("v2Coding")}</h1>
        <p className="text-lg text-ash md:text-xl">
          {lang === "en"
            ? "Interactive coding lessons with visual debugging are next on the roadmap. Subscribe via the Psyverse manifesto to know when they ship."
            : "下一步要做的是带可视化调试的交互式编程课。订阅 Psyverse 主站，第一时间收到上线通知。"}
        </p>
        <div className="mt-10 flex gap-3">
          <Link href="/" className="btn-primary">
            {lang === "en" ? "Try the live demos" : "去体验已上线的 demo"} →
          </Link>
          <a href="https://psyverse.fun" className="btn-ghost">
            {tr("footerPsyverse")}
          </a>
        </div>
      </div>
    </main>
  );
}

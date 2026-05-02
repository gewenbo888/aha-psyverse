"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useAha } from "@/lib/providers";

interface DemoFrameProps {
  titleKey: string;
  subtitleKey: string;
  eli10Key: string;
  advancedKey: string;
  shareUrl: () => string;
  embedUrl: () => string;
  children: ReactNode;
  faq?: { q: string; a: string }[];
}

export function DemoFrame({
  titleKey,
  subtitleKey,
  eli10Key,
  advancedKey,
  shareUrl,
  embedUrl,
  children,
  faq,
}: DemoFrameProps) {
  const { tr } = useAha();
  const [mode, setMode] = useState<"eli10" | "advanced">("eli10");
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleShare = async () => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setShareToast(tr("shareCopied" as any));
      setTimeout(() => setShareToast(null), 1800);
    } catch {}
  };

  const handleEmbed = async () => {
    const code = `<iframe src="${embedUrl()}" width="100%" height="600" frameborder="0" allow="autoplay" style="border-radius:16px;background:#0B0B0E"></iframe>`;
    try {
      await navigator.clipboard.writeText(code);
      setShareToast(tr("embedCopied" as any));
      setTimeout(() => setShareToast(null), 1800);
    } catch {}
  };

  return (
    <main className="container-aha py-10 md:py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ash transition hover:text-spark"
      >
        ← {tr("back" as any)}
      </Link>

      <header className="mb-10 max-w-3xl animate-fade-in">
        <div className="eyebrow mb-3">aha · {tr(titleKey as any)}</div>
        <h1 className="display-h1">{tr(titleKey as any)}</h1>
        <p className="mt-4 text-lg text-ash md:text-xl">{tr(subtitleKey as any)}</p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex rounded-full border border-smoke p-1">
          <button
            onClick={() => setMode("eli10")}
            className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
              mode === "eli10" ? "bg-spark text-ink" : "text-ash hover:text-paper"
            }`}
          >
            {tr("modeEli10" as any)}
          </button>
          <button
            onClick={() => setMode("advanced")}
            className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
              mode === "advanced" ? "bg-spark text-ink" : "text-ash hover:text-paper"
            }`}
          >
            {tr("modeAdvanced" as any)}
          </button>
        </div>
        <button onClick={handleShare} className="btn-ghost">
          {tr("share" as any)}
        </button>
        <button onClick={handleEmbed} className="btn-ghost">
          {tr("embed" as any)}
        </button>
        {shareToast && (
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-spark animate-fade-in">
            ✓ {shareToast}
          </span>
        )}
      </div>

      <div className="card mb-8 border-spark/20">
        <p className="text-base leading-relaxed text-paper md:text-lg">
          {tr((mode === "eli10" ? eli10Key : advancedKey) as any)}
        </p>
      </div>

      {children}

      {faq && faq.length > 0 && (
        <section className="mt-20">
          <div className="eyebrow mb-3">{tr("faqTitle" as any)}</div>
          <div className="hairline mb-8" />
          <div className="grid gap-6 md:grid-cols-2">
            {faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-display text-xl">{item.q}</h3>
                <p className="mt-2 text-ash">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

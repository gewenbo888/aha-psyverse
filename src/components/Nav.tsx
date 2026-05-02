"use client";

import Link from "next/link";
import { useAha } from "@/lib/providers";

export function Nav() {
  const { tr, lang, setLang, theme, setTheme } = useAha();

  return (
    <header className="sticky top-0 z-40 border-b border-smoke/60 bg-ink/80 backdrop-blur dark:bg-ink/80">
      <div className="container-aha flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">aha</span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-ash sm:inline">
            ψ
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.14em] md:flex">
          <Link href="/fourier-transform" className="text-ash hover:text-spark">
            {tr("navMath")}
          </Link>
          <Link href="/sorting-algorithms" className="text-ash hover:text-spark">
            {tr("navAlgorithms")}
          </Link>
          <Link href="/gravity-simulation" className="text-ash hover:text-spark">
            {tr("navPhysics")}
          </Link>
          <Link href="/coding" className="text-ash hover:text-spark">
            {tr("navCoding")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="rounded-full border border-smoke px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition hover:border-spark hover:text-spark"
            aria-label="Toggle language"
          >
            {tr("langToggle")}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-smoke p-1.5 text-ash transition hover:border-spark hover:text-spark"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

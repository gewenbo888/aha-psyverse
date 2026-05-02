"use client";

import { useAha } from "@/lib/providers";

export function Footer() {
  const { tr } = useAha();
  return (
    <footer className="hairline mt-32">
      <div className="container-aha flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <div className="font-display text-2xl tracking-tight">aha</div>
          <div className="mt-1 text-sm text-ash">{tr("footerTagline")}</div>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-ash">
          {tr("footerPart")}{" "}
          <a href="https://psyverse.fun" className="text-paper hover:text-spark">
            {tr("footerPsyverse")}
          </a>
        </div>
      </div>
    </footer>
  );
}

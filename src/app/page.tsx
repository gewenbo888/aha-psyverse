"use client";

import Link from "next/link";
import { useAha } from "@/lib/providers";
import { useEffect, useRef } from "react";

export default function Home() {
  const { tr } = useAha();
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  // Hero canvas: animated wave field
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      const cols = 28;
      const rows = 14;
      const cw = rect.width / cols;
      const rh = rect.height / rows;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cw;
          const y = j * rh;
          const dx = x - rect.width / 2;
          const dy = y - rect.height / 2;
          const r = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(r / 36 - t * 1.6) * 0.5 + 0.5;
          const a = wave * 0.4 + 0.04;
          ctx.fillStyle = `rgba(255, 225, 90, ${a})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.4 + wave * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <canvas
          ref={heroCanvasRef}
          className="absolute inset-0 h-full w-full opacity-70"
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(11,11,14,0) 0%, rgba(11,11,14,0.7) 70%, rgba(11,11,14,1) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="container-aha relative py-24 md:py-36">
          <div className="max-w-4xl animate-slide-up">
            <div className="eyebrow mb-4">{tr("heroEyebrow")}</div>
            <h1 className="display-h1 mb-6">{tr("heroTitle")}</h1>
            <p className="max-w-2xl text-lg text-ash md:text-xl">{tr("heroSubtitle")}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/fourier-transform" className="btn-primary">
                {tr("heroCta")} →
              </Link>
              <a href="#why" className="btn-ghost">
                {tr("heroSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-aha py-24 md:py-32">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-3">{tr("featuredEyebrow")}</div>
          <h2 className="display-h2">{tr("featuredTitle")}</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            href="/fourier-transform"
            eyebrow={tr("catMath")}
            title={tr("fourierTitle")}
            desc={tr("fourierSubtitle")}
            accent
          />
          <CategoryCard
            href="/sorting-algorithms"
            eyebrow={tr("catAlgo")}
            title={tr("sortingTitle")}
            desc={tr("sortingSubtitle")}
            accent
          />
          <CategoryCard
            href="/gravity-simulation"
            eyebrow={tr("catPhysics")}
            title={tr("gravityTitle")}
            desc={tr("gravitySubtitle")}
            accent
          />
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="border-y border-smoke/40 bg-graphite/30">
        <div className="container-aha py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
            <div>
              <div className="eyebrow mb-3">{tr("whyEyebrow")}</div>
              <h2 className="display-h2 max-w-md">{tr("whyTitle")}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              {tr("whyBody")}
            </p>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="container-aha py-24 md:py-32">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-3">{tr("comingSoonTitle")}</div>
          <h2 className="display-h2">{tr("comingSoonSub")}</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {[
            "v2Linear",
            "v2Calculus",
            "v2Probability",
            "v2Waves",
            "v2Optics",
            "v2Mechanics",
            "v2BFS",
            "v2Dijkstra",
            "v2Trees",
            "v2Coding",
          ].map((k) => (
            <div
              key={k}
              className="rounded-xl border border-smoke/60 bg-graphite/40 px-4 py-5"
            >
              <div className="font-display text-lg">{tr(k as any)}</div>
              <div className="stat mt-1">{tr("comingSoon")}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function CategoryCard({
  href,
  eyebrow,
  title,
  desc,
  accent,
}: {
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <Link href={href} className="group">
      <div className="card relative h-full overflow-hidden">
        <div className="eyebrow mb-4">{eyebrow}</div>
        <h3 className="font-display text-2xl tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 text-sm text-ash md:text-base">{desc}</p>
        <div className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-spark transition group-hover:gap-3">
          Explore →
        </div>
        {accent && (
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition group-hover:opacity-50"
            style={{ background: "#FFE15A" }}
          />
        )}
      </div>
    </Link>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useAha } from "@/lib/providers";

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  trail: { x: number; y: number }[];
  hue: number;
}

type Preset = "solar" | "binary" | "chaos";

function makePreset(p: Preset, w: number, h: number): Body[] {
  const cx = w / 2;
  const cy = h / 2;
  const G = 1; // not used here, just orientation
  if (p === "solar") {
    return [
      { x: cx, y: cy, vx: 0, vy: 0, mass: 1500, trail: [], hue: 50 },
      { x: cx + 120, y: cy, vx: 0, vy: -1.8, mass: 8, trail: [], hue: 180 },
      { x: cx + 200, y: cy, vx: 0, vy: -1.4, mass: 5, trail: [], hue: 220 },
      { x: cx - 280, y: cy, vx: 0, vy: 1.2, mass: 12, trail: [], hue: 0 },
    ];
  }
  if (p === "binary") {
    return [
      { x: cx - 80, y: cy, vx: 0, vy: -1.2, mass: 400, trail: [], hue: 30 },
      { x: cx + 80, y: cy, vx: 0, vy: 1.2, mass: 400, trail: [], hue: 200 },
      { x: cx, y: cy - 240, vx: 1.5, vy: 0, mass: 4, trail: [], hue: 100 },
    ];
  }
  // chaos
  return [
    { x: cx - 100, y: cy - 60, vx: 0.5, vy: 0.4, mass: 250, trail: [], hue: 0 },
    { x: cx + 100, y: cy - 60, vx: -0.5, vy: 0.4, mass: 250, trail: [], hue: 120 },
    { x: cx, y: cy + 100, vx: 0, vy: -0.8, mass: 250, trail: [], hue: 240 },
  ];
}

export default function Gravity() {
  const { tr } = useAha();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodiesRef = useRef<Body[]>([]);
  const [preset, setPreset] = useState<Preset>("solar");
  const [G, setG] = useState(0.6);
  const [newMass, setNewMass] = useState(8);
  const [running, setRunning] = useState(true);
  const dragRef = useRef<{ start: { x: number; y: number }; current: { x: number; y: number } } | null>(null);

  // URL state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("preset", preset);
    params.set("g", G.toFixed(2));
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }, [preset, G]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("preset") as Preset | null;
    const g = parseFloat(params.get("g") || "");
    if (p === "solar" || p === "binary" || p === "chaos") setPreset(p);
    if (isFinite(g) && g >= 0.1 && g <= 2) setG(g);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      // initialize bodies on first resize if empty
      if (bodiesRef.current.length === 0) {
        bodiesRef.current = makePreset(preset, rect.width, rect.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dragRef.current = { start: { x, y }, current: { x, y } };
    };
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const rect = canvas.getBoundingClientRect();
      dragRef.current.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onUp = () => {
      if (!dragRef.current) return;
      const { start, current } = dragRef.current;
      const dx = (current.x - start.x) * 0.02;
      const dy = (current.y - start.y) * 0.02;
      bodiesRef.current.push({
        x: start.x,
        y: start.y,
        vx: dx,
        vy: dy,
        mass: newMass,
        trail: [],
        hue: Math.floor(Math.random() * 360),
      });
      dragRef.current = null;
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      // trail layer: subtract slightly transparent dark
      ctx.fillStyle = "rgba(11, 11, 14, 0.18)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const bodies = bodiesRef.current;

      if (running) {
        const dt = 0.5;
        // compute accelerations
        const ax = new Array(bodies.length).fill(0);
        const ay = new Array(bodies.length).fill(0);
        for (let i = 0; i < bodies.length; i++) {
          for (let j = 0; j < bodies.length; j++) {
            if (i === j) continue;
            const dx = bodies[j].x - bodies[i].x;
            const dy = bodies[j].y - bodies[i].y;
            const r2 = Math.max(dx * dx + dy * dy, 80);
            const r = Math.sqrt(r2);
            const f = (G * bodies[j].mass) / r2;
            ax[i] += (f * dx) / r;
            ay[i] += (f * dy) / r;
          }
        }
        for (let i = 0; i < bodies.length; i++) {
          bodies[i].vx += ax[i] * dt;
          bodies[i].vy += ay[i] * dt;
          bodies[i].x += bodies[i].vx * dt;
          bodies[i].y += bodies[i].vy * dt;
          bodies[i].trail.push({ x: bodies[i].x, y: bodies[i].y });
          if (bodies[i].trail.length > 240) bodies[i].trail.shift();
        }
      }

      // draw trails
      for (const b of bodies) {
        if (b.trail.length < 2) continue;
        ctx.strokeStyle = `hsla(${b.hue}, 70%, 65%, 0.4)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(b.trail[0].x, b.trail[0].y);
        for (let i = 1; i < b.trail.length; i++) {
          ctx.lineTo(b.trail[i].x, b.trail[i].y);
        }
        ctx.stroke();
      }

      // draw bodies
      for (const b of bodies) {
        const r = Math.max(2, Math.cbrt(b.mass) * 1.4);
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r * 3);
        grad.addColorStop(0, `hsla(${b.hue}, 90%, 70%, 1)`);
        grad.addColorStop(0.5, `hsla(${b.hue}, 90%, 60%, 0.5)`);
        grad.addColorStop(1, `hsla(${b.hue}, 90%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFE15A";
        ctx.beginPath();
        ctx.arc(b.x, b.y, r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // drag indicator
      if (dragRef.current) {
        const { start, current } = dragRef.current;
        ctx.strokeStyle = "#FFE15A";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(current.x, current.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(255,225,90,0.4)";
        ctx.beginPath();
        ctx.arc(start.x, start.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [G, newMass, preset, running]);

  const onPreset = (p: Preset) => {
    setPreset(p);
    const c = canvasRef.current;
    if (c) {
      const rect = c.getBoundingClientRect();
      bodiesRef.current = makePreset(p, rect.width, rect.height);
    }
  };

  const onClear = () => {
    bodiesRef.current = [];
  };

  return (
    <div className="grid gap-4">
      <div className="card p-3">
        <canvas
          ref={canvasRef}
          className="block h-[480px] w-full cursor-crosshair touch-none"
          style={{ background: "#0B0B0E" }}
        />
        <div className="mt-2 px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
          {tr("gravityHint")}
        </div>
      </div>

      <div className="card grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div>
          <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
            <span>{tr("gravityGravityStrength")}</span>
            <span className="text-paper">{G.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.05}
            value={G}
            className="slider"
            onChange={(e) => setG(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
            <span>{tr("gravityMass")}</span>
            <span className="text-paper">{newMass}</span>
          </div>
          <input
            type="range"
            min={1}
            max={500}
            step={1}
            value={newMass}
            className="slider"
            onChange={(e) => setNewMass(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn-primary">
            {running ? tr("sortingPause") : tr("sortingPlay")}
          </button>
          <button onClick={onClear} className="btn-ghost">
            {tr("gravityClear")}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="stat self-center">{tr("gravityPreset")}:</span>
        {(["solar", "binary", "chaos"] as Preset[]).map((p) => (
          <button
            key={p}
            onClick={() => onPreset(p)}
            className={
              preset === p
                ? "rounded-full border border-spark bg-spark px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink"
                : "rounded-full border border-smoke px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash hover:border-spark hover:text-spark"
            }
          >
            {p === "solar"
              ? tr("gravityPresetSolar")
              : p === "binary"
              ? tr("gravityPresetBinary")
              : tr("gravityPresetChaos")}
          </button>
        ))}
      </div>
    </div>
  );
}

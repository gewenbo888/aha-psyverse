"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAha } from "@/lib/providers";

interface Wave {
  freq: number;
  amp: number;
  phase: number;
}

const DEFAULT_WAVES: Wave[] = [
  { freq: 1, amp: 0.6, phase: 0 },
  { freq: 3, amp: 0.3, phase: 0 },
  { freq: 5, amp: 0.18, phase: 0 },
];

function encodeWaves(waves: Wave[]): string {
  return waves.map((w) => `${w.freq.toFixed(1)},${w.amp.toFixed(2)},${w.phase.toFixed(2)}`).join(";");
}

function decodeWaves(s: string | null): Wave[] | null {
  if (!s) return null;
  try {
    const parts = s.split(";").map((p) => {
      const [f, a, ph] = p.split(",").map(parseFloat);
      if (isFinite(f) && isFinite(a) && isFinite(ph)) return { freq: f, amp: a, phase: ph };
      throw new Error();
    });
    if (parts.length === 0 || parts.length > 8) return null;
    return parts;
  } catch {
    return null;
  }
}

export default function Fourier() {
  const { tr } = useAha();
  const [waves, setWaves] = useState<Wave[]>(DEFAULT_WAVES);
  const timeCanvasRef = useRef<HTMLCanvasElement>(null);
  const freqCanvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);

  // Decode share-state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const decoded = decodeWaves(params.get("w"));
    if (decoded) setWaves(decoded);
  }, []);

  // Sync waves to URL hash for sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("w", encodeWaves(waves));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [waves]);

  // Animate
  useEffect(() => {
    const time = timeCanvasRef.current!;
    const freq = freqCanvasRef.current!;
    if (!time || !freq) return;
    const tCtx = time.getContext("2d")!;
    const fCtx = freq.getContext("2d")!;
    let raf = 0;
    let last = performance.now();

    const setupCanvas = (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = c.getBoundingClientRect();
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const resize = () => {
      setupCanvas(time, tCtx);
      setupCanvas(freq, fCtx);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      phaseRef.current += dt * 0.6; // global drift to make it feel alive

      // ── time domain ──
      const tRect = time.getBoundingClientRect();
      tCtx.clearRect(0, 0, tRect.width, tRect.height);
      const cy = tRect.height / 2;

      // axis
      tCtx.strokeStyle = "rgba(255,255,255,0.08)";
      tCtx.lineWidth = 1;
      tCtx.beginPath();
      tCtx.moveTo(0, cy);
      tCtx.lineTo(tRect.width, cy);
      tCtx.stroke();

      // Each component as a faint ghost
      waves.forEach((w, i) => {
        const hue = 200 + i * 35;
        tCtx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.35)`;
        tCtx.lineWidth = 1;
        tCtx.beginPath();
        for (let x = 0; x <= tRect.width; x += 1) {
          const u = x / tRect.width;
          const y = cy - Math.sin(u * 2 * Math.PI * w.freq + w.phase + phaseRef.current) * w.amp * (cy * 0.8);
          if (x === 0) tCtx.moveTo(x, y);
          else tCtx.lineTo(x, y);
        }
        tCtx.stroke();
      });

      // Composite signal in spark color
      tCtx.strokeStyle = "#FFE15A";
      tCtx.lineWidth = 2.4;
      tCtx.beginPath();
      for (let x = 0; x <= tRect.width; x += 1) {
        const u = x / tRect.width;
        let v = 0;
        for (const w of waves) {
          v += Math.sin(u * 2 * Math.PI * w.freq + w.phase + phaseRef.current) * w.amp;
        }
        const y = cy - v * (cy * 0.8);
        if (x === 0) tCtx.moveTo(x, y);
        else tCtx.lineTo(x, y);
      }
      tCtx.stroke();

      // ── frequency domain ──
      const fRect = freq.getBoundingClientRect();
      fCtx.clearRect(0, 0, fRect.width, fRect.height);
      // axes
      fCtx.strokeStyle = "rgba(255,255,255,0.08)";
      fCtx.lineWidth = 1;
      fCtx.beginPath();
      fCtx.moveTo(40, 20);
      fCtx.lineTo(40, fRect.height - 30);
      fCtx.lineTo(fRect.width - 10, fRect.height - 30);
      fCtx.stroke();

      const maxFreq = 12;
      const colW = (fRect.width - 60) / maxFreq;
      const baseY = fRect.height - 30;
      const maxBarH = fRect.height - 60;

      for (let f = 1; f <= maxFreq; f++) {
        const x = 40 + (f - 0.5) * colW;
        const match = waves.find((w) => Math.round(w.freq) === f);
        const amp = match ? match.amp : 0;
        const h = amp * maxBarH;
        fCtx.fillStyle = match ? "#FFE15A" : "rgba(255,255,255,0.08)";
        fCtx.fillRect(x - colW * 0.3, baseY - h, colW * 0.6, h);
        // labels
        fCtx.fillStyle = "rgba(255,255,255,0.4)";
        fCtx.font = "10px ui-monospace, monospace";
        fCtx.textAlign = "center";
        fCtx.fillText(`${f}`, x, baseY + 14);
      }
      // y-axis label
      fCtx.fillStyle = "rgba(255,255,255,0.5)";
      fCtx.font = "10px ui-monospace, monospace";
      fCtx.textAlign = "right";
      fCtx.fillText("amp", 36, 26);
      fCtx.textAlign = "left";
      fCtx.fillText("freq", fRect.width - 40, baseY + 14);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [waves]);

  const updateWave = (i: number, key: keyof Wave, val: number) =>
    setWaves((ws) => ws.map((w, j) => (j === i ? { ...w, [key]: val } : w)));

  const addWave = () =>
    setWaves((ws) => (ws.length >= 8 ? ws : [...ws, { freq: ws.length + 2, amp: 0.2, phase: 0 }]));

  const removeWave = (i: number) => setWaves((ws) => ws.filter((_, j) => j !== i));

  return (
    <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
      <div className="card p-3">
        <div className="stat px-2 pb-2 pt-1">{tr("fourierTimeDomain")}</div>
        <canvas ref={timeCanvasRef} className="block h-[280px] w-full" />
      </div>
      <div className="card p-3">
        <div className="stat px-2 pb-2 pt-1">{tr("fourierFreqDomain")}</div>
        <canvas ref={freqCanvasRef} className="block h-[280px] w-full" />
      </div>

      <div className="card lg:col-span-2">
        <div className="grid gap-4">
          {waves.map((w, i) => (
            <div key={i} className="grid items-center gap-3 md:grid-cols-[40px_1fr_1fr_1fr_auto]">
              <div className="font-mono text-xs text-spark">#{i + 1}</div>
              <SliderRow
                label={tr("fourierFreq")}
                value={w.freq}
                min={1}
                max={12}
                step={1}
                fmt={(v) => `${v}`}
                onChange={(v) => updateWave(i, "freq", v)}
              />
              <SliderRow
                label={tr("fourierAmp")}
                value={w.amp}
                min={0}
                max={1}
                step={0.01}
                fmt={(v) => v.toFixed(2)}
                onChange={(v) => updateWave(i, "amp", v)}
              />
              <SliderRow
                label={tr("fourierPhase")}
                value={w.phase}
                min={-Math.PI}
                max={Math.PI}
                step={0.05}
                fmt={(v) => `${(v / Math.PI).toFixed(2)}π`}
                onChange={(v) => updateWave(i, "phase", v)}
              />
              <button
                className="rounded-full border border-smoke px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ash hover:border-coral hover:text-coral"
                onClick={() => removeWave(i)}
                disabled={waves.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addWave}
            disabled={waves.length >= 8}
            className="btn-ghost mt-2 self-start disabled:opacity-30"
          >
            + {tr("fourierAddWave")}
          </button>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  fmt,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
        <span>{label}</span>
        <span className="text-paper">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="slider"
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

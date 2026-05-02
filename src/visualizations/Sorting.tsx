"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAha } from "@/lib/providers";

type Op = { type: "compare" | "swap" | "set"; i: number; j?: number; value?: number };

function recordOps(arr: number[], algo: "bubble" | "quick" | "merge"): Op[] {
  const a = [...arr];
  const ops: Op[] = [];
  if (algo === "bubble") {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        ops.push({ type: "compare", i: j, j: j + 1 });
        if (a[j] > a[j + 1]) {
          ops.push({ type: "swap", i: j, j: j + 1 });
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
      }
    }
  } else if (algo === "quick") {
    const qs = (lo: number, hi: number) => {
      if (lo >= hi) return;
      const pivot = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        ops.push({ type: "compare", i: j, j: hi });
        if (a[j] < pivot) {
          if (i !== j) {
            ops.push({ type: "swap", i, j });
            [a[i], a[j]] = [a[j], a[i]];
          }
          i++;
        }
      }
      ops.push({ type: "swap", i, j: hi });
      [a[i], a[hi]] = [a[hi], a[i]];
      qs(lo, i - 1);
      qs(i + 1, hi);
    };
    qs(0, a.length - 1);
  } else if (algo === "merge") {
    const aux = [...a];
    const merge = (lo: number, mid: number, hi: number) => {
      for (let k = lo; k <= hi; k++) aux[k] = a[k];
      let i = lo,
        j = mid + 1;
      for (let k = lo; k <= hi; k++) {
        if (i > mid) {
          ops.push({ type: "set", i: k, value: aux[j] });
          a[k] = aux[j++];
        } else if (j > hi) {
          ops.push({ type: "set", i: k, value: aux[i] });
          a[k] = aux[i++];
        } else {
          ops.push({ type: "compare", i, j });
          if (aux[i] <= aux[j]) {
            ops.push({ type: "set", i: k, value: aux[i] });
            a[k] = aux[i++];
          } else {
            ops.push({ type: "set", i: k, value: aux[j] });
            a[k] = aux[j++];
          }
        }
      }
    };
    const ms = (lo: number, hi: number) => {
      if (lo >= hi) return;
      const mid = Math.floor((lo + hi) / 2);
      ms(lo, mid);
      ms(mid + 1, hi);
      merge(lo, mid, hi);
    };
    ms(0, a.length - 1);
  }
  return ops;
}

const ALGOS = ["bubble", "quick", "merge"] as const;
type Algo = (typeof ALGOS)[number];

const ALGO_INFO: Record<Algo, { name: { en: string; zh: string }; bigO: string }> = {
  bubble: { name: { en: "Bubble Sort", zh: "冒泡排序" }, bigO: "O(n²)" },
  quick: { name: { en: "Quicksort", zh: "快速排序" }, bigO: "O(n log n)" },
  merge: { name: { en: "Merge Sort", zh: "归并排序" }, bigO: "O(n log n)" },
};

export default function Sorting() {
  const { tr, lang } = useAha();

  const [size, setSize] = useState(40);
  const [speed, setSpeed] = useState(40); // ops per frame
  const [running, setRunning] = useState(false);

  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));

  const initialArray = useMemo(() => {
    const rng = mulberry32(seed);
    const arr: number[] = [];
    for (let i = 0; i < size; i++) arr.push(Math.floor(rng() * 100) + 5);
    return arr;
  }, [seed, size]);

  const [arrays, setArrays] = useState<Record<Algo, number[]>>({
    bubble: initialArray,
    quick: initialArray,
    merge: initialArray,
  });

  const opsRef = useRef<Record<Algo, Op[]>>({ bubble: [], quick: [], merge: [] });
  const idxRef = useRef<Record<Algo, number>>({ bubble: 0, quick: 0, merge: 0 });
  const statsRef = useRef<Record<Algo, { c: number; s: number }>>({
    bubble: { c: 0, s: 0 },
    quick: { c: 0, s: 0 },
    merge: { c: 0, s: 0 },
  });
  const highlightRef = useRef<Record<Algo, [number, number] | null>>({
    bubble: null,
    quick: null,
    merge: null,
  });

  const [, force] = useState(0);
  const refresh = () => force((x) => x + 1);

  // Reset ops + arrays whenever input changes
  useEffect(() => {
    opsRef.current = {
      bubble: recordOps(initialArray, "bubble"),
      quick: recordOps(initialArray, "quick"),
      merge: recordOps(initialArray, "merge"),
    };
    idxRef.current = { bubble: 0, quick: 0, merge: 0 };
    statsRef.current = {
      bubble: { c: 0, s: 0 },
      quick: { c: 0, s: 0 },
      merge: { c: 0, s: 0 },
    };
    highlightRef.current = { bubble: null, quick: null, merge: null };
    setArrays({
      bubble: [...initialArray],
      quick: [...initialArray],
      merge: [...initialArray],
    });
  }, [initialArray]);

  // URL state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("n", String(size));
    params.set("s", String(seed));
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }, [size, seed]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = parseInt(params.get("n") || "");
    const s = parseInt(params.get("s") || "");
    if (n >= 8 && n <= 80) setSize(n);
    if (!isNaN(s)) setSeed(s);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const step = () => {
      let anyActive = false;
      const newArrays = { ...arrays };
      for (const algo of ALGOS) {
        const ops = opsRef.current[algo];
        const stat = statsRef.current[algo];
        let i = idxRef.current[algo];
        const opsThisFrame = speed;
        const arr = [...newArrays[algo]];
        let last: [number, number] | null = highlightRef.current[algo];
        for (let k = 0; k < opsThisFrame && i < ops.length; k++, i++) {
          const op = ops[i];
          if (op.type === "compare") {
            stat.c++;
            last = [op.i, op.j!];
          } else if (op.type === "swap") {
            stat.s++;
            [arr[op.i], arr[op.j!]] = [arr[op.j!], arr[op.i]];
            last = [op.i, op.j!];
          } else if (op.type === "set") {
            arr[op.i] = op.value!;
            last = [op.i, op.i];
          }
        }
        idxRef.current[algo] = i;
        highlightRef.current[algo] = last;
        newArrays[algo] = arr;
        if (i < ops.length) anyActive = true;
      }
      setArrays(newArrays);
      if (anyActive) raf = requestAnimationFrame(step);
      else setRunning(false);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running, speed, arrays]);

  const onShuffle = () => {
    setRunning(false);
    setSeed(Math.floor(Math.random() * 1e9));
  };

  const onReset = () => {
    setRunning(false);
    idxRef.current = { bubble: 0, quick: 0, merge: 0 };
    statsRef.current = {
      bubble: { c: 0, s: 0 },
      quick: { c: 0, s: 0 },
      merge: { c: 0, s: 0 },
    };
    highlightRef.current = { bubble: null, quick: null, merge: null };
    setArrays({
      bubble: [...initialArray],
      quick: [...initialArray],
      merge: [...initialArray],
    });
  };

  const onStep = () => {
    const newArrays = { ...arrays };
    for (const algo of ALGOS) {
      const ops = opsRef.current[algo];
      let i = idxRef.current[algo];
      const stat = statsRef.current[algo];
      const arr = [...newArrays[algo]];
      let last: [number, number] | null = highlightRef.current[algo];
      let stepsToTake = 8;
      while (stepsToTake-- > 0 && i < ops.length) {
        const op = ops[i++];
        if (op.type === "compare") {
          stat.c++;
          last = [op.i, op.j!];
          break;
        } else if (op.type === "swap") {
          stat.s++;
          [arr[op.i], arr[op.j!]] = [arr[op.j!], arr[op.i]];
          last = [op.i, op.j!];
          break;
        } else if (op.type === "set") {
          arr[op.i] = op.value!;
          last = [op.i, op.i];
          break;
        }
      }
      idxRef.current[algo] = i;
      highlightRef.current[algo] = last;
      newArrays[algo] = arr;
    }
    setArrays(newArrays);
    refresh();
  };

  return (
    <div className="grid gap-4">
      <div className="card grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div>
          <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
            <span>{tr("sortingArraySize")}</span>
            <span className="text-paper">{size}</span>
          </div>
          <input
            type="range"
            min={8}
            max={80}
            step={1}
            value={size}
            className="slider"
            onChange={(e) => {
              setRunning(false);
              setSize(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
            <span>{tr("sortingSpeed")}</span>
            <span className="text-paper">{speed}</span>
          </div>
          <input
            type="range"
            min={1}
            max={200}
            step={1}
            value={speed}
            className="slider"
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <button onClick={onShuffle} className="btn-ghost">
            {tr("sortingShuffle")}
          </button>
          {running ? (
            <button onClick={() => setRunning(false)} className="btn-primary">
              {tr("sortingPause")}
            </button>
          ) : (
            <button onClick={() => setRunning(true)} className="btn-primary">
              {tr("sortingPlay")}
            </button>
          )}
          <button onClick={onStep} className="btn-ghost">
            {tr("sortingStep")}
          </button>
          <button onClick={onReset} className="btn-ghost">
            {tr("sortingReset")}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {ALGOS.map((algo) => {
          const arr = arrays[algo];
          const stat = statsRef.current[algo];
          const high = highlightRef.current[algo];
          const done = idxRef.current[algo] >= opsRef.current[algo].length && opsRef.current[algo].length > 0;
          return (
            <div key={algo} className="card">
              <div className="mb-3 flex items-baseline justify-between">
                <div>
                  <div className="font-display text-xl">{ALGO_INFO[algo].name[lang]}</div>
                  <div className="stat">{ALGO_INFO[algo].bigO}</div>
                </div>
                {done && <span className="font-mono text-xs uppercase tracking-[0.12em] text-spark animate-spark">✓ done</span>}
              </div>
              <SortBars arr={arr} highlight={high} />
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                <span>
                  {tr("sortingComparisons")}: <span className="text-paper">{stat.c}</span>
                </span>
                <span>
                  {tr("sortingSwaps")}: <span className="text-paper">{stat.s}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SortBars({ arr, highlight }: { arr: number[]; highlight: [number, number] | null }) {
  const max = Math.max(...arr, 1);
  return (
    <div className="flex h-[200px] items-end gap-[1px]">
      {arr.map((v, i) => {
        const h = (v / max) * 100;
        const hot = highlight && (i === highlight[0] || i === highlight[1]);
        return (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-colors"
            style={{
              height: `${h}%`,
              background: hot ? "#FFE15A" : "rgba(255,255,255,0.4)",
            }}
          />
        );
      })}
    </div>
  );
}

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

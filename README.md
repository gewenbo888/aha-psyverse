# aha · 啊哈

> The first time you truly understand it.
> 第一次真正理解它。

A visual learning engine. Interactive visualizations of the ideas
that usually require three coffees and a textbook — Fourier transforms,
sorting algorithms, gravity simulations — playable, shareable, embeddable.

## Links

- **Live:** [aha.psyverse.fun](https://aha.psyverse.fun)
- **Vercel:** [aha-psyverse.vercel.app](https://aha-psyverse.vercel.app)
- **GitHub:** [github.com/gewenbo888/aha-psyverse](https://github.com/gewenbo888/aha-psyverse)

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Canvas 2D (60fps custom rendering, no external viz library)
- Bilingual EN / 中文 with localStorage persistence
- Share-state encoded in URL query params

## Demos shipped (v1)

- `/fourier-transform` — Add waves, watch a signal decompose into a spectrum
- `/sorting-algorithms` — Bubble vs Quicksort vs Merge, side-by-side race
- `/gravity-simulation` — Click-drag to launch bodies, n-body Newtonian gravity

## Local dev

```bash
pnpm install   # or npm install
pnpm dev       # http://localhost:3047
```

## About

Part of the [Psyverse](https://psyverse.fun) portfolio by [Gewenbo](https://psyverse.fun).

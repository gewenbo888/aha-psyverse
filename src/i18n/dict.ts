export type Lang = "en" | "zh";

type Dict = Record<string, { en: string; zh: string }>;

export const t: Dict = {
  // ───────── Brand ─────────
  brand: { en: "aha", zh: "aha" },
  tagline: {
    en: "The first time you truly understand it.",
    zh: "第一次真正理解它。",
  },
  description: {
    en: "A visual learning engine. Play with abstract ideas until they click.",
    zh: "可视化学习引擎。亲手把抽象思想玩到豁然开朗。",
  },

  // ───────── Nav ─────────
  navAlgorithms: { en: "Algorithms", zh: "算法" },
  navMath: { en: "Mathematics", zh: "数学" },
  navPhysics: { en: "Physics", zh: "物理" },
  navCoding: { en: "Coding", zh: "编程" },
  navAbout: { en: "About", zh: "关于" },
  langToggle: { en: "中文", zh: "EN" },
  themeDark: { en: "Dark", zh: "深色" },
  themeLight: { en: "Light", zh: "浅色" },

  // ───────── Landing ─────────
  heroEyebrow: { en: "Visual learning engine", zh: "可视化学习引擎" },
  heroTitle: {
    en: "See it. Play with it. Finally understand it.",
    zh: "看到它，玩转它，终于理解它。",
  },
  heroSubtitle: {
    en: "Interactive visualizations of the ideas that usually require three coffees and a textbook. Drag the sliders. Watch the math move.",
    zh: "把通常要三杯咖啡加一本厚书才能搞懂的概念，做成可以亲手拖动的画面。拖一下滑块，看数学动起来。",
  },
  heroCta: { en: "Start exploring", zh: "开始探索" },
  heroSecondary: { en: "Why aha exists", zh: "为何而生" },

  // Category cards
  catAlgo: { en: "Algorithms", zh: "算法" },
  catAlgoDesc: {
    en: "Watch sorting algorithms race. See graph traversals branch through nodes. Build intuition for time complexity.",
    zh: "看排序算法赛跑，看图算法在节点间蔓延。把时间复杂度看进眼里。",
  },
  catMath: { en: "Mathematics", zh: "数学" },
  catMathDesc: {
    en: "Decompose any signal into pure frequencies. Stretch a matrix and watch space deform. Calculus made tangible.",
    zh: "把任意信号拆成纯频率。拉伸矩阵，看空间被它扭成什么样。让微积分变成可触碰的东西。",
  },
  catPhysics: { en: "Physics", zh: "物理" },
  catPhysicsDesc: {
    en: "Launch planets and watch them dance under gravity. Bend light through prisms. Make waves interfere.",
    zh: "把行星扔进引力场，看它们怎么跳舞。让光线穿过棱镜。让波互相干涉。",
  },
  catCoding: { en: "Coding", zh: "编程" },
  catCodingDesc: {
    en: "Write code. See it run. Step through it visually. Learn by doing the only thing that actually teaches you.",
    zh: "写代码、看它跑、一步步看它。用唯一真正能学到东西的方式：亲自动手。",
  },
  comingSoon: { en: "Coming soon", zh: "即将推出" },

  // Featured
  featuredEyebrow: { en: "Three flagship demos", zh: "三个旗舰示例" },
  featuredTitle: {
    en: "Start with the ones that change how you think.",
    zh: "从能改变你思考方式的开始。",
  },

  // Why
  whyEyebrow: { en: "The thesis", zh: "立场" },
  whyTitle: { en: "Reading is not understanding.", zh: "读懂≠理解。" },
  whyBody: {
    en: "Most ideas in math, physics, and computer science are simple — once you've watched them move. Static formulas hide the motion that makes the idea click. aha exists to put that motion back.",
    zh: "数学、物理、计算机里的多数概念其实很简单——前提是你看到过它运动的样子。静态公式把那种让你顿悟的运动藏起来了。aha 就是把它放回来。",
  },

  // Demo: Fourier
  fourierTitle: { en: "Fourier Transform", zh: "傅里叶变换" },
  fourierSubtitle: {
    en: "Every signal is a sum of pure waves. Pull them apart.",
    zh: "任何信号都是纯波的总和。把它们拆开看看。",
  },
  fourierEli10: {
    en: "Imagine a song. It sounds complicated, but it's just a stack of single notes ringing at the same time. The Fourier transform is the machine that pulls those notes apart so you can see each one. Drag the sliders to add notes. The bottom is the song. The right side is the list of notes inside it.",
    zh: "想象一首歌。它听起来复杂，其实就是一堆音符同时响。傅里叶变换就是把那些音符拆开的机器。拖动滑块加音符。下方是合成的歌，右侧是它里面包含的音符列表。",
  },
  fourierAdvanced: {
    en: "Any periodic function f(t) = Σ aₙ cos(2πnt) + bₙ sin(2πnt). The (aₙ, bₙ) coefficients are the projection of f onto the orthogonal basis of sines and cosines. The discrete spectrum on the right is the magnitude √(aₙ² + bₙ²) at each frequency.",
    zh: "任意周期函数 f(t) = Σ aₙ cos(2πnt) + bₙ sin(2πnt)。(aₙ, bₙ) 系数是 f 在正余弦正交基上的投影。右侧离散频谱是各频率的幅值 √(aₙ² + bₙ²)。",
  },
  fourierFreq: { en: "Frequency", zh: "频率" },
  fourierAmp: { en: "Amplitude", zh: "振幅" },
  fourierPhase: { en: "Phase", zh: "相位" },
  fourierAddWave: { en: "Add wave", zh: "添加波" },
  fourierRemoveWave: { en: "Remove", zh: "移除" },
  fourierTimeDomain: { en: "Time domain (the signal)", zh: "时域（信号）" },
  fourierFreqDomain: { en: "Frequency domain (the spectrum)", zh: "频域（频谱）" },

  // Demo: Sorting
  sortingTitle: { en: "Sorting Algorithms", zh: "排序算法" },
  sortingSubtitle: {
    en: "Three ways to put numbers in order. Watch them race.",
    zh: "三种把数字排好序的方法。看它们赛跑。",
  },
  sortingEli10: {
    en: "You have 50 books on a shelf in random order. You want them sorted by height. There are different ways to do this — some are slow but obvious, some are fast but clever. Press play and watch three different methods compete on the same shelf.",
    zh: "你的书架上有 50 本书乱七八糟。你想按高度排好。方法很多——有的慢但直白，有的快但巧妙。按播放键，看三种方法在同一书架上比赛。",
  },
  sortingAdvanced: {
    en: "Bubble sort: O(n²) comparisons, simple but quadratic. Quicksort: O(n log n) average, partitions around a pivot, can degrade to O(n²) on bad pivots. Merge sort: O(n log n) guaranteed, splits and merges, requires O(n) extra space.",
    zh: "冒泡排序：O(n²) 比较次数，简单但平方级。快速排序：平均 O(n log n)，围绕基准元素划分，最坏退化为 O(n²)。归并排序：保证 O(n log n)，递归拆分再合并，需要 O(n) 额外空间。",
  },
  sortingArraySize: { en: "Array size", zh: "数组大小" },
  sortingSpeed: { en: "Speed", zh: "速度" },
  sortingShuffle: { en: "Shuffle", zh: "打乱" },
  sortingPlay: { en: "Play", zh: "播放" },
  sortingPause: { en: "Pause", zh: "暂停" },
  sortingStep: { en: "Step", zh: "单步" },
  sortingReset: { en: "Reset", zh: "重置" },
  sortingComparisons: { en: "Comparisons", zh: "比较次数" },
  sortingSwaps: { en: "Swaps", zh: "交换次数" },

  // Demo: Gravity
  gravityTitle: { en: "Gravity & Orbits", zh: "引力与轨道" },
  gravitySubtitle: {
    en: "Click and drag to launch a planet. Watch the dance.",
    zh: "点击拖拽，发射一颗行星。看它怎么跳舞。",
  },
  gravityEli10: {
    en: "Every object in space pulls on every other object. Heavy things pull harder. The moon stays near Earth not because Earth has a string attached — but because the Earth is always pulling the moon toward it, and the moon is always moving sideways fast enough to miss. That's an orbit.",
    zh: "宇宙里的每个物体都在拉其他物体，越重拉得越狠。月亮没飞走，不是因为有绳子拴着——而是地球一直在拉它，月亮一直在横着飞得够快，让自己刚好「错过」地球。这就是轨道。",
  },
  gravityAdvanced: {
    en: "Newton's law of universal gravitation: F = G·m₁·m₂ / r². Each body experiences acceleration a = F/m from every other body. Numerically integrated with semi-implicit Euler at 60Hz. Stable orbits require v ≈ √(G·M/r) tangentially.",
    zh: "牛顿万有引力定律：F = G·m₁·m₂ / r²。每个物体受到来自其他所有物体的加速度 a = F/m。用半隐式欧拉法在 60Hz 下数值积分。稳定轨道需要切向速度 v ≈ √(G·M/r)。",
  },
  gravityMass: { en: "Mass", zh: "质量" },
  gravityGravityStrength: { en: "Gravity strength", zh: "引力强度" },
  gravityClear: { en: "Clear", zh: "清空" },
  gravityPreset: { en: "Preset", zh: "预设" },
  gravityPresetSolar: { en: "Solar system", zh: "太阳系" },
  gravityPresetBinary: { en: "Binary stars", zh: "双星" },
  gravityPresetChaos: { en: "Three-body chaos", zh: "三体混沌" },
  gravityHint: {
    en: "Drag from any point to launch. Length of drag = initial velocity.",
    zh: "从任意点拖出方向，拖动长度即初速度。",
  },

  // Shared controls
  modeEli10: { en: "Explain like I'm 10", zh: "像对十岁孩子讲" },
  modeAdvanced: { en: "Advanced", zh: "进阶" },
  share: { en: "Share", zh: "分享" },
  shareCopied: { en: "Link copied!", zh: "链接已复制！" },
  embed: { en: "Embed", zh: "嵌入" },
  embedCopied: { en: "Embed code copied!", zh: "嵌入代码已复制！" },
  explainStep: { en: "Explain this step", zh: "解释这一步" },
  back: { en: "Back to all demos", zh: "返回所有示例" },

  // Coming soon list
  comingSoonTitle: { en: "More coming soon", zh: "更多即将上线" },
  comingSoonSub: {
    en: "We're shipping the most-requested ones first. Want a topic? The bookmark button captures it.",
    zh: "我们优先上线呼声最高的。想看哪个？收藏按钮帮你记下来。",
  },
  v2Linear: { en: "Linear algebra", zh: "线性代数" },
  v2Calculus: { en: "Calculus", zh: "微积分" },
  v2Probability: { en: "Probability", zh: "概率" },
  v2Waves: { en: "Wave interference", zh: "波的干涉" },
  v2Optics: { en: "Optics", zh: "光学" },
  v2Mechanics: { en: "Mechanics", zh: "力学" },
  v2BFS: { en: "BFS / DFS", zh: "BFS / DFS" },
  v2Dijkstra: { en: "Dijkstra", zh: "Dijkstra" },
  v2Trees: { en: "Trees & heaps", zh: "树与堆" },
  v2Coding: { en: "Coding lessons", zh: "编程课" },

  // Footer
  footerTagline: {
    en: "Built to make hard ideas feel obvious.",
    zh: "为了让难懂的想法看起来显然。",
  },
  footerPart: { en: "Part of", zh: "属于" },
  footerPsyverse: { en: "the Psyverse", zh: "Psyverse 宇宙" },

  // FAQ headings (used on demo pages)
  faqTitle: { en: "Frequently asked", zh: "常见问题" },
};

export const tr = (key: keyof typeof t, lang: Lang) => t[key][lang];

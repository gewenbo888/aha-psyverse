"use client";

import { ReactNode } from "react";
import { DemoFrame } from "@/components/DemoFrame";
import { useAha } from "@/lib/providers";

export function DemoFrameClient({ children }: { children: ReactNode }) {
  const { lang } = useAha();

  const faq =
    lang === "en"
      ? [
          {
            q: "What is a Fourier transform, simply?",
            a: "A way to look at any signal not as a wiggle over time, but as a list of pure tones that, when added together, make that wiggle. The transform is the act of finding that list.",
          },
          {
            q: "Why is this useful in real life?",
            a: "It's how MP3 compression, JPEG images, MRI machines, and noise-cancelling headphones all work. Anywhere you want to ignore certain frequencies and keep others, the Fourier transform is doing the heavy lifting.",
          },
          {
            q: "Why are the bars on the right discrete?",
            a: "Because we're showing a Fourier *series* — a decomposition of a periodic signal into integer-frequency components. The continuous Fourier transform handles non-periodic signals; same idea, denser spectrum.",
          },
          {
            q: "Can I share my exact slider configuration?",
            a: "Yes — the URL updates as you drag. Hit Share to copy it. Whoever opens the link sees your exact wave stack.",
          },
        ]
      : [
          {
            q: "傅里叶变换到底是什么？",
            a: "把信号从「时间上的波动」换个视角，看成「一堆纯音叠加而成的列表」。这个变换就是去把那个列表找出来。",
          },
          {
            q: "现实里它有什么用？",
            a: "MP3 压缩、JPEG 图像、核磁共振、降噪耳机——背后都是它在干活。只要你想忽略某些频率、保留其他频率，傅里叶变换都在出力。",
          },
          {
            q: "为什么右边的柱子是离散的？",
            a: "因为我们展示的是傅里叶级数——把周期信号拆成整数频率分量。连续傅里叶变换处理非周期信号，思路一样，频谱更密。",
          },
          {
            q: "能把当前滑块状态分享出去吗？",
            a: "可以。拖动滑块时 URL 会同步更新。点分享按钮复制即可，对方打开链接就能看到你这套波叠的精确状态。",
          },
        ];

  return (
    <DemoFrame
      titleKey="fourierTitle"
      subtitleKey="fourierSubtitle"
      eli10Key="fourierEli10"
      advancedKey="fourierAdvanced"
      shareUrl={() => window.location.href}
      embedUrl={() => `${window.location.origin}/fourier-transform${window.location.search}`}
      faq={faq}
    >
      {children}
    </DemoFrame>
  );
}

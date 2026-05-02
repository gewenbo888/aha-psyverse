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
            q: "Why does my planet just spiral into the star?",
            a: "Probably not enough sideways speed. An orbit is the balance between gravity pulling you in and your tangential velocity making you 'miss.' Drag a longer line to launch faster.",
          },
          {
            q: "Why does the three-body simulation never repeat?",
            a: "Three or more gravitating bodies are mathematically chaotic — tiny differences in initial conditions blow up over time. There's no closed-form solution. This is the actual three-body problem from physics.",
          },
          {
            q: "What integration scheme does this use?",
            a: "Semi-implicit Euler — fast and stable enough for visualization, though it slowly drifts energy over long runs. Real astrophysics simulations use leapfrog or symplectic integrators.",
          },
          {
            q: "Is the gravity strength realistic?",
            a: "No — G is dialed up so things move on a human-watchable timescale. The relationships between mass, distance, and force are the same as reality; only the global scale is altered.",
          },
        ]
      : [
          {
            q: "为什么我的行星总是直接坠入恒星？",
            a: "多半是横向速度不够。轨道就是引力把你拉进去和切向速度让你「错过」之间的平衡。拖出更长的线，发射得更快。",
          },
          {
            q: "为什么三体模拟永远不重复？",
            a: "三个及以上的引力体在数学上是混沌的——初始条件的微小差异会随时间放大。没有解析解。这就是物理上的三体问题。",
          },
          {
            q: "用的什么数值积分方法？",
            a: "半隐式欧拉法——足够快也足够稳，但长时间运行会慢慢漂移能量。真正的天体物理模拟用蛙跳法或辛积分器。",
          },
          {
            q: "引力强度真实吗？",
            a: "不真实——G 被调大了，让画面在人眼可看的尺度上运动。但质量、距离、力之间的关系和现实一致，只是整体尺度变了。",
          },
        ];

  return (
    <DemoFrame
      titleKey="gravityTitle"
      subtitleKey="gravitySubtitle"
      eli10Key="gravityEli10"
      advancedKey="gravityAdvanced"
      shareUrl={() => window.location.href}
      embedUrl={() => `${window.location.origin}/gravity-simulation${window.location.search}`}
      faq={faq}
    >
      {children}
    </DemoFrame>
  );
}

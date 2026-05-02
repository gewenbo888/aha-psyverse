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
            q: "Why does quicksort look chaotic at first then suddenly settle?",
            a: "Quicksort recursively partitions around a pivot. Early in the run, every element is being compared to a faraway pivot — so motion looks random. Once partitions get small enough, the array converges to sorted very quickly.",
          },
          {
            q: "Is bubble sort ever useful?",
            a: "Almost never in production — its O(n²) cost is brutal at scale. But it's the perfect mental model for sorting because every step is locally obvious: 'compare two neighbors, swap if wrong.'",
          },
          {
            q: "Why does merge sort use more memory?",
            a: "It builds intermediate sorted arrays during the merge step. That O(n) extra space is the cost of its guaranteed O(n log n) worst case — quicksort runs in place but has a worst case of O(n²).",
          },
          {
            q: "Can I share my exact array configuration?",
            a: "Yes — the URL contains a seed and array size. Anyone who opens your link sees the same starting array.",
          },
        ]
      : [
          {
            q: "为什么快排一开始看起来很乱，然后突然就排好了？",
            a: "快排递归地围绕基准元素划分。开局每个元素都在和一个很远的基准比较——所以动作看起来很随机。一旦划分得够小，数组就会迅速收敛到有序。",
          },
          {
            q: "冒泡排序在生产里有用吗？",
            a: "几乎从不——O(n²) 在大规模下太残忍。但它是最好的「排序心智模型」：每一步都极其直观——「比较邻居，错了就换」。",
          },
          {
            q: "为什么归并排序更费内存？",
            a: "归并阶段需要中间有序数组。那 O(n) 额外空间就是它「保证 O(n log n) 最坏情况」的代价——快排原地排序，但最坏 O(n²)。",
          },
          {
            q: "能分享我现在这个数组吗？",
            a: "可以。URL 里包含随机种子和数组大小。对方打开链接看到的就是和你一样的起始数组。",
          },
        ];

  return (
    <DemoFrame
      titleKey="sortingTitle"
      subtitleKey="sortingSubtitle"
      eli10Key="sortingEli10"
      advancedKey="sortingAdvanced"
      shareUrl={() => window.location.href}
      embedUrl={() => `${window.location.origin}/sorting-algorithms${window.location.search}`}
      faq={faq}
    >
      {children}
    </DemoFrame>
  );
}

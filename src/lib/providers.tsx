"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "@/i18n/dict";
import { t as dict } from "@/i18n/dict";

type Theme = "dark" | "light";

interface AhaContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  tr: (k: keyof typeof dict) => string;
}

const Ctx = createContext<AhaContext | null>(null);

export function AhaProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const storedLang = (localStorage.getItem("aha-lang") as Lang | null) ?? null;
      const storedTheme = (localStorage.getItem("aha-theme") as Theme | null) ?? null;
      if (storedLang === "en" || storedLang === "zh") setLangState(storedLang);
      if (storedTheme === "dark" || storedTheme === "light") setThemeState(storedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("aha-lang", lang);
      localStorage.setItem("aha-theme", theme);
    } catch {}
  }, [lang, theme]);

  const tr = (k: keyof typeof dict) => dict[k][lang];

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: setLangState,
        theme,
        setTheme: setThemeState,
        tr,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAha() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAha must be inside AhaProvider");
  return ctx;
}

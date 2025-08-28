"use client";
import { useEffect } from "react";

export function useThemeStylesheet(href: string) {
  useEffect(() => {
    const id = "theme-css";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    // 付け替え
    link.href = href;

    // クリーンアップはしない（ページ内で切替する想定）
  }, [href]);
}

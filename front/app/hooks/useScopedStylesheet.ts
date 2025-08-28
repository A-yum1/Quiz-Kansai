"use client";
import { useEffect, useRef } from "react";

export function useScopedStylesheet(href: string, id = "scoped-css") {
  const lastHref = useRef<string | null>(null);

  useEffect(() => {
    let link = document.getElementById(id) as HTMLLinkElement | null;

    // 初回または存在しない場合は作成
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // 変更があるときだけ差し替え
    if (lastHref.current !== href) {
      link.href = href;
      lastHref.current = href;
    }

    // この画面を離れたら（アンマウント時に）削除
    return () => {
      const el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
      lastHref.current = null;
    };
  }, [href, id]);
}

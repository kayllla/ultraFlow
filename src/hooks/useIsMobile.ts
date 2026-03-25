"use client";

import { useSyncExternalStore } from "react";

/** 与 Tailwind `lg:` 断点一致：手机 / 小屏为 true */
export function useIsMobile(maxWidthPx = 1023): boolean {
  const mq = `(max-width: ${maxWidthPx}px)`;

  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const m = window.matchMedia(mq);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(mq).matches : false),
    () => false
  );
}

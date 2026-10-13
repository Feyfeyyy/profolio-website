"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Toast({ children }: { children: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ref = useCallback((node: HTMLParagraphElement | null) => {
    if (!node) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        node.classList.remove("opacity-0");
        node.classList.add("animate-toast");
      });
    });
  }, []);

  if (!mounted) return null;

  return createPortal(
    <p
      ref={ref}
      role="status"
      className="fixed top-[max(5.5rem,calc(env(safe-area-inset-top)+5rem))] right-[clamp(20px,4vw,48px)] z-[60] border border-line bg-ink px-[22px] py-3.5 font-mono text-[13px] text-paper opacity-0"
    >
      {children}
    </p>,
    document.body,
  );
}

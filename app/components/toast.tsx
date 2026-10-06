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
      className="fixed top-6 right-6 z-20 rounded-full bg-ink px-5 py-3 text-sm text-paper opacity-0"
    >
      {children}
    </p>,
    document.body,
  );
}

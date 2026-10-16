"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ScrollProgress from "./scroll-progress";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

const menuLinks = [{ href: "/", label: "Home" }, ...links];

function ThemeToggle({
  dark,
  onToggle,
  className = "",
}: {
  dark: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`min-h-11 items-center gap-2 border border-line px-2.5 font-mono text-xs ${className}`}
      aria-pressed={dark}
      onClick={onToggle}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function MobileMenu({
  open,
  pathname,
  dark,
  onToggleTheme,
  onClose,
}: {
  open: boolean;
  pathname: string;
  dark: boolean;
  onToggleTheme: () => void;
  onClose: () => void;
}) {
  const [rendered, setRendered] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (!node) return;
    node.style.transform = "translateX(100%)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        node.classList.add("animate-drawer");
      });
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    setRendered(true);
    const node = panelRef.current;
    if (!node) return;
    node.classList.remove("animate-drawer-out");
    node.style.transform = "translateX(100%)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        node.classList.add("animate-drawer");
      });
    });
  }, [open]);

  useEffect(() => {
    if (open || !rendered) return;
    const node = panelRef.current;
    if (!node) {
      setRendered(false);
      return;
    }
    node.classList.remove("animate-drawer");
    node.style.transform = "translateX(0)";
    node.getBoundingClientRect();
    node.classList.add("animate-drawer-out");
    const timeout = window.setTimeout(() => setRendered(false), 350);
    return () => window.clearTimeout(timeout);
  }, [open, rendered]);

  useEffect(() => {
    if (!rendered) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [rendered]);

  if (!rendered) return null;

  return createPortal(
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-40 flex flex-col bg-paper px-[clamp(20px,4vw,48px)] pt-[max(6.5rem,calc(env(safe-area-inset-top)+5rem))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <nav aria-label="Pages" className="mx-auto flex w-full max-w-[1200px] flex-col">
        {menuLinks.map((link, index) => {
          const current = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-16 items-baseline gap-4 border-b border-line py-4 transition-[padding,color] hover:pl-3 hover:text-accent"
              aria-current={current ? "page" : undefined}
              onClick={onClose}
            >
              <span className="font-mono text-[13px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(30px,8vw,48px)] leading-none font-bold tracking-[-0.03em]">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex justify-center pb-2">
        <ThemeToggle dark={dark} onToggle={onToggleTheme} className="inline-flex" />
      </div>
    </div>,
    document.body,
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    function closeIfWide() {
      if (media.matches) setOpen(false);
    }
    media.addEventListener("change", closeIfWide);
    return () => media.removeEventListener("change", closeIfWide);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-x-[clamp(14px,2.4vw,28px)] px-[clamp(20px,4vw,48px)] py-4">
        <Link href="/" className="inline-flex min-h-11 items-center gap-3 font-bold">
          <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
          Feyaaz Chishty
        </Link>
        <div className="flex items-center gap-[clamp(14px,2.4vw,28px)]">
          <nav
            className="hidden items-center gap-[clamp(14px,2.4vw,28px)] font-mono text-[13px] text-muted sm:flex"
            aria-label="Pages"
          >
            {links.map((link) => {
              const current = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center"
                  aria-current={current ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle dark={dark} onToggle={toggleTheme} className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex min-h-11 items-center border border-line px-2.5 font-mono text-xs sm:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <ScrollProgress />
      <MobileMenu
        open={open}
        pathname={pathname}
        dark={dark}
        onToggleTheme={toggleTheme}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}

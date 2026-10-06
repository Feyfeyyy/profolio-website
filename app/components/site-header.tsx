"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About me" },
];

const mobileLinks = [{ href: "/", label: "Home" }, ...links];

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round]"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round]"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </svg>
  );
}

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
      className={`h-11 w-11 items-center justify-center rounded-full border border-line text-ink ${className}`}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light" : "Switch to dark"}
      onClick={onToggle}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round]"
    >
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (!node) return;
    node.style.transform = "translateX(100%)";
    closeRef.current?.focus();
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
      className="fixed inset-0 z-40 flex flex-col bg-paper px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:hidden"
    >
      <div className="flex justify-end">
        <button
          ref={closeRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink"
          aria-label="Close menu"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="Pages" className="mt-12 flex flex-col">
        {mobileLinks.map((link) => {
          const current = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                current
                  ? "inline-flex min-h-16 items-center text-3xl font-medium tracking-tight text-ink"
                  : "inline-flex min-h-16 items-center text-3xl font-medium tracking-tight text-ink/45"
              }
              aria-current={current ? "page" : undefined}
              onClick={onClose}
            >
              {link.label}
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
  const home = pathname === "/";
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
    const media = window.matchMedia("(min-width: 640px)");
    function onWide() {
      if (media.matches) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header className="mx-auto w-full max-w-6xl px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-3 text-sm sm:px-6">
      <div className={`flex items-center ${home ? "justify-end" : "justify-between"}`}>
        {home ? null : (
          <Link href="/" className="inline-flex min-h-11 items-center font-medium">
            Feyaaz Chishty
          </Link>
        )}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden items-center gap-6 sm:flex" aria-label="Pages">
            {links.map((link) => {
              const current = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    current
                      ? "inline-flex min-h-11 items-center text-ink"
                      : "inline-flex min-h-11 items-center text-ink/45 underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-ink"
                  }
                  aria-current={current ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink sm:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
          <ThemeToggle dark={dark} onToggle={toggleTheme} className="hidden sm:inline-flex" />
        </div>
      </div>
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

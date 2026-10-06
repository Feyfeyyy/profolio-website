"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About me" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  const home = pathname === "/";

  return (
    <header
      className={`mx-auto flex w-full max-w-6xl items-center px-6 py-6 text-sm ${home ? "justify-end" : "justify-between"}`}
    >
      {home ? null : (
        <Link href="/" className="font-medium">
          Feyaaz Chishty
        </Link>
      )}
      <nav className="flex items-center gap-6">
        {links.map((link) => {
          const current = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                current
                  ? "text-ink"
                  : "text-ink/45 underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-ink"
              }
              aria-current={current ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

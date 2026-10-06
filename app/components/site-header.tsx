"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const onLanding = pathname === "/";

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm">
      <Link href="/" className="font-medium">
        Feyaaz Chishty
      </Link>
      <nav>
        <Link
          href="/about"
          className={
            onLanding
              ? "text-ink/45 underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-ink"
              : "text-ink"
          }
          aria-current={onLanding ? undefined : "page"}
        >
          About me
        </Link>
      </nav>
    </header>
  );
}

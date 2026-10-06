import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function Command({ children }: { children: string }) {
  return (
    <p className="text-sm text-ink/45">
      <span aria-hidden="true">$ </span>
      {children}
    </p>
  );
}

function ScrollCue() {
  return (
    <p className="mt-6 flex items-center gap-2 text-sm text-ink/45" aria-hidden="true">
      <span className="inline-block motion-safe:animate-bob">↓</span>
      scroll
    </p>
  );
}

export default function Terminal({
  path,
  scroll = false,
  children,
}: {
  path: string;
  scroll?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`${mono.className} overflow-hidden rounded-2xl border border-line bg-card shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] dark:shadow-none`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e06a5f]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e6b450]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6aaa64]" aria-hidden="true" />
        <p className="ml-2 text-xs text-ink/45">feyaaz@portfolio: {path}</p>
      </div>
      <div className="@container px-4 py-6 sm:px-8 sm:py-10">
        {children}
        <p className="mt-8 flex items-center text-sm text-ink/45" aria-hidden="true">
          ${" "}
          <span className="ml-2 inline-block h-[1.05em] w-[0.55ch] animate-blink bg-ink" />
        </p>
        {scroll ? <ScrollCue /> : null}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

export function Command({ children }: { children: string }) {
  return (
    <p data-command="" className="text-sm text-accent">
      <span aria-hidden="true">$ </span>
      {children}
    </p>
  );
}

function ScrollCue() {
  return (
    <p className="mt-6 flex items-center gap-2 text-sm text-ink/45" aria-hidden="true">
      <span className="inline-block text-accent motion-safe:animate-bob">↓</span>
      scroll
    </p>
  );
}

export default function Terminal({
  path,
  scroll = false,
  prompt,
  children,
}: {
  path: string;
  scroll?: boolean;
  prompt?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className="rounded-2xl font-mono text-[#f2f0ea] shadow-[0_18px_40px_-12px_rgba(26,24,20,0.38),0_8px_24px_-10px_rgba(242,240,234,0.16)] [&_*]:text-[#f2f0ea] [&_*]:decoration-[#f2f0ea] [&_[data-command]]:!text-accent [&_[data-command]_*]:!text-accent [&_[role=progressbar]]:!text-accent [&_[role=progressbar]_span]:!text-accent"
    >
      <div className="overflow-hidden rounded-2xl border border-[#2c2c2a] bg-[#0a0a0a]">
        <div className="flex items-center gap-2 border-b border-[#2c2c2a] bg-[#141414] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e06a5f]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6b450]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6aaa64]" aria-hidden="true" />
          <p className="ml-2 text-xs text-ink/45">feyaaz@portfolio: {path}</p>
        </div>
        <div
          data-terminal-body={prompt ? "" : undefined}
          className={`@container px-4 py-6 sm:px-8 sm:py-10 ${
            prompt
              ? "overflow-y-auto overscroll-contain [scrollbar-color:var(--color-accent)_transparent] [scrollbar-width:thin]"
              : ""
          }`}
        >
          {children}
          {prompt ?? (
            <p data-command="" className="mt-8 flex items-center text-sm text-accent" aria-hidden="true">
              ${" "}
              <span className="ml-2 inline-block h-[1.05em] w-[0.55ch] animate-blink bg-accent" />
            </p>
          )}
          {scroll && !prompt ? <ScrollCue /> : null}
        </div>
        {scroll && prompt ? (
          <div className="px-4 pb-6 sm:px-8">
            <ScrollCue />
          </div>
        ) : null}
      </div>
    </section>
  );
}

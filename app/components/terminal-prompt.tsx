"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";

type Entry = {
  id: number;
  command: string;
  lines: string[];
  progress: number | null;
};

const commands = ["hot chocolate", "whoami", "open", "help"];

const replies: Record<string, string[]> = {
  help: commands,
  whoami: ["Feyaaz Chishty"],
  open: ["About, Stack, Work, Contact"],
};

function normalize(command: string) {
  return command.trim().toLowerCase().replace(/\s+/g, " ");
}

function isHotChocolate(command: string) {
  return command === "hot chocolate" || command === "hot-chocolate" || command === "hotchocolate";
}

function brewBar(progress: number) {
  const width = 20;
  const filled = Math.round((progress / 100) * width);
  return `[${"=".repeat(filled)}${"-".repeat(width - filled)}] ${String(progress).padStart(3)}%`;
}

export default function TerminalPrompt() {
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [brewing, setBrewing] = useState(false);
  const timers = useRef<number[]>([]);
  const nextId = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearInterval(id));
    };
  }, []);

  useLayoutEffect(() => {
    const scroller = rootRef.current?.closest("[data-terminal-body]");
    if (!(scroller instanceof HTMLElement)) return;

    function lock() {
      if (!(scroller instanceof HTMLElement)) return;
      if (entriesRef.current.length > 0 && scroller.style.height) return;
      scroller.style.height = "auto";
      const next = scroller.getBoundingClientRect().height;
      scroller.style.height = `${next}px`;
    }

    lock();
    window.addEventListener("resize", lock);
    return () => {
      window.removeEventListener("resize", lock);
      scroller.style.height = "";
    };
  }, []);

  useEffect(() => {
    const scroller = rootRef.current?.closest("[data-terminal-body]");
    if (!(scroller instanceof HTMLElement)) return;

    function onScroll() {
      if (!(scroller instanceof HTMLElement)) return;
      const distance = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      pinned.current = distance < 48;
    }

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const scroller = rootRef.current?.closest("[data-terminal-body]");
    if (!(scroller instanceof HTMLElement) || !pinned.current) return;
    scroller.scrollTop = scroller.scrollHeight;
  }, [entries]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = value.trim();
    if (!command || brewing) return;

    const key = normalize(command);
    const id = nextId.current;
    nextId.current += 1;
    setValue("");

    if (isHotChocolate(key)) {
      setBrewing(true);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setEntries((current) => [
          ...current,
          {
            id,
            command,
            progress: 100,
            lines: ["Brewing a hot chocolate.", "The terminal is more alive now."],
          },
        ]);
        setBrewing(false);
        return;
      }

      setEntries((current) => [
        ...current,
        { id, command, progress: 0, lines: ["Brewing a hot chocolate."] },
      ]);
      let progress = 0;
      const timer = window.setInterval(() => {
        progress = Math.min(100, progress + 5);
        const done = progress >= 100;
        setEntries((current) =>
          current.map((entry) => {
            if (entry.id !== id) return entry;
            return {
              ...entry,
              progress,
              lines: done ? [...entry.lines, "The terminal is more alive now."] : entry.lines,
            };
          }),
        );
        if (done) {
          window.clearInterval(timer);
          setBrewing(false);
        }
      }, 80);
      timers.current.push(timer);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id,
        command,
        progress: null,
        lines: replies[key] ?? ["No such command. Try help."],
      },
    ]);
  }

  return (
    <div ref={rootRef} className="mt-8">
      <div>
        {entries.map((entry) => (
          <div key={entry.id} className="mb-6">
            <div aria-live="polite">
              <p data-command="" className="text-sm text-accent">
                <span aria-hidden="true">$ </span>
                {entry.command}
              </p>
              {entry.lines[0] ? (
                <p className="mt-2 text-sm text-ink/80 motion-safe:animate-rise">{entry.lines[0]}</p>
              ) : null}
            </div>
            {entry.progress !== null ? (
              <p
                className="mt-2 text-sm whitespace-pre text-accent"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={entry.progress}
                aria-label="Brewing a hot chocolate"
              >
                <span aria-hidden="true">{brewBar(entry.progress)}</span>
              </p>
            ) : null}
            <div aria-live="polite">
              {entry.lines.slice(1).map((line, index) => (
                <p key={`${entry.id}-${index + 1}`} className="mt-2 text-sm text-ink/80 motion-safe:animate-rise">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <label data-command="" className="flex items-center gap-2 text-sm text-accent">
          <span aria-hidden="true">$</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-label="Terminal command"
            placeholder="hot chocolate"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={brewing}
            className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-accent outline-none placeholder:text-accent/45 disabled:opacity-60 sm:text-sm"
          />
        </label>
      </form>
      {entries.length === 0 ? (
        <p className="mt-2 text-sm text-ink/45">try help</p>
      ) : null}
    </div>
  );
}

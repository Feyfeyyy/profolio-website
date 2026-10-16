"use client";

import { useState } from "react";

const lengths = [
  {
    id: "10",
    label: "10 seconds",
    text: "I am passionate about creating cool projects and learning new things!",
  },
  {
    id: "30",
    label: "30 seconds",
    text: "I am passionate about creating cool projects and learning new things! This site is where that shows up: a few small games on the about page, and projects I built while learning new tools.",
  },
  {
    id: "2",
    label: "2 minutes",
    text: "I am passionate about creating cool projects and learning new things! The about page is a set of small games. You can hunt for the lie, say hello, answer three questions about a film portrait, place city stickers, or turn a radio dial until each station plays. The work is what I built while learning: Smart Elevator, a movie API, a file upload app, Up Book, and a sport data parser. Each one is on GitHub.",
  },
] as const;

type LengthId = (typeof lengths)[number]["id"];

const now = [
  {
    label: "Building",
    detail: "Five projects, from a movie API to Up Book.",
  },
  {
    label: "Playing",
    detail: "Two truths, a quiz, stickers, and a radio.",
  },
];

export default function WhoIs() {
  const [selected, setSelected] = useState<LengthId>("30");
  const active = lengths.find((item) => item.id === selected) ?? lengths[1];
  const words = active.text.split(/\s+/).length;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="How long to read"
      >
        {lengths.map((item) => {
          const pressed = item.id === selected;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={pressed}
              className={
                pressed
                  ? "inline-flex min-h-11 items-center bg-ink px-4 text-[15px] font-semibold text-paper"
                  : "inline-flex min-h-11 items-center border border-line px-4 text-[15px] text-muted transition-colors hover:border-accent"
              }
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </button>
          );
        })}
        <p className="inline-flex min-h-11 items-center font-mono text-[13px] text-muted">
          ≈ {words} words
        </p>
      </div>
      <p className="mt-8 max-w-2xl text-[17px] leading-relaxed">
        {active.text}
      </p>
      <p className="mt-10 font-mono text-xs tracking-[0.08em] text-muted uppercase">
        On this site
      </p>
      <ul className="mt-4 grid gap-px bg-line sm:grid-cols-2">
        {now.map((item) => (
          <li key={item.label} className="bg-paper p-5">
            <p className="font-mono text-xs tracking-[0.08em] text-accent uppercase">
              {item.label}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

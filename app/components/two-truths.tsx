"use client";

import { useState } from "react";

const statements = [
  {
    text: "I have once tour guided a group of 80 strangers around New York with no knowledge of the city.",
    lie: false,
  },
  {
    text: "I have taken part in a Frank's hot wings eating contest.",
    lie: false,
  },
  {
    text: "I have written a screenplay that has been adapted into a TV show.",
    lie: true,
  },
];

export default function TwoTruths() {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <section className="card lg:grid lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="text-xs tracking-[0.18em] text-ink/40 uppercase">01</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight">
          Two truths, one lie
        </h2>
        <p className="intr mt-3">Pick the statement you think is the lie.</p>
      </div>
      <ul className="border-t border-line lg:col-span-8">
        {statements.map((statement, index) => {
          const selected = picked === index;
          const tone = selected
            ? statement.lie
              ? "text-emerald-800"
              : "text-ink/35 line-through"
            : "text-ink hover:text-ink/70";

          return (
            <li key={statement.text} className="border-b border-line">
              <button
                type="button"
                className={`flex w-full items-baseline gap-4 py-5 text-left text-base leading-relaxed transition ${tone}`}
                onClick={() => setPicked(index)}
              >
                <span className="w-6 shrink-0 text-xs text-ink/35">
                  0{index + 1}
                </span>
                <span>{statement.text}</span>
                {selected && statement.lie ? (
                  <span className="ml-auto shrink-0 text-xs tracking-wide text-emerald-700 uppercase">
                    Lie
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

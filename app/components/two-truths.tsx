"use client";

import { useEffect, useState } from "react";
import Toast from "./toast";

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

export default function TwoTruths({ onEarn }: { onEarn?: () => void }) {
  const [picked, setPicked] = useState<number[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => {
      setPicked([]);
      setToast(false);
    }, 1600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function mark(index: number) {
    if (toast || picked.includes(index)) return;
    setPicked((current) => [...current, index]);
    if (statements[index].lie) {
      setToast(true);
      onEarn?.();
    }
  }

  return (
    <>
    {toast ? <Toast>Congratulations, you found the lie.</Toast> : null}
    <ul className="flex flex-col gap-3 rounded-3xl border border-line bg-card p-4 shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] sm:p-8 dark:shadow-none">
        {statements.map((statement, index) => {
          const selected = picked.includes(index);
          const tone = selected
            ? statement.lie
              ? "border-green-700/30 bg-green-700/5 text-green-700 dark:border-green-400/40 dark:bg-green-400/10 dark:text-green-300"
              : "border-red-600/30 bg-red-600/5 text-red-600 line-through dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-300"
            : "border-line text-ink hover:-translate-y-0.5 hover:border-ink/30 dark:bg-black/35";

          return (
            <li key={statement.text}>
              <button
                type="button"
                className={`flex w-full items-baseline gap-4 rounded-2xl border px-4 py-4 text-left text-base leading-relaxed transition duration-200 ${tone}`}
                aria-pressed={selected}
                onClick={() => mark(index)}
              >
                <span className="w-6 shrink-0 text-xs text-ink/35 no-underline">
                  0{index + 1}
                </span>
                <span>{statement.text}</span>
                {selected && statement.lie ? (
                  <span className="ml-auto shrink-0 rounded-full bg-green-700 px-3 py-1 text-xs tracking-wide text-white uppercase no-underline">
                    Lie
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
    </ul>
    </>
  );
}

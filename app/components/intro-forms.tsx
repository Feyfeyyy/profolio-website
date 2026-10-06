"use client";

import { FormEvent, useState } from "react";

const tabs = [
  { id: "name", label: "Your name" },
  { id: "note", label: "Tell me something" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-lg outline-none transition placeholder:text-ink/30 focus:border-ink";

const buttonClass =
  "mt-1 w-fit rounded-full border border-ink bg-ink px-5 py-2 text-sm font-medium text-paper transition duration-200 hover:-translate-y-0.5 hover:bg-transparent hover:text-ink";

function Reply({ children }: { children: string }) {
  return (
    <p className="font-sans text-lg leading-relaxed text-ink animate-rise">
      {children}
    </p>
  );
}

export default function IntroForms({ onEarn }: { onEarn?: () => void }) {
  const [tab, setTab] = useState<TabId>("name");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [note, setNote] = useState("");
  const [thanks, setThanks] = useState(false);

  function submitName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName) return;
    setGreeting(`Hello There, ${nextName}!`);
    setName("");
    if (thanks) onEarn?.();
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) return;
    setThanks(true);
    setNote("");
    if (greeting) onEarn?.();
  }

  return (
    <div className="rounded-3xl border border-line bg-white/70 p-6 shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] sm:p-8">
        <div role="tablist" aria-label="Custom inputs" className="flex gap-2">
          {tabs.map((item) => {
            const selected = tab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                className={
                  selected
                    ? "rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
                    : "rounded-full px-4 py-2 text-sm text-ink/45 transition hover:text-ink"
                }
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {tab === "name" ? (
          <form
            key="name"
            id="panel-name"
            role="tabpanel"
            aria-labelledby="tab-name"
            className="mt-8 flex animate-flick flex-col gap-4"
            onSubmit={submitName}
          >
            <label className="text-sm text-ink/60" htmlFor="name">
              What Is Your Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
            <button type="submit" className={buttonClass}>
              Submit
            </button>
            {greeting ? <Reply>{greeting}</Reply> : null}
          </form>
        ) : (
          <form
            key="note"
            id="panel-note"
            role="tabpanel"
            aria-labelledby="tab-note"
            className="mt-8 flex animate-flick flex-col gap-4"
            onSubmit={submitNote}
          >
            <label className="text-sm text-ink/60" htmlFor="info">
              Tell me something:
            </label>
            <input
              id="info"
              name="info"
              type="text"
              value={note}
              placeholder="Enter here"
              onChange={(event) => setNote(event.target.value)}
              className={fieldClass}
            />
            <button type="submit" className={buttonClass}>
              Submit
            </button>
            {thanks ? <Reply>Ohhh thanks for telling me! ;)</Reply> : null}
          </form>
        )}
    </div>
  );
}

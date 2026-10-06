"use client";

import { FormEvent, useState } from "react";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-base outline-none transition placeholder:text-ink/30 focus:border-ink";

export default function IntroForms() {
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
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) return;
    setThanks(true);
    setNote("");
  }

  return (
    <section className="card border-t border-line pt-16 lg:grid lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="text-xs tracking-[0.18em] text-ink/40 uppercase">02</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight">Say hello</h2>
        <p className="intr mt-3">Nothing you type is saved.</p>
      </div>
      <div className="grid gap-10 lg:col-span-8 lg:grid-cols-2">
        <form className="flex flex-col gap-4" onSubmit={submitName}>
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
          <button
            type="submit"
            className="w-fit text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
          >
            Submit
          </button>
          {greeting ? <p className="msg">{greeting}</p> : null}
        </form>
        <form className="flex flex-col gap-4" onSubmit={submitNote}>
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
          <button
            type="submit"
            className="w-fit text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
          >
            Submit
          </button>
          {thanks ? (
            <p className="msg">Ohhh thanks for telling me! ;)</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

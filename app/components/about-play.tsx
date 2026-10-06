"use client";

import { useState } from "react";
import Badge from "./badge";
import IntroForms from "./intro-forms";
import MovieQuiz from "./movie-quiz";
import RadioDial from "./radio-dial";
import StickerGame from "./sticker-game";
import TwoTruths from "./two-truths";

const tabs = [
  { id: "truths", label: "Two Truths, One Lie" },
  { id: "custom-inputs", label: "Custom inputs" },
  { id: "quiz", label: "Movie quiz" },
  { id: "stickers", label: "Sticker game" },
  { id: "radio", label: "Radio" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const formBadges = [
  {
    id: "truths",
    label: "Facts badge",
    tone: "bg-[#efe8d8] text-[#141413]",
    ribbon: "fill-[#8d7048]",
    caption: "text-[#f6f5f2]",
  },
  {
    id: "hello",
    label: "Hello badge",
    tone: "bg-[#f8e8e4] text-red-700",
    ribbon: "fill-red-700",
    caption: "text-[#f6f5f2]",
  },
  {
    id: "quiz",
    label: "Movies badge",
    tone: "bg-[#141413] text-[#f6f5f2]",
    ribbon: "fill-[#cfc6b8]",
    caption: "text-[#141413]",
  },
  {
    id: "cities",
    label: "Travel badge",
    tone: "bg-[#e5f0e8] text-green-800",
    ribbon: "fill-green-800",
    caption: "text-[#f6f5f2]",
  },
  {
    id: "tune",
    label: "Music badge",
    tone: "bg-[#f6f5f2] text-[#141413]",
    ribbon: "fill-[#141413]",
    caption: "text-[#f6f5f2]",
  },
] as const;

type FormBadgeId = (typeof formBadges)[number]["id"];

export default function AboutPlay() {
  const [tab, setTab] = useState<TabId>("truths");
  const [earned, setEarned] = useState<FormBadgeId[]>([]);

  function award(id: FormBadgeId) {
    setEarned((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <div>
    <div
      className={`mb-10 rounded-3xl px-4 py-6 sm:mb-16 sm:px-10 sm:py-8 ${earned.length === 0 ? "border border-dashed border-ink/15 bg-transparent dark:border-ink/40" : "border border-line bg-card shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] dark:shadow-none"}`}
    >
      <div className={`mb-6 flex items-baseline justify-between border-b pb-4 ${earned.length === 0 ? "border-dashed border-ink/15 dark:border-ink/40" : "border-line"}`}>
        <p className="text-xs font-medium tracking-[0.22em] text-ink/45 uppercase">
          Medals
        </p>
        <p className="text-xs tracking-wide text-ink/35">
          {earned.length} of {formBadges.length}
        </p>
      </div>
      <ul aria-label="Medals" className="group/medals flex flex-wrap items-start justify-center gap-x-4 gap-y-6 sm:gap-x-8">
        {formBadges.map((badge) => (
          <Badge
            key={badge.id}
            {...badge}
            earned={earned.includes(badge.id)}
            className="origin-center transition duration-200 [@media(hover:hover)]:group-hover/medals:opacity-40 hover:z-10 hover:-translate-y-1 hover:scale-110 [@media(hover:hover)]:hover:!opacity-100 hover:drop-shadow-[0_16px_18px_rgba(20,20,19,0.18)]"
          />
        ))}
      </ul>
    </div>
    <section className="md:grid md:grid-cols-12 md:items-start md:gap-10">
      <div className="md:col-span-4">
        <h2 className="text-3xl font-medium tracking-tight">
          Interactive forms
        </h2>
        {tab === "truths" ? (
          <p className="mt-3 text-sm leading-relaxed text-ink/55">
            ( Click on the one you think is a lie,{" "}
            <strong className="font-medium text-ink/70">
              if it turns green you are correct
            </strong>
            )
          </p>
        ) : null}
        {tab === "custom-inputs" ? (
          <p className="mt-3 text-sm leading-relaxed text-ink/55">Nothing you type is saved.</p>
        ) : null}
        {tab === "quiz" ? (
          <p className="mt-3 text-sm leading-relaxed text-ink/55">
            Three questions about the portrait. Green means you are right.
          </p>
        ) : null}
        {tab === "stickers" ? (
          <p className="mt-3 text-sm leading-relaxed text-ink/55">
            Stick each city inside its outline. A full board earns a badge.
          </p>
        ) : null}
        {tab === "radio" ? (
          <p className="mt-3 text-sm leading-relaxed text-ink/55">
            Turn the dial. Each station is a song. Hear every one to earn a medal.
          </p>
        ) : null}
      </div>
      <div className="mt-8 md:col-span-8 md:mt-0">
      <div role="tablist" aria-label="Interactive forms" className="flex flex-wrap gap-2">
        {tabs.map((item) => {
          const selected = tab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`play-${item.id}`}
              aria-selected={selected}
              aria-controls={`play-panel-${item.id}`}
              className={
                selected
                  ? "inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper"
                  : "inline-flex min-h-11 items-center rounded-full px-4 text-sm text-ink/45 transition hover:text-ink"
              }
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        id="play-panel-truths"
        role="tabpanel"
        aria-labelledby="play-truths"
        hidden={tab !== "truths"}
        className={tab === "truths" ? "mt-10 animate-flick" : undefined}
      >
        <TwoTruths onEarn={() => award("truths")} />
      </div>
      <div
        id="play-panel-custom-inputs"
        role="tabpanel"
        aria-labelledby="play-custom-inputs"
        hidden={tab !== "custom-inputs"}
        className={tab === "custom-inputs" ? "mt-10 animate-flick" : undefined}
      >
        <IntroForms onEarn={() => award("hello")} />
      </div>
      <div
        id="play-panel-quiz"
        role="tabpanel"
        aria-labelledby="play-quiz"
        hidden={tab !== "quiz"}
        className={tab === "quiz" ? "mt-10 animate-flick" : undefined}
      >
        <MovieQuiz onEarn={() => award("quiz")} />
      </div>
      <div
        id="play-panel-stickers"
        role="tabpanel"
        aria-labelledby="play-stickers"
        hidden={tab !== "stickers"}
        className={tab === "stickers" ? "mt-10 animate-flick" : undefined}
      >
        <StickerGame onEarn={() => award("cities")} />
      </div>
      <div
        id="play-panel-radio"
        role="tabpanel"
        aria-labelledby="play-radio"
        hidden={tab !== "radio"}
        className={tab === "radio" ? "mt-10 animate-flick" : undefined}
      >
        <RadioDial onEarn={() => award("tune")} />
      </div>
      </div>
    </section>
    </div>
  );
}

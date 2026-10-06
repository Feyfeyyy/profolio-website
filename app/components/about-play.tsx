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
    tone: "bg-[#efe8d8] text-ink",
    ribbon: "fill-[#8d7048]",
    caption: "text-paper",
  },
  {
    id: "hello",
    label: "Hello badge",
    tone: "bg-[#f8e8e4] text-red-700",
    ribbon: "fill-red-700",
    caption: "text-paper",
  },
  {
    id: "quiz",
    label: "Movies badge",
    tone: "bg-ink text-paper",
    ribbon: "fill-[#cfc6b8]",
    caption: "text-ink",
  },
  {
    id: "cities",
    label: "Travel badge",
    tone: "bg-[#e5f0e8] text-green-800",
    ribbon: "fill-green-800",
    caption: "text-paper",
  },
  {
    id: "tune",
    label: "Music badge",
    tone: "bg-paper text-ink",
    ribbon: "fill-ink",
    caption: "text-paper",
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
      className={`mb-16 rounded-3xl px-6 py-8 sm:px-10 ${earned.length === 0 ? "border border-dashed border-ink/15 bg-transparent" : "border border-line bg-white/70 shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)]"}`}
    >
      <div className={`mb-6 flex items-baseline justify-between border-b pb-4 ${earned.length === 0 ? "border-dashed border-ink/15" : "border-line"}`}>
        <p className="text-xs font-medium tracking-[0.22em] text-ink/45 uppercase">
          Medals
        </p>
        <p className="text-xs tracking-wide text-ink/35">
          {earned.length} of {formBadges.length}
        </p>
      </div>
      <ul aria-label="Medals" className="group/medals flex flex-wrap items-start justify-center gap-x-8 gap-y-6">
        {formBadges.map((badge) => (
          <Badge
            key={badge.id}
            {...badge}
            earned={earned.includes(badge.id)}
            className="origin-center transition duration-200 group-hover/medals:opacity-40 hover:z-10 hover:-translate-y-1 hover:scale-110 hover:!opacity-100 hover:drop-shadow-[0_16px_18px_rgba(20,20,19,0.18)]"
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
      <div className="md:col-span-8">
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

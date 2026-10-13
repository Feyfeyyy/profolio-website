"use client";

import UilBuilding from "@iconscout/react-unicons/icons/uil-building";
import UilClock from "@iconscout/react-unicons/icons/uil-clock";
import UilShip from "@iconscout/react-unicons/icons/uil-ship";
import UilTrafficLight from "@iconscout/react-unicons/icons/uil-traffic-light";
import { useEffect, useState } from "react";
import Badge from "./badge";
import Toast from "./toast";

const stickers = [
  {
    id: "new-york",
    label: "New York",
    statement: "Tour guided 80 strangers here.",
    rotate: "-rotate-6",
    tone: "bg-[#efe8d8] text-[#141413]",
    Icon: UilBuilding,
  },
  {
    id: "london",
    label: "London",
    statement: "Big Ben over a grey river.",
    rotate: "rotate-[5deg]",
    tone: "bg-[#f8e8e4] text-red-700",
    Icon: UilClock,
  },
  {
    id: "tokyo",
    label: "Tokyo",
    statement: "A crossing that never stops.",
    rotate: "-rotate-3",
    tone: "bg-[#141413] text-[#f6f5f2]",
    Icon: UilTrafficLight,
  },
  {
    id: "bangkok",
    label: "Bangkok",
    statement: "Boats on the Chao Phraya.",
    rotate: "rotate-[7deg]",
    tone: "bg-[#e5f0e8] text-green-800",
    Icon: UilShip,
  },
] as const;

type StickerId = (typeof stickers)[number]["id"];

const places = [
  "sm:left-[7%] sm:top-[8%]",
  "sm:right-[7%] sm:top-[12%]",
  "sm:left-[12%] sm:bottom-[8%]",
  "sm:right-[10%] sm:bottom-[8%]",
] as const;

const badges = [
  {
    id: "navigator",
    label: "Navigator badge",
    tone: "bg-[#f8e8e4] text-red-700",
    ribbon: "fill-red-700",
    caption: "text-[#f6f5f2]",
  },
  {
    id: "atlas",
    label: "Atlas badge",
    tone: "bg-[#141413] text-[#f6f5f2]",
    ribbon: "fill-[#cfc6b8]",
    caption: "text-[#141413]",
  },
  {
    id: "world",
    label: "World badge",
    tone: "bg-[#e5f0e8] text-green-800",
    ribbon: "fill-green-800",
    caption: "text-[#f6f5f2]",
  },
] as const;

function shufflePlaces(current: readonly string[]) {
  const next = [...places];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  if (next.every((place, index) => place === current[index])) {
    return [next[1], next[2], next[3], next[0]];
  }
  return next;
}

function StickerFace({
  label,
  rotate,
  tone,
  Icon,
}: (typeof stickers)[number]) {
  return (
    <span
      className={`grid h-20 w-20 place-items-center gap-1 border-2 border-white ${tone} ${rotate}`}
    >
      <Icon size={28} color="currentColor" aria-hidden="true" />
      <span className="text-[10px] font-medium tracking-wide uppercase">
        {label}
      </span>
    </span>
  );
}

export default function StickerGame({ onEarn }: { onEarn?: () => void }) {
  const [selected, setSelected] = useState<StickerId | null>(null);
  const [placed, setPlaced] = useState<StickerId[]>([]);
  const [layout, setLayout] = useState<string[]>([...places]);
  const [earned, setEarned] = useState<(typeof badges)[number][]>([]);
  const [clears, setClears] = useState(0);
  const [wrong, setWrong] = useState<{ id: StickerId; at: number } | null>(
    null,
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!wrong) return;
    const timeout = window.setTimeout(() => setWrong(null), 700);
    return () => window.clearTimeout(timeout);
  }, [wrong]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => {
      setPlaced([]);
      setSelected(null);
      setLayout((current) => shufflePlaces(current));
      setToast(null);
    }, 1600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function drop(zoneId: StickerId) {
    if (!selected || toast || placed.includes(selected) || placed.includes(zoneId)) {
      return;
    }
    if (selected !== zoneId) {
      setWrong((current) => ({
        id: zoneId,
        at: (current?.at ?? 0) + 1,
      }));
      return;
    }
    const next = [...placed, selected];
    setPlaced(next);
    setSelected(null);
    if (next.length !== stickers.length) return;
    onEarn?.();
    const round = clears + 1;
    setClears(round);
    if (round === 1) {
      setToast("You earned the travel badge.");
      return;
    }
    const badge = badges[round - 2];
    if (!badge) {
      setToast("You already earned every badge.");
      return;
    }
    setEarned((current) => [...current, badge]);
    setToast(`You earned a ${badge.label.toLowerCase()}.`);
  }

  return (
    <>
      {toast ? <Toast>{toast}</Toast> : null}
      <div className="flex flex-col gap-6 border border-line bg-card p-4 sm:p-8">
        {earned.length > 0 ? (
          <ul className="flex flex-wrap items-start justify-center gap-4">
            {earned.map((badge) => (
              <Badge key={badge.id} {...badge} />
            ))}
          </ul>
        ) : null}
        <div className="grid grid-cols-2 gap-3 border border-line bg-paper/80 p-3 sm:relative sm:block sm:h-[26rem] sm:p-0">
          {stickers.map((sticker, index) => {
            const filled = placed.includes(sticker.id);
            const missed = wrong?.id === sticker.id;

            return (
              <button
                key={sticker.id}
                type="button"
                className={`flex min-h-36 flex-col items-center justify-center gap-1 border border-dashed px-2 py-3 text-center transition-colors sm:absolute sm:h-40 sm:w-28 sm:min-h-0 ${layout[index]} ${missed ? "border-red-600 bg-red-600/5 dark:border-red-400 dark:bg-red-400/10" : "border-ink/30 dark:border-ink/45"}`}
                aria-label={`${sticker.label} outline`}
                disabled={filled || Boolean(toast)}
                onClick={() => drop(sticker.id)}
              >
                <span className="text-center text-xs leading-snug text-ink/60">
                  {sticker.statement}
                </span>
                {filled ? (
                  <span className="scale-75">
                    <StickerFace {...sticker} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {stickers.map((sticker) => {
            const used = placed.includes(sticker.id);
            const active = selected === sticker.id;

            return (
              <button
                key={sticker.id}
                type="button"
                className={`transition-colors disabled:cursor-default ${active ? "ring-2 ring-ink ring-offset-2 ring-offset-card" : ""} ${used ? "opacity-25" : ""}`}
                aria-pressed={active}
                aria-label={sticker.label}
                disabled={used || Boolean(toast)}
                onClick={() => setSelected(sticker.id)}
              >
                <StickerFace {...sticker} />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

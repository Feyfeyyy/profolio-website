"use client";

import { useEffect, useState } from "react";
import Toast from "./toast";

const stations = [
  {
    id: "dnb",
    freq: 89.4,
    genre: "Drum and bass",
    title: "Watercolour",
    artist: "Pendulum",
    video: "tEPB7uzKuh4",
  },
  {
    id: "drill",
    freq: 94.1,
    genre: "Drill",
    title: "Doja",
    artist: "Central Cee",
    video: "_VuJA-VQRcY",
  },
  {
    id: "grime",
    freq: 99.6,
    genre: "Grime",
    title: "Shutdown",
    artist: "Skepta",
    video: "MQOG5BkY2Bc",
  },
  {
    id: "house",
    freq: 104.8,
    genre: "House",
    title: "Latch",
    artist: "Disclosure, Sam Smith",
    video: "93ASUImTedo",
  },
] as const;

const min = stations[0].freq;
const max = stations[stations.length - 1].freq;

export default function RadioDial({ onEarn }: { onEarn?: () => void }) {
  const [freq, setFreq] = useState(92);
  const [heard, setHeard] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const locked = stations.find((station) => Math.abs(station.freq - freq) < 0.8);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function tune(value: number) {
    setFreq(value);
    const station = stations.find((item) => Math.abs(item.freq - value) < 0.8);
    if (!station || heard.includes(station.id)) return;
    const next = [...heard, station.id];
    setHeard(next);
    if (next.length !== stations.length) return;
    onEarn?.();
    setToast(true);
  }

  return (
    <>
      {toast ? <Toast>You tuned every station.</Toast> : null}
      <form
        className="rounded-3xl border border-line bg-card p-4 shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] sm:p-8 dark:shadow-none"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex items-end justify-between gap-4">
          <p className="text-xs tracking-[0.22em] text-ink/40 uppercase">FM</p>
          <p className="text-3xl font-medium tracking-tight tabular-nums">
            {freq.toFixed(1)}
          </p>
        </div>
        <div className="mt-4 flex h-5 items-end gap-1" aria-hidden="true">
          <span className={`w-1 rounded-full bg-ink ${locked ? "h-2" : "h-1 opacity-30"}`} />
          <span className={`w-1 rounded-full bg-ink ${locked ? "h-3" : "h-1 opacity-30"}`} />
          <span className={`w-1 rounded-full bg-ink ${locked ? "h-4" : "h-1 opacity-30"}`} />
          <span className={`w-1 rounded-full bg-ink ${locked ? "h-5" : "h-1 opacity-30"}`} />
        </div>
        <div className="mt-8 min-h-36">
          {locked ? (
            <>
              <p className="text-xs tracking-[0.22em] text-ink/40 uppercase">
                {locked.genre}
              </p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight">
                {locked.title}
              </h3>
              <p className="mt-1 text-sm text-ink/55">{locked.artist}</p>
              <iframe
                key={locked.id}
                className="mt-5 aspect-video w-full rounded-2xl border border-line"
                src={`https://www.youtube-nocookie.com/embed/${locked.video}?rel=0`}
                title={`${locked.title} by ${locked.artist}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <a
                href={`https://www.youtube.com/watch?v=${locked.video}`}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube
              </a>
            </>
          ) : (
            <p className="text-sm text-ink/35">Static. Keep turning.</p>
          )}
        </div>
        <label className="mt-6 block py-3">
          <span className="sr-only">Tune the radio</span>
          <input
            type="range"
            name="frequency"
            min={min}
            max={max}
            step={0.1}
            value={freq}
            aria-valuetext={locked ? `${locked.genre}, ${locked.title}` : "Static"}
            className="h-11 w-full accent-ink"
            onChange={(event) => tune(Number(event.target.value))}
          />
        </label>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-center text-xs leading-tight tracking-wide text-ink/35 sm:grid-cols-4">
          {stations.map((station) => (
            <span
              key={station.id}
              className={heard.includes(station.id) ? "text-ink" : undefined}
            >
              {station.genre}
            </span>
          ))}
        </div>
      </form>
    </>
  );
}

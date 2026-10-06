"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Toast from "./toast";

const questions = [
  {
    prompt: "Which film is this portrait from?",
    choices: ["Inception", "Interstellar", "The Matrix"],
    answer: 0,
  },
  {
    prompt: "Who directed that film?",
    choices: ["Denis Villeneuve", "Christopher Nolan", "Ridley Scott"],
    answer: 1,
  },
  {
    prompt: "What keeps spinning in the final shot?",
    choices: ["A coin", "A spinning top", "A wedding ring"],
    answer: 1,
  },
];

function Portrait() {
  return (
    <figure className="w-28 shrink-0 sm:w-36">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <Image
          src="https://www.denofgeek.com/wp-content/uploads/2020/07/Inception-Ending-Explained.jpg"
          alt="Inception"
          fill
          sizes="(min-width: 640px) 9rem, 7rem"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-center text-xs tracking-wide text-ink/45 uppercase">
        Representation Image.
      </figcaption>
    </figure>
  );
}

export default function MovieQuiz({ onEarn }: { onEarn?: () => void }) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(
    questions.map(() => null),
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => {
      setPicks(questions.map(() => null));
      setStep(0);
      setToast(null);
    }, 1600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function choose(choice: number) {
    if (toast) return;
    setPicks((current) =>
      current.map((pick, index) => (index === step ? choice : pick)),
    );
  }

  function finish() {
    if (toast) return;
    const score = picks.filter(
      (pick, index) => pick === questions[index].answer,
    ).length;
    if (score === questions.length) onEarn?.();
    setToast(
      score === questions.length
        ? "Congratulations, you got them all."
        : `You got ${score} of ${questions.length}.`,
    );
  }

  const question = questions[step];
  const picked = picks[step];

  return (
    <>
    {toast ? <Toast>{toast}</Toast> : null}
    <div className="flex items-center gap-6 rounded-3xl border border-line bg-white/70 p-6 shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] sm:p-8">
      <Portrait />
      <div className="min-w-0 flex-1">
      <p className="text-xs tracking-wide text-ink/40 uppercase">
        {step + 1} of {questions.length}
      </p>
      <p className="mt-3 text-lg leading-relaxed">{question.prompt}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {question.choices.map((choice, index) => {
          const selected = picked === index;
          const correct = index === question.answer;
          const tone =
            picked === null
              ? "border-line text-ink hover:-translate-y-0.5 hover:border-ink/30"
              : correct
                ? "border-green-700/30 bg-green-700/5 text-green-700"
                : selected
                  ? "border-red-600/30 bg-red-600/5 text-red-600"
                  : "border-line text-ink/35";

          return (
            <li key={choice}>
              <button
                type="button"
                className={`w-full rounded-2xl border px-4 py-4 text-left text-base transition duration-200 ${tone}`}
                onClick={() => choose(index)}
                disabled={picked !== null}
              >
                {choice}
              </button>
            </li>
          );
        })}
      </ul>
      {picked !== null ? (
        <button
          type="button"
          className="mt-6 w-fit rounded-full border border-ink bg-ink px-5 py-2 text-sm font-medium text-paper transition duration-200 hover:-translate-y-0.5 hover:bg-transparent hover:text-ink"
          onClick={() =>
            step === questions.length - 1
              ? finish()
              : setStep((current) => current + 1)
          }
        >
          {step === questions.length - 1 ? "Finish" : "Next"}
        </button>
      ) : null}
      </div>
    </div>
    </>
  );
}

const seal =
  "M48 2 56.5 11 68 6.6 71.7 18.3 84 19.3 82.2 31.5 92.8 37.8 86 48 92.8 58.2 82.2 64.5 84 76.7 71.7 77.7 68 89.4 56.5 85 48 94 39.5 85 28 89.4 24.3 77.7 12 76.7 13.8 64.5 3.2 58.2 10 48 3.2 37.8 13.8 31.5 12 19.3 24.3 18.3 28 6.6 39.5 11Z";

function BadgeMark({ id }: { id: string }) {
  if (id === "city" || id === "cities") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path className="fill-current" d="M6 26V14h4v12H6Zm8 0V8h4v18h-4Zm8 0V12h4v14h-4Z" />
      </svg>
    );
  }

  if (id === "navigator") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <circle cx="16" cy="16" r="8" className="fill-none stroke-current stroke-2" />
        <path className="fill-current" d="M16 7.5 19 16 16 14.2 13 16 16 7.5Z" />
      </svg>
    );
  }

  if (id === "atlas") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <circle cx="16" cy="16" r="8" className="fill-none stroke-current stroke-2" />
        <path
          className="fill-none stroke-current stroke-[1.5]"
          d="M16 8v16M8 16h16M10 12c2 1.5 4 1.5 6 0s4-1.5 6 0M10 20c2-1.5 4-1.5 6 0s4 1.5 6 0"
        />
      </svg>
    );
  }

  if (id === "truths") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path
          className="fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]"
          d="M7 17 13 23 25 9"
        />
      </svg>
    );
  }

  if (id === "hello") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path className="fill-current" d="M7 8h18v12H15l-5 5v-5H7V8Z" />
      </svg>
    );
  }

  if (id === "quiz") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path className="fill-current" d="M8 13h16v12H8V13Zm2-5h10l2 5H10l-2-5Z" />
      </svg>
    );
  }

  if (id === "tune") {
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path
          className="fill-none stroke-current stroke-2 [stroke-linecap:round]"
          d="M11 18c1.6-2.4 3.2-2.4 5 0M8.5 14.5c2.6-4 6.4-4 9 0M6 11c4-6 10-6 14 0"
        />
        <circle cx="16" cy="23" r="2" className="fill-current" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <path className="fill-current" d="M16 6 18.8 13.2 26 16 18.8 18.8 16 26 13.2 18.8 6 16 13.2 13.2 16 6Z" />
    </svg>
  );
}

export default function Badge({
  id,
  label,
  tone,
  ribbon,
  caption,
  earned = true,
  className = "",
}: {
  id: string;
  label: string;
  tone: string;
  ribbon: string;
  caption: string;
  earned?: boolean;
  className?: string;
}) {
  const name = label.replace(" badge", "");
  const ghost =
    "fill-transparent stroke-ink/30 stroke-[1.5] [stroke-dasharray:3_2.5] dark:stroke-ink/55";

  return (
    <li
      className={`flex w-[5.5rem] flex-col items-center ${className}`}
      aria-label={earned ? label : `${label}, not earned`}
    >
      <span className="relative grid h-[4.6rem] w-[4.6rem] place-items-center">
        <svg viewBox="0 0 96 96" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={seal} className={earned ? ribbon : ghost} />
        </svg>
        <span
          className={
            earned
              ? `relative z-10 grid h-12 w-12 place-items-center rounded-full border-[3px] border-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ${tone}`
              : "relative z-10 grid h-12 w-12 place-items-center rounded-full border border-dashed border-ink/25 bg-transparent text-ink/30 dark:border-ink/50 dark:text-ink/55"
          }
        >
          {earned ? (
            <span className="absolute inset-1 rounded-full border border-dashed border-current/35" />
          ) : null}
          <BadgeMark id={id} />
        </span>
      </span>
      <span className="relative -mt-1 w-full">
        <svg viewBox="0 0 88 52" className="h-12 w-full" aria-hidden="true">
          <path d="M0 0H88V14L88 48 44 20 0 48Z" className={earned ? ribbon : ghost} />
        </svg>
        <span
          className={`absolute inset-x-0.5 top-1 text-center text-[9px] leading-none font-medium tracking-wide uppercase ${earned ? caption : "text-ink/35"}`}
        >
          {name}
        </span>
      </span>
    </li>
  );
}

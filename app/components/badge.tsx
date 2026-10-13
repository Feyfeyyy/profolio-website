import UilBuilding from "@iconscout/react-unicons/icons/uil-building";
import UilCheck from "@iconscout/react-unicons/icons/uil-check";
import UilClapperBoard from "@iconscout/react-unicons/icons/uil-clapper-board";
import UilComment from "@iconscout/react-unicons/icons/uil-comment";
import UilCompass from "@iconscout/react-unicons/icons/uil-compass";
import UilGlobe from "@iconscout/react-unicons/icons/uil-globe";
import UilMusic from "@iconscout/react-unicons/icons/uil-music";
import UilStar from "@iconscout/react-unicons/icons/uil-star";

const seal =
  "M48 2 56.5 11 68 6.6 71.7 18.3 84 19.3 82.2 31.5 92.8 37.8 86 48 92.8 58.2 82.2 64.5 84 76.7 71.7 77.7 68 89.4 56.5 85 48 94 39.5 85 28 89.4 24.3 77.7 12 76.7 13.8 64.5 3.2 58.2 10 48 3.2 37.8 13.8 31.5 12 19.3 24.3 18.3 28 6.6 39.5 11Z";

const marks = {
  city: UilBuilding,
  cities: UilBuilding,
  navigator: UilCompass,
  atlas: UilGlobe,
  truths: UilCheck,
  hello: UilComment,
  quiz: UilClapperBoard,
  tune: UilMusic,
} as const;

function BadgeMark({ id }: { id: string }) {
  const Icon = marks[id as keyof typeof marks] ?? UilStar;

  return <Icon size={22} color="currentColor" aria-hidden="true" />;
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

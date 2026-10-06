import Link from "next/link";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import Terminal, { Command } from "./components/terminal";

const introClass =
  "mt-3 text-sm leading-snug text-ink/80 sm:text-[clamp(0.75rem,2.2cqi,1.25rem)] sm:whitespace-nowrap";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-2 pb-10 sm:px-6 sm:pt-4 sm:pb-16">
        <Terminal path="~">
          <Command>whoami</Command>
          <h1 className="mt-3 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl">
            Feyaaz Chishty
          </h1>
          <div className="mt-8">
            <Command>cat intro.txt</Command>
          </div>
          <p className={introClass}>
            I am passionate about creating cool projects and learning new things!
          </p>
          <div className="mt-8">
            <Command>open</Command>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
            >
              About me
            </Link>
          </div>
        </Terminal>
      </main>
      <SiteFooter />
    </>
  );
}

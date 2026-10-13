import Link from "next/link";
import type { ReactNode } from "react";
import GitHubStats from "./components/github-stats";
import ProjectList from "./components/project-card";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import Terminal, { Command } from "./components/terminal";
import TerminalPrompt from "./components/terminal-prompt";
import WhoIs from "./components/who-is";
import { projects } from "./data/projects";

const elsewhere = [
  { href: "https://github.com/Feyfeyyy", label: "GitHub", value: "Feyfeyyy" },
  {
    href: "https://www.linkedin.com/in/feyaaz-chishty",
    label: "LinkedIn",
    value: "feyaaz-chishty",
  },
];

const stack = [
  { label: "Languages", items: ["Python"] },
  { label: "Frameworks", items: ["FastAPI", "React", "Django", "Flask", "Tailwind"] },
  { label: "Data", items: ["SQLAlchemy", "Postgres", "SQLite"] },
  { label: "Platforms", items: ["AWS S3"] },
];

function Section({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 grid gap-10 border-b border-line py-[clamp(56px,8vw,104px)] lg:grid-cols-3"
    >
      <p className="font-mono text-[13px] tracking-[0.08em] text-muted uppercase">
        <span className="text-accent">{index}</span> / {label}
      </p>
      <div className="min-w-0 lg:col-span-2">{children}</div>
    </section>
  );
}

function Headline({ children }: { children: string }) {
  return (
    <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.05] font-bold tracking-[-0.03em]">
      {children}
      <span className="text-accent">.</span>
    </h2>
  );
}

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,48px)]">
          <div className="pt-[clamp(32px,5vw,56px)]">
            <Terminal path="~" scroll prompt={<TerminalPrompt />}>
              <Command>whoami</Command>
              <h1 className="mt-3 text-5xl leading-[0.95] font-medium tracking-[-0.04em] text-balance sm:text-7xl">
                Feyaaz Chishty
              </h1>
              <div className="mt-8">
                <Command>cat intro.txt</Command>
              </div>
              <p className="mt-3 text-sm leading-snug sm:text-[clamp(0.75rem,2.2cqi,1.25rem)] sm:whitespace-nowrap">
                I am passionate about creating cool projects and learning new things!
              </p>
              <div className="mt-8">
                <Command>open</Command>
              </div>
              <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-label="On this page">
                <a href="#about" className="inline-flex min-h-11 items-center text-sm font-medium">
                  About
                </a>
                <a href="#stack" className="inline-flex min-h-11 items-center text-sm font-medium">
                  Stack
                </a>
                <a href="#work" className="inline-flex min-h-11 items-center text-sm font-medium">
                  Work
                </a>
                <a href="#contact" className="inline-flex min-h-11 items-center text-sm font-medium">
                  Contact
                </a>
              </nav>
            </Terminal>
            <p className="mt-6 font-mono text-[13px] text-muted">Developer — London, UK</p>
          </div>

          <Section id="about" index="01" label="About">
            <Headline>Who is Feyaaz</Headline>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              Pick how much time you have. The story is the same. The detail is not.
            </p>
            <div className="mt-8">
              <WhoIs />
            </div>
          </Section>

          <Section id="stack" index="02" label="Technologies & tools">
            <Headline>Technologies & tools</Headline>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {stack.map((group) => (
                <div key={group.label}>
                  <p className="border-b border-line pb-3 font-mono text-xs tracking-[0.08em] text-muted uppercase">
                    {group.label}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="border border-line px-2.5 py-1.5 text-[15px] font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="work" index="03" label="Selected repositories">
            <Headline>Selected repositories</Headline>
            <div className="mt-10">
              <ProjectList projects={projects} />
            </div>
          </Section>

          <Section id="stats" index="04" label="GitHub stats">
            <Headline>GitHub stats</Headline>
            <div className="mt-10">
              <GitHubStats />
            </div>
          </Section>

          <section id="contact" className="scroll-mt-24 py-[clamp(56px,8vw,104px)]">
            <h2 className="text-[clamp(44px,8vw,112px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
              Find me
              <span className="text-accent">.</span>
            </h2>
            <div className="mt-10 grid gap-px bg-line sm:grid-cols-2">
              {elsewhere.map((place) => (
                <a
                  key={place.href}
                  href={place.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-paper p-8 transition-colors hover:bg-card"
                >
                  <p className="font-mono text-xs tracking-[0.08em] text-muted uppercase">
                    {place.label}
                  </p>
                  <p className="mt-4 text-[clamp(20px,2.4vw,28px)] font-medium [overflow-wrap:anywhere]">
                    {place.value} <span aria-hidden="true">↗</span>
                  </p>
                </a>
              ))}
            </div>
            <p className="mt-8 text-[15px] leading-relaxed text-muted">
              The about page is a set of small games. <Link href="/about">Open one</Link>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

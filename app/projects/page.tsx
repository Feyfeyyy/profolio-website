import Image from "next/image";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import Terminal, { Command } from "../components/terminal";
import { projects } from "./projects";

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-12 w-12 fill-current">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.2a11 11 0 0 1 5.8 0c2.2-1.51 3.17-1.2 3.17-1.2.64 1.59.24 2.75.12 3.05.75.81 1.2 1.84 1.2 3.1 0 4.41-2.69 5.39-5.25 5.67.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-16 sm:px-6 sm:pb-20">
        <section className="pt-2 pb-8 sm:pt-4 sm:pb-10">
          <Terminal path="~/projects" scroll>
            <Command>cd ~/projects</Command>
            <h1 className="mt-3 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl">
              Projects
            </h1>
            <div className="mt-8">
              <Command>cat readme.txt</Command>
            </div>
            <p className="mt-3 text-sm leading-snug text-ink/80 sm:whitespace-nowrap sm:text-[clamp(0.75rem,2.2cqi,1.25rem)]">
              Things I have built while learning new tools.
            </p>
          </Terminal>
        </section>
        <ul className="grid gap-4 py-10 sm:grid-cols-2 sm:gap-6 sm:py-14">
          {projects.map((project, index) => (
            <li key={project.href}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-3xl border border-line bg-card p-4 shadow-[0_20px_40px_-28px_rgba(20,20,19,0.45)] transition duration-200 hover:-translate-y-0.5 sm:p-5 dark:shadow-none"
              >
                <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl bg-paper text-ink">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 24rem, 100vw"
                      className="object-contain p-6"
                    />
                  ) : (
                    <GitHubMark />
                  )}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-medium tracking-tight">
                    {project.name}
                  </h2>
                  <p className="text-xs tracking-wide text-ink/40">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {project.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-2.5 py-1 text-[11px] tracking-wide text-ink/55 uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-sm font-medium underline decoration-ink/25 underline-offset-4">
                  GitHub
                </p>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}

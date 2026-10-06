import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { projects } from "./projects";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-20">
        <section className="border-b border-line py-12 lg:py-20">
          <p className="text-sm text-ink/45">Work</p>
          <h1 className="mt-4 max-w-xl text-5xl leading-[0.95] font-medium tracking-tight text-balance sm:text-7xl">
            Projects
          </h1>
          <p className="mt-6 max-w-md font-display text-2xl leading-snug text-ink/80">
            Things I have built while learning new tools.
          </p>
        </section>
        <ol>
          {projects.map((project, index) => (
            <li
              key={project.href}
              className="grid gap-4 border-b border-line py-10 sm:grid-cols-12 sm:items-start"
            >
              <p className="text-sm text-ink/40 sm:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="sm:col-span-7">
                <h2 className="text-2xl font-medium tracking-tight">
                  {project.name}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">
                  {project.summary}
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 sm:col-span-4 sm:items-end">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="text-xs tracking-wide text-ink/45 uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
                >
                  GitHub
                </a>
              </div>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}

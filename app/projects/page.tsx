import ProjectList from "../components/project-card";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import Terminal, { Command } from "../components/terminal";
import { projects } from "../data/projects";

export const metadata = {
  title: "Projects",
};



export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-[clamp(20px,4vw,48px)] pb-16">
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
        <div className="py-[clamp(56px,8vw,104px)]">
          <ProjectList projects={projects} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

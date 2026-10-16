import type { Project } from "../data/projects";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [featured, ...rest] = projects;
  if (!featured) return null;

  return (
    <div>
      <a
        href={featured.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-ink p-8 text-paper transition-colors hover:bg-accent hover:text-white"
      >
        <p className="font-mono text-[13px] opacity-75">
          01 — {featured.stack[0]}
        </p>
        <h3 className="mt-4 text-[clamp(32px,4.5vw,52px)] leading-none font-bold tracking-[-0.03em]">
          {featured.name}
          <span className="text-accent group-hover:text-white">.</span>
        </h3>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-85">
          {featured.summary}
        </p>
        <p className="mt-6" aria-hidden="true">
          ↗
        </p>
      </a>
      <ul>
        {rest.map((project, index) => (
          <li key={project.href}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[48px_minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-line py-[22px] pr-1 transition-[padding,color] hover:pl-3 sm:grid-cols-[48px_minmax(0,1fr)_auto_auto]"
            >
              <span className="font-mono text-[13px] text-muted group-hover:text-accent">
                {String(index + 2).padStart(2, "0")}
              </span>
              <span className="text-[clamp(20px,2.4vw,26px)] leading-tight font-semibold tracking-[-0.02em] group-hover:text-accent">
                {project.name}
              </span>
              <span className="hidden font-mono text-[13px] text-muted group-hover:text-accent sm:block">
                {project.stack[0]}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

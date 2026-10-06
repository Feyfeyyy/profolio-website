import Link from "next/link";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 sm:py-24">
        <p className="text-sm text-ink/45">Portfolio</p>
        <h1 className="mt-5 max-w-4xl text-6xl leading-[0.92] font-medium tracking-tight text-balance sm:text-8xl">
          Feyaaz Chishty
        </h1>
        <p className="mt-8 max-w-md font-display text-2xl leading-snug text-ink/80">
          I am passionate about creating cool projects and learning new things!
        </p>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/projects"
            className="w-fit text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="w-fit text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
          >
            About me
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

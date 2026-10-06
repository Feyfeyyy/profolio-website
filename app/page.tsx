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
        <p className="sml-bio mt-8">
          I am passionate about creating cool projects and learning new things!
        </p>
        <Link
          href="/about"
          className="mt-12 w-fit text-sm font-medium underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
        >
          About me
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}

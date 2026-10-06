import AboutPlay from "../components/about-play";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata = {
  title: "About me",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-20">
        <section className="border-b border-line py-12 lg:py-20">
          <div className="flex max-w-xl flex-col gap-6">
            <h1 className="text-5xl leading-[0.95] font-medium tracking-tight text-balance sm:text-7xl">
              About me
            </h1>
            <p className="max-w-md font-display text-2xl leading-snug text-ink/80">
              I am passionate about creating cool projects and learning new
              things!
            </p>
            <p className="text-2xl text-ink/40" aria-hidden="true">
              ↓
            </p>
          </div>
        </section>
        <section className="pt-8 pb-16 lg:pt-10 lg:pb-20">
          <AboutPlay />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import AboutPlay from "../components/about-play";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import Terminal, { Command } from "../components/terminal";

export const metadata = {
  title: "About me",
};

const plays = ["truths", "custom-inputs", "quiz", "stickers", "radio"];

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ play?: string }>;
}) {
  const { play } = await searchParams;
  const initialTab = plays.includes(play ?? "") ? play : undefined;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-[clamp(20px,4vw,48px)] pb-16">
        <section className="pt-2 pb-8 sm:pt-4 sm:pb-10">
          <Terminal path="~/about" scroll>
            <Command>cd ~/about</Command>
            <h1 className="mt-3 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl">
              About me
            </h1>
            <div className="mt-8">
              <Command>cat intro.txt</Command>
            </div>
            <p className="mt-3 text-sm leading-snug text-ink/80 sm:whitespace-nowrap sm:text-[clamp(0.75rem,2.2cqi,1.25rem)]">
              I am passionate about creating cool projects and learning new things!
            </p>
          </Terminal>
        </section>
        <section id="forms" className="scroll-mt-24 pt-8 pb-16 lg:pt-10 lg:pb-20">
          <AboutPlay initialTab={initialTab} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import IntroForms from "./components/intro-forms";
import TwoTruths from "./components/two-truths";

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm">
        <p className="font-medium">Feyaaz Chishty</p>
        <p className="text-ink/50">Portfolio</p>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-20">
        <section className="grid items-end gap-10 border-b border-line py-12 lg:grid-cols-12 lg:py-20">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <h1 className="max-w-xl text-5xl leading-[0.95] font-medium tracking-tight text-balance sm:text-7xl">
              Hello, I&apos;m Feyaaz
            </h1>
            <p className="sml-bio">
              I am passionate about creating cool projects and learning new
              things.
            </p>
          </div>
          <figure className="w-full lg:col-span-5">
            <img
              className="spinner-img aspect-4/5"
              src="https://www.denofgeek.com/wp-content/uploads/2020/07/Inception-Ending-Explained.jpg"
              alt="Inception"
            />
            <figcaption className="mt-3 text-xs tracking-wide text-ink/45 uppercase">
              Representation image
            </figcaption>
          </figure>
        </section>
        <section className="box py-16 lg:py-20">
          <TwoTruths />
          <IntroForms />
        </section>
      </main>
      <footer className="border-t border-line px-6 py-6">
        <p className="ftr mx-auto max-w-6xl">© 2024 Feyaaz Chishty</p>
      </footer>
    </>
  );
}

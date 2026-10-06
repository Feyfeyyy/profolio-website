import type { Metadata } from "next";
import { Exo, Honk, Pacifico } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
});

const honk = Honk({
  subsets: ["latin"],
  variable: "--font-honk",
});

export const metadata: Metadata = {
  title: {
    default: "Feyaaz Chishty",
    template: "%s · Feyaaz Chishty",
  },
  description:
    "Portfolio of Feyaaz Chishty. Projects and things I am learning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pacifico.variable} ${exo.variable} ${honk.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
        <Script id="theme" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}

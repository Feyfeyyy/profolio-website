import type { Metadata } from "next";
import { Exo, Honk, Pacifico } from "next/font/google";
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
      className={`${pacifico.variable} ${exo.variable} ${honk.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

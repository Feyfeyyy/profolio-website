"use client";

import { useEffect, useState } from "react";

type ThemeColors = {
  accent: string;
  text: string;
  muted: string;
  theme: "light" | "dark";
};

const fallback: ThemeColors = {
  accent: "2F6FED",
  text: "EDEBE5",
  muted: "9A978E",
  theme: "dark",
};

function useThemeColors() {
  const [colors, setColors] = useState<ThemeColors>(fallback);

  useEffect(() => {
    function read() {
      const styles = getComputedStyle(document.documentElement);
      const hex = (name: string) => styles.getPropertyValue(name).trim().replace("#", "");
      setColors({
        accent: hex("--color-accent") || fallback.accent,
        text: hex("--color-ink") || fallback.text,
        muted: hex("--color-muted") || fallback.muted,
        theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      });
    }

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}

export default function GitHubStats() {
  const { accent, text, muted, theme } = useThemeColors();
  const stats = `https://github-readme-stats.vercel.app/api?username=Feyfeyyy&show_icons=true&hide_border=true&bg_color=00000000&title_color=${accent}&icon_color=${accent}&text_color=${text}`;
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?username=Feyfeyyy&layout=compact&hide_border=true&bg_color=00000000&title_color=${accent}&text_color=${text}`;
  const streak = `https://streak-stats.demolab.com/?user=Feyfeyyy&hide_border=true&background=00000000&ring=${accent}&fire=${accent}&currStreakLabel=${accent}&currStreakNum=${text}&sideNums=${text}&sideLabels=${text}&dates=${muted}&stroke=${muted}`;
  const quote = `https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme}&border=false`;

  const cells = [
    { src: stats, alt: "GitHub stats for Feyfeyyy" },
    { src: langs, alt: "Most used languages for Feyfeyyy" },
    { src: streak, alt: "GitHub contribution streak for Feyfeyyy" },
    { src: quote, alt: "A quote" },
  ];

  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {cells.map((cell) => (
        <div key={cell.alt} className="grid min-h-[200px] place-items-center bg-paper p-6">
          <img src={cell.src} alt={cell.alt} className="max-w-full" />
        </div>
      ))}
    </div>
  );
}

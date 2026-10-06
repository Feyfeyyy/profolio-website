export type Project = {
  name: string;
  summary: string;
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    name: "Portfolio",
    summary:
      "This site. A Next.js portfolio with a landing page, an about page, and a place to show the work.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    href: "https://github.com/Feyfeyyy/profolio-website",
  },
  {
    name: "Smart Elevator",
    summary:
      "A single-page app for managing users of a smart elevator system, with a FastAPI backend and a React frontend.",
    stack: ["Python", "FastAPI", "React", "Tailwind"],
    href: "https://github.com/Feyfeyyy/smart-elevator-app",
  },
  {
    name: "Movie API",
    summary:
      "A REST API for retrieving movie information from a database, built with FastAPI and SQLAlchemy.",
    stack: ["Python", "FastAPI", "SQLAlchemy"],
    href: "https://github.com/Feyfeyyy/movie-api",
  },
  {
    name: "Simple File Upload",
    summary:
      "A Django app for uploading data files, processing them, and querying what was stored in Postgres.",
    stack: ["Python", "Django", "Postgres"],
    href: "https://github.com/Feyfeyyy/simple-file-upload",
  },
  {
    name: "Up Book",
    summary:
      "A platform where book lovers can create an account, upload books, and read what is on the shelf.",
    stack: ["Python", "Flask", "AWS S3"],
    href: "https://github.com/Feyfeyyy/up-book",
  },
  {
    name: "Sport Data Parser",
    summary:
      "A Python script that pulls data from the Sport Data API and stores it in a CSV file or a SQLite database.",
    stack: ["Python", "SQLite"],
    href: "https://github.com/Feyfeyyy/sport-data-parser",
  },
];

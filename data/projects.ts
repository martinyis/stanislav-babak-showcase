export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  label: string;
  tags: string[];
  media:
    | { type: "video"; src: string }
    | { type: "image"; src: string };
  /** How media renders in the carousel: fullbleed background or phone mockup */
  mediaDisplay: "fullbleed" | "phone";
  thumbnail: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    slug: "mudface",
    title: "MUDFACE",
    tagline: "Your AI Esthetician",
    description:
      "Full-stack AI skincare platform with a web dashboard and native mobile app. Multi-model orchestration for personalized skincare routines.",
    label: "Internship / 2025",
    tags: ["React", "React Native", "Node.js", "AI/ML", "MongoDB"],
    media: { type: "video", src: "/videos/mudface-web.mp4" },
    mediaDisplay: "fullbleed",
    thumbnail: "/videos/mudface-web.mp4",
  },
  {
    slug: "taskmind",
    title: "TASKMIND",
    tagline: "AI-Powered Research Platform",
    description:
      "Full-stack AI SaaS platform automating market intelligence with multi-model orchestration and RAG pipelines.",
    label: "Team Lead / Startup",
    tags: ["Next.js", "TypeScript", "RAG", "Multi-Model AI", "PostgreSQL"],
    media: { type: "video", src: "/videos/TASKMIND.mp4" },
    mediaDisplay: "fullbleed",
    thumbnail: "/videos/TASKMIND.mp4",
    live: "https://www.taskmind.pro/dashboard",
  },
  {
    slug: "practapp",
    title: "PRACTAPP",
    tagline: "AI-Powered Fluency Training",
    description:
      "Full-stack mobile app that transforms language knowledge into spoken fluency with real-time AI coaching and 8 practice modes.",
    label: "Personal Project / 2024–2025",
    tags: ["React Native", "Node.js", "OpenAI", "Google Cloud", "Expo"],
    media: { type: "video", src: "/videos/PRACTAPP.mp4" },
    mediaDisplay: "fullbleed",
    thumbnail: "/videos/PRACTAPP.mp4",
  },
  {
    slug: "airfare",
    title: "AIRFARE",
    tagline: "Find the Cheapest Flights",
    description:
      "Full-stack mobile app helping travelers find the cheapest flights across flexible date combinations with smart price tracking.",
    label: "Personal Project / 2025",
    tags: ["React Native", "Node.js", "SerpAPI", "Expo"],
    media: { type: "image", src: "/images/skylens-home.png" },
    mediaDisplay: "phone",
    thumbnail: "/images/skylens-home.png",
    github: "https://github.com/martinyis/flight-tracker",
  },
  {
    slug: "jobtracker",
    title: "JOBTRACKER",
    tagline: "AI-Powered Job Search Agent",
    description:
      "Full-stack AI job search automation with intelligent scoring, multi-layer filtering, and background LinkedIn scraping agents.",
    label: "Personal Project / 2025",
    tags: ["Next.js", "Python", "AI Agents", "PostgreSQL"],
    media: { type: "image", src: "/images/jobtracker-dashboard.png" },
    mediaDisplay: "fullbleed",
    thumbnail: "/images/jobtracker-dashboard.png",
    github: "https://github.com/martinyis/job-tracker",
  },
];

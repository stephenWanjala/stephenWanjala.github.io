import type { Education, Experience, Language, Skill } from "@/types/Types.ts";
import axios from "axios";

// Project & Contributor Interfaces
export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface Project {
  name: string;
  image: string;
  url: string;
  gitName: string;
  stars: string;
  forks: string;
  description?: string;
  tags: string[];
  contributors?: Contributor[];
  webLink?: string;
}

// Projects Data
export let projects: Project[] = [
  {
    name: "geoSpartial_village",
    image: "/images/geosparcial.jpeg",
    url: "https://github.com/stephenWanjala/geoSpartial_village",
    gitName: "stephenWanjala/geoSpartial_village",
    stars: "?",
    forks: "?",
    description: "Health IT hackathon 2024 Digimal solution",
    tags: ["Vue 3", "Pinia", "LeafLet js", "TypeScript", "Vuetify3"],
  },
  {
    name: "Multiply",
    url: "https://github.com/stephenWanjala/Multiply",
    gitName: "stephenWanjala/Multiply",
    stars: "?",
    forks: "?",
    description:
      "Simple Android app to help kids improve their multiplication skills in a fun and interactive way.",
    tags: ["Android", "Kotlin", "JetPack Compose"],
    image: "/images/multiply.gif",
  },
  {
    name: "DB2JHelper",
    url: "https://github.com/stephenWanjala/DB2JHelper",
    gitName: "stephenWanjala/DB2JHelper",
    stars: "?",
    forks: "?",
    description:
      "Simplified Database Operations for Java JDBC A lightweight, modern Java library for effortless  database interactions",
    tags: ["Java", "Library"],
    image: "/images/db2JHelper.png",
  },
  {
    name: "BRecipes",
    url: "https://github.com/stephenWanjala/brecipes-fastify ",
    gitName: "stephenWanjala/brecipes-fastify",
    stars: "?",
    forks: "?",
    description: "Recipes Data Of BBC Holiday Dishes",
    tags: [
      "Android",
      "Kotlin",
      "JetPack Compose",
      "Room",
      "Ktor",
      "Paging & Caching",
      "Fastify",
      "Prisma",
      "Postgres",
      "NextJs",
    ],
    image: "/images/brecipes.png",
    webLink: "https://brecipes-fastify-web.vercel.app/",
  },
];

// Cache Constants
const CACHE_KEY = "github_projects_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper function to safely interact with localStorage
function safeLocalStorage(action: "get" | "set", key: string, value?: string) {
  try {
    if (action === "get") return localStorage.getItem(key);
    localStorage.setItem(key, value!);
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}

// Fetch project data with caching
export function getProjectWithStars(onFinish: (result: Project[]) => void) {
  const now = Date.now();
  const cacheEntry = safeLocalStorage("get", CACHE_KEY);

  if (cacheEntry) {
    const parsedCache = JSON.parse(cacheEntry);
    if (now < parsedCache.expires) return onFinish(parsedCache.data);
  }

  // Prepare API Requests
  const requests = projects.map(({ gitName }) => {
    if (!gitName.includes("/")) return Promise.resolve(null);
    const [owner, repo] = gitName.split("/");
    return axios.all([
      axios.get(`https://api.github.com/repos/${owner}/${repo}`),
      axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`),
    ]);
  });

  Promise.allSettled(requests).then((results) => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        const [repoResponse, contributorsResponse] = result.value;
        projects[index].stars = repoResponse.data.stargazers_count.toString();
        projects[index].forks = repoResponse.data.forks_count.toString();
        projects[index].contributors = contributorsResponse.data.map(
          (c: any) => ({
            login: c.login,
            avatar_url: c.avatar_url,
            html_url: c.html_url,
            contributions: c.contributions,
          }),
        );
      } else {
        console.error(`Error fetching data for ${projects[index].name}`);
        projects[index].stars = "?";
        projects[index].forks = "?";
        projects[index].contributors = [];
      }
    });

    projects.sort(
      (a, b) =>
        parseInt(b.stars) - parseInt(a.stars) ||
        parseInt(b.forks) - parseInt(a.forks),
    );
    safeLocalStorage(
      "set",
      CACHE_KEY,
      JSON.stringify({ data: projects, expires: Date.now() + CACHE_TTL }),
    );
    onFinish(projects);
  });
}

// Utility Functions
export function getImageUrl(path: string) {
  return new URL(`/src/assets/images/${path}`, import.meta.url).href;
}

export function openLink(url: string) {
  window.open(url, "_blank");
}
// Languages
export const langs: Language[] = [
  { name: "English", proficiency: 10 },
  { name: "Swahili", proficiency: 9 },
];

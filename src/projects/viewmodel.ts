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
    description:
      "Recipes Data Of BBC Holiday Dishes",
    tags: ["Android", "Kotlin", "JetPack Compose","Room","Ktor","Paging & Caching","Fastify","Prisma","Postgres","NextJs"],
    image: "/images/brecipes.png",
     webLink:"https://brecipes-fastify-web.vercel.app/"
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

// Experience Data
export const experiences: Experience[] = Array.of<Experience>(
  {
    company: "PrimeSoft Solutions Limited",
    companyLink: "https://primesoft.co.ke",
    logo: "images/primesoft.png",
    roles: [
      {
        time: { start: new Date("2024-09-01"), current: true },
        jobTitle: "Software Developer",
        details: [
          "Developing and maintaining software applications, including mobile, and desktop applications under the MaliPlus ERP.",
          "Design, and implement assigned features, modules, and enhancements for MaliPlus ERP.",
          "Collaborate with Support Team to troubleshoot and resolve software issues.",
        ],
      },
      {
        time: { start: new Date("2024-05-25"), end: new Date("2024-08-30") },
        jobTitle: "Software Developer Intern",
        details: [
          "Contributing to development and maintenance of software desktop applications under the MaliPlus ERP.",
          "Collaborating with cross-functional teams to analyze, design, and implement assigned new features, modules and enhancements for MaliPlus ERP.",
          "Writing clean, maintainable, and efficient code, adhering to best practices and coding standards.",
          "Debugging, and troubleshooting software issues. ",
          "Providing technical support to clients, addressing their inquiries, troubleshooting issues, and offering guidance on using software applications effectively.",
          "Contributing to the development of software architecture, design patterns, and coding standards to ensure consistency and scalability.",
          "Participating in team meetings, stand-ups, and sprint planning sessions to coordinate work and prioritize tasks effectively.",
        ],
      },
    ],
  },
  {
    company: "Kibabii University",
    companyLink: "https://kibu.ac.ke",
    logo: "images/kibabii.png",
    roles: [
      {
        time: { start: new Date("2023-05-25"), end: new Date("2023-08-08") },
        jobTitle: "Information Technology Attachment",
        details: [
          "Configuring managed switches, implementing VLANs, and securing network communications through SSH and Telnet protocols.",
          "Performing general computer maintenance tasks, including hardware upgrades, memory enhancement, and installation of operating systems and software applications.",
          "Installing and configuring ABNO ERP software, ensuring seamless operation and maintaining compliance with updates and patches.",
          "Designing and executing scripts for database automation, data normalization, and de-normalization, streamlining data management processes.",
          "Managing and configuring IP cameras, editing captured videos for presentations, and maintaining the security and integrity of video evidence.",
          "Providing technical support to students and staff, troubleshooting software-related issues, and offering guidance on using software applications effectively.",
          "Collaborating with cross-functional teams to enhance IT infrastructure, including transitioning from unmanaged to managed switches and optimizing access points and point-to-point radios.",
          "Assisting in the training of staff to effectively use the ERP software and troubleshoot any issues they encountered.",
          "Developing software solutions for clients, addressing their specific needs and contributing to the department's services.",
        ],
      },
    ],
  },
);

// Skills Data
export const skills: Skill[] = [
  {
    title: "Django & Rest Framework",
    level: 100,
    icon: "devicon-django-plain",
    color: "colored",
  },
  {
    title: "Kotlin",
    level: 100,
    icon: "devicon-kotlin-plain",
    color: "colored",
  },
  {
    title: "Jetpack Compose",
    level: 100,
    icon: "devicon-jetpackcompose-plain-wordmark",
    color: "colored",
  },
  {
    title: "Java & JavaFX",
    level: 100,
    icon: "devicon-java-plain-wordmark",
    color: "colored",
  },
  {
    title: "Kotlin Ktor & Spring Boot",
    level: 100,
    icon: "devicon-ktor-plain-wordmark",
    color: "colored",
  },
  {
    title: "Vue.js",
    level: 100,
    icon: "devicon-vuejs-plain",
    color: "colored",
  },
];

// Education Data
export const educations: Education[] = [
  {
    degree: "BSc. Information Technology",
    school: "Maseno University",
    duration: "2020 - 2024",
  },
  {
    degree: "KCSE",
    school: "St Peter's Sang'alo High School",
    duration: "2015 - 2019",
  },
];

// Languages
export const langs: Language[] = [
  { name: "English", description: "Fluent" },
  { name: "Swahili", description: "Fluent" },
];

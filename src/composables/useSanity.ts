import { ref, computed, watch } from "vue";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type {
  Project,
  Experience,
  Skill,
  Education,
  Language,
  Hobby,
  Profile,
} from "@/types/Types";

// Sanity client configuration
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01",
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === "true",
  token: import.meta.env.VITE_SANITY_TOKEN,
});

// Image builder for Sanity images
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries
const queries = {
  projects: `*[_type == "project"] | order(stars desc) {
    _id,
    name,
    description,
    image,
    url,
    gitName,
    stars,
    forks,
    tags,
    webLink,
    contributors[] {
      login,
      avatar_url,
      html_url,
      contributions
    }
  }`,

  experiences: `*[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    companyLink,
    logo,
    roles[] {
      jobTitle,
      startDate,
      endDate,
      isCurrent,
      details
    }
  }`,

  skills: `*[_type == "skill"] | order(category asc, name asc) {
    _id,
    name,
    category,
    proficiency,
    icon
  }`,

  education: `*[_type == "education"] | order(graduationDate desc) {
    _id,
    institution,
    degree,
    field,
    graduationDate,
    description,
    logo
  }`,

  languages: `*[_type == "language"] | order(proficiency desc) {
    _id,
    name,
    proficiency,
    icon
  }`,

  hobbies: `*[_type == "hobby"] | order(name asc) {
    _id,
    name,
    description,
    icon
  }`,

  profile: `*[_type == "profile"][0] {
    _id,
    name,
    title,
    summary,
    avatar,
    socials[] {
      platform,
      url,
      icon
    }
  }`,
};

// Cache for GitHub data
const githubCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to get cached data or fetch from GitHub
const getGitHubData = async (owner: string, repo: string) => {
  const cacheKey = `${owner}/${repo}`;
  const cached = githubCache.get(cacheKey);

  // Return cached data if it's still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Add GitHub token if available
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    if (githubToken) {
      headers["Authorization"] = `token ${githubToken}`;
    }

    const [repoResponse, contributorsResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
      fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
        headers,
      }),
    ]);

    if (repoResponse.ok && contributorsResponse.ok) {
      const repoData = await repoResponse.json();
      const contributorsData = await contributorsResponse.json();

      const data = {
        stars: repoData.stargazers_count.toString(),
        forks: repoData.forks_count.toString(),
        contributors: contributorsData.map((c: any) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: c.contributions,
        })),
      };

      // Cache the data
      githubCache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } else {
      console.warn(
        `GitHub API error for ${owner}/${repo}:`,
        repoResponse.status,
        contributorsResponse.status,
      );
    }
  } catch (err) {
    console.error(`Error fetching GitHub data for ${owner}/${repo}:`, err);
  }

  return null;
};

// Generic data fetching composable
export function useSanityData<T>(query: string) {
  const data = ref<T[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const result = await client.fetch(query);
      data.value = result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch data";
      console.error("Sanity fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
}

// Specific composables for each content type
export function useProjects() {
  const { data, isLoading, error, fetchData } = useSanityData<Project>(
    queries.projects,
  );
  const projectsWithGitHubData = ref<Project[]>([]);
  const isGitHubLoading = ref(false);

  const processedProjects = computed(() =>
    data.value.map((project) => ({
      ...project,
      image: project.image ? urlFor(project.image).url() : project.image,
    })),
  );

  // Function to fetch GitHub data for projects
  const fetchGitHubData = async () => {
    if (!processedProjects.value.length) return;

    isGitHubLoading.value = true;

    try {
      const projectsWithData = await Promise.all(
        processedProjects.value.map(async (project) => {
          if (project.gitName && project.gitName.includes("/")) {
            const [owner, repo] = project.gitName.split("/");
            const githubData = await getGitHubData(owner, repo);

            if (githubData) {
              return {
                ...project,
                stars: githubData.stars,
                forks: githubData.forks,
                contributors: githubData.contributors,
              };
            }
          }

          // Return project with default values if GitHub fetch fails
          return {
            ...project,
            stars: project.stars || "0",
            forks: project.forks || "0",
            contributors: project.contributors || [],
          };
        }),
      );

      projectsWithGitHubData.value = projectsWithData;
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
    } finally {
      isGitHubLoading.value = false;
    }
  };

  // Watch for changes in processedProjects and fetch GitHub data
  watch(
    processedProjects,
    () => {
      if (processedProjects.value.length > 0) {
        fetchGitHubData();
      }
    },
    { immediate: true },
  );

  return {
    projects: computed(() =>
      projectsWithGitHubData.value.length > 0
        ? projectsWithGitHubData.value
        : processedProjects.value,
    ),
    isLoading: computed(() => isLoading.value || isGitHubLoading.value),
    error,
    fetchProjects: fetchData,
  };
}

export function useExperiences() {
  const { data, isLoading, error, fetchData } = useSanityData<Experience>(
    queries.experiences,
  );

  const processedExperiences = computed(() =>
    data.value.map((exp) => ({
      ...exp,
      logo: exp.logo ? urlFor(exp.logo).url() : exp.logo,
      roles: exp.roles.map((role) => ({
        ...role,
        time: {
          start: new Date(role.startDate),
          end: role.endDate ? new Date(role.endDate) : undefined,
          current: role.isCurrent,
        },
      })),
    })),
  );

  return {
    experiences: processedExperiences,
    isLoading,
    error,
    fetchExperiences: fetchData,
  };
}

export function useSkills() {
  const { data, isLoading, error, fetchData } = useSanityData<Skill>(
    queries.skills,
  );

  const processedSkills = computed(() =>
    data.value.map((skill) => ({
      ...skill,
      icon: skill.icon ? urlFor(skill.icon).url() : skill.icon,
    })),
  );

  return {
    skills: processedSkills,
    isLoading,
    error,
    fetchSkills: fetchData,
  };
}

export function useEducation() {
  const { data, isLoading, error, fetchData } = useSanityData<Education>(
    queries.education,
  );

  const processedEducation = computed(() =>
    data.value.map((edu) => ({
      ...edu,
      logo: edu.logo ? urlFor(edu.logo).url() : edu.logo,
      graduationDate: new Date(edu.graduationDate),
    })),
  );

  return {
    education: processedEducation,
    isLoading,
    error,
    fetchEducation: fetchData,
  };
}

export function useLanguages() {
  const { data, isLoading, error, fetchData } = useSanityData<Language>(
    queries.languages,
  );

  const processedLanguages = computed(() =>
    data.value.map((lang) => ({
      ...lang,
      icon: lang.icon ? urlFor(lang.icon).url() : lang.icon,
    })),
  );

  return {
    languages: processedLanguages,
    isLoading,
    error,
    fetchLanguages: fetchData,
  };
}

export function useHobbies() {
  const { data, isLoading, error, fetchData } = useSanityData<Hobby>(
    queries.hobbies,
  );

  const processedHobbies = computed(() =>
    data.value.map((hobby) => ({
      ...hobby,
      icon: hobby.icon ? urlFor(hobby.icon).url() : hobby.icon,
    })),
  );

  return {
    hobbies: processedHobbies,
    isLoading,
    error,
    fetchHobbies: fetchData,
  };
}

export function useProfile() {
  const profile = ref<Profile | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfile = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const result = await client.fetch(queries.profile);
      if (result) {
        profile.value = {
          ...result,
          avatar: result.avatar ? urlFor(result.avatar).url() : result.avatar,
        };
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch profile";
      console.error("Sanity fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
  };
}

// Master composable for all data
export function useSanity() {
  const {
    projects,
    isLoading: projectsLoading,
    error: projectsError,
    fetchProjects,
  } = useProjects();

  const {
    experiences,
    isLoading: experiencesLoading,
    error: experiencesError,
    fetchExperiences,
  } = useExperiences();

  const {
    skills,
    isLoading: skillsLoading,
    error: skillsError,
    fetchSkills,
  } = useSkills();

  const {
    education,
    isLoading: educationLoading,
    error: educationError,
    fetchEducation,
  } = useEducation();

  const {
    languages,
    isLoading: languagesLoading,
    error: languagesError,
    fetchLanguages,
  } = useLanguages();

  const {
    hobbies,
    isLoading: hobbiesLoading,
    error: hobbiesError,
    fetchHobbies,
  } = useHobbies();

  const {
    profile,
    isLoading: profileLoading,
    error: profileError,
    fetchProfile,
  } = useProfile();

  const isLoading = computed(
    () =>
      projectsLoading.value ||
      experiencesLoading.value ||
      skillsLoading.value ||
      educationLoading.value ||
      languagesLoading.value ||
      hobbiesLoading.value ||
      profileLoading.value,
  );

  const error = computed(
    () =>
      projectsError.value ||
      experiencesError.value ||
      skillsError.value ||
      educationError.value ||
      languagesError.value ||
      hobbiesError.value ||
      profileError.value,
  );

  const fetchAllData = async () => {
    await Promise.all([
      fetchProjects(),
      fetchExperiences(),
      fetchSkills(),
      fetchEducation(),
      fetchLanguages(),
      fetchHobbies(),
      fetchProfile(),
    ]);
  };

  return {
    // Data
    projects,
    experiences,
    skills,
    education,
    languages,
    hobbies,
    profile,

    // Loading states
    isLoading,
    projectsLoading,
    experiencesLoading,
    skillsLoading,
    educationLoading,
    languagesLoading,
    hobbiesLoading,
    profileLoading,

    // Error states
    error,
    projectsError,
    experiencesError,
    skillsError,
    educationError,
    languagesError,
    hobbiesError,
    profileError,

    // Actions
    fetchAllData,
    fetchProjects,
    fetchExperiences,
    fetchSkills,
    fetchEducation,
    fetchLanguages,
    fetchHobbies,
    fetchProfile,
  };
}

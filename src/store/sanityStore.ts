import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { client, queries, urlFor } from "@/lib/sanity";
import type {
  Project,
  Experience,
  Skill,
  Education,
  Language,
  Hobby,
  Profile,
} from "@/types/Types";

export const useSanityStore = defineStore("sanity", () => {
  // State
  const projects: Ref<Project[]> = ref([]);
  const experiences: Ref<Experience[]> = ref([]);
  const skills: Ref<Skill[]> = ref([]);
  const education: Ref<Education[]> = ref([]);
  const languages: Ref<Language[]> = ref([]);
  const hobbies: Ref<Hobby[]> = ref([]);
  const profile: Ref<Profile | null> = ref(null);

  // Loading states
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  // Helper function to handle image URLs
  const processImage = (image: any) => {
    if (!image) return null;
    if (typeof image === "string") return image;
    return urlFor(image).url();
  };

  // Fetch all data
  async function fetchAllData() {
    try {
      isLoading.value = true;
      error.value = null;

      await Promise.all([
        fetchProjects(),
        fetchExperiences(),
        fetchSkills(),
        fetchEducation(),
        fetchLanguages(),
        fetchHobbies(),
        fetchProfile(),
      ]);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch data";
      console.error("Sanity fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  // Fetch projects
  async function fetchProjects() {
    try {
      const data = await client.fetch(queries.projects);
      projects.value = data.map((project: any) => ({
        ...project,
        image: processImage(project.image),
      }));
    } catch (err) {
      console.error("Error fetching projects:", err);
      throw err;
    }
  }

  // Fetch experiences
  async function fetchExperiences() {
    try {
      const data = await client.fetch(queries.experiences);
      experiences.value = data.map((exp: any) => ({
        ...exp,
        logo: processImage(exp.logo),
        roles: exp.roles.map((role: any) => ({
          ...role,
          time: {
            start: new Date(role.startDate),
            end: role.endDate ? new Date(role.endDate) : undefined,
            current: role.isCurrent,
          },
        })),
      }));
    } catch (err) {
      console.error("Error fetching experiences:", err);
      throw err;
    }
  }

  // Fetch skills
  async function fetchSkills() {
    try {
      const data = await client.fetch(queries.skills);
      skills.value = data.map((skill: any) => ({
        ...skill,
        icon: processImage(skill.icon),
      }));
    } catch (err) {
      console.error("Error fetching skills:", err);
      throw err;
    }
  }

  // Fetch education
  async function fetchEducation() {
    try {
      const data = await client.fetch(queries.education);
      education.value = data.map((edu: any) => ({
        ...edu,
        logo: processImage(edu.logo),
        graduationDate: new Date(edu.graduationDate),
      }));
    } catch (err) {
      console.error("Error fetching education:", err);
      throw err;
    }
  }

  // Fetch languages
  async function fetchLanguages() {
    try {
      const data = await client.fetch(queries.languages);
      languages.value = data.map((lang: any) => ({
        ...lang,
        icon: processImage(lang.icon),
      }));
    } catch (err) {
      console.error("Error fetching languages:", err);
      throw err;
    }
  }

  // Fetch hobbies
  async function fetchHobbies() {
    try {
      const data = await client.fetch(queries.hobbies);
      hobbies.value = data.map((hobby: any) => ({
        ...hobby,
        icon: processImage(hobby.icon),
      }));
    } catch (err) {
      console.error("Error fetching hobbies:", err);
      throw err;
    }
  }

  // Fetch profile
  async function fetchProfile() {
    try {
      const data = await client.fetch(queries.profile);
      if (data) {
        profile.value = {
          ...data,
          avatar: processImage(data.avatar),
        };
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      throw err;
    }
  }

  return {
    // State
    projects,
    experiences,
    skills,
    education,
    languages,
    hobbies,
    profile,
    isLoading,
    error,

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
});

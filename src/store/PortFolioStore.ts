import { educations, experiences, langs, skills } from "@/projects/viewmodel";
import type {
  Contact,
  Education,
  Experience,
  Language,
  Project,
  Skill,
} from "@/types/Types.ts";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const usePortFolioStore = defineStore("portfolio", () => {
  const workExperiences = ref<Experience[]>([]);
  const contact = ref<Contact>({
    email: "stephenwanjala145@gmail.com",
    phone: "+254723441923",
    linkedin: {
      userName: "Stephen Wanjala",
      link: "https://www.linkedin.com/in/wanjalastephen5/",
    },
    github: {
      userName: "stephenWanjala",
      link: "https://github.com/stephenWanjala",
    },
    twitter: {
      userName: "Wanjalastephen5",
      link: "https://twitter.com/wanjalastephen5",
    },
  });
  const technologies = ref<Skill[]>([]);
  const educationLevels = ref<Education[]>([]);
  const languages = ref<Language[]>([]);
  const isLoading = ref(false);

  // Initialize data
  function initializeStore() {
    try {
      isLoading.value = true;
      workExperiences.value = experiences;
      technologies.value = skills;
      educationLevels.value = educations;
      languages.value = langs;
    } catch (error) {
      console.error('Store initialization error:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // Initialize on store creation
  initializeStore();

  return {
    workExperiences,
    contact,
    technologies,
    educationLevels,
    languages,
    isLoading,
  };
});

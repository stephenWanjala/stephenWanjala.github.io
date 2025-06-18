import {educations, langs} from "@/projects/viewmodel";
import type {Contact, Education, Experience, Language,} from "@/types/Types.ts";
import {defineStore} from "pinia";
import {ref} from "vue";

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
    const educationLevels = ref<Education[]>([]);
    const languages = ref<Language[]>([]);
    const isLoading = ref(false);

    /**
     * Initializes the portfolio store with data.
     *
     * This function assigns imported data to the store's reactive properties. It populates work experiences,
     * technologies, education levels, and languages with the corresponding data arrays. The loading state is
     * set to true at the start and reset to false at the end, ensuring that the state is updated even if an error
     * occurs during initialization. Any errors encountered are logged to the console.
     */
    function initializeStore() {
        try {
            isLoading.value = true;
            educationLevels.value = educations;
            languages.value = langs;
        } catch (error) {
            console.error("Store initialization error:", error);
        } finally {
            isLoading.value = false;
        }
    }

    // Initialize on store creation
    initializeStore();

    return {
        workExperiences,
        contact,
        educationLevels,
        languages,
        isLoading,
    };
});

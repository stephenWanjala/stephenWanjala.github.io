<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortFolioStore } from "@/store/PortFolioStore.ts";

const { technologies } = usePortFolioStore();
const skillsSection = ref<HTMLElement | null>(null);
const loadingIcons = ref<Record<string, boolean>>({});

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  technologies.forEach((skill) => {
    loadingIcons.value[skill.title] = true;

    // Simulated loading delay
    setTimeout(() => {
      loadingIcons.value[skill.title] = false;
    }, 1000);
  });

  if (skillsSection.value) {
    gsap.from(document.querySelectorAll(".skill-item"), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: skillsSection.value?.enterKeyHint,
        start: "top center+=200",
      },
    });
  }
});
</script>

<template>
  <section ref="skillsSection" class="skills-section">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-rocket"></i></span>
      Tech Stack & Frameworks
    </h2>

    <div class="skills-grid">
      <div
        v-for="skill in technologies"
        :key="skill.title"
        class="skill-item"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :class="{ 'skill-card-hover': isHovering }"
            class="skill-card"
            elevation="2"
          >
            <template v-if="loadingIcons[skill.title]">
              <div class="loading-container">
                <v-progress-circular indeterminate color="primary" size="40" />
              </div>
            </template>
            <template v-else>
              <div class="skill-icon">
                <v-icon
                  size="48"
                  :class="`${skill.color} ${isHovering ? 'icon-hover' : ''}`"
                  :icon="skill.icon || 'mdi-code-braces'"
                />
              </div>
              <div class="skill-name">{{ skill.title }}</div>
            </template>
          </v-card>
        </v-hover>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  width: 100%;
  padding: 3rem 0;
}

.section-title {
  color: #111827;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.icon-holder {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.skill-item {
  display: flex;
  justify-content: center;
}

.skill-card {
  width: 100%;
  max-width: 140px;
  height: 140px;
  border-radius: 16px !important;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card-hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1) !important;
  border-color: #667eea;
}

.skill-card-hover::before {
  opacity: 1;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.skill-icon {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-icon {
  transition: all 0.3s ease;
}

.icon-hover {
  transform: scale(1.1);
  color: #667eea !important;
}

.skill-name {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  color: #374151;
  text-align: center;
  margin: 0;
}

@media (max-width: 960px) {
  .skills-section {
    padding: 2rem 0;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.25rem;
    padding: 0 1rem;
  }

  .skill-card {
    max-width: 120px;
    height: 120px;
    padding: 1.25rem;
  }

  .v-icon {
    font-size: 2.5rem !important;
  }

  .skill-name {
    font-size: 0.875rem;
  }
}

@media (max-width: 600px) {
  .skills-section {
    padding: 1.5rem 0;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }

  .skill-card {
    max-width: 100px;
    height: 100px;
    padding: 1rem;
  }

  .v-icon {
    font-size: 2rem !important;
    margin-bottom: 0.75rem;
  }

  .skill-name {
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-card,
  .v-icon {
    transition: none;
  }
}
</style>

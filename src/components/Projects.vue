<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { openLink, type Project } from "@/projects/viewmodel";
import { useProjectStore } from "@/store/projectStore";
import { VSkeletonLoader } from "vuetify/components";

const projectStore = useProjectStore(); // Initialize the Pinia store

const projects = ref<Project[]>([]);

const startString = (project: Project) => {
  return parseInt(project.stars) === 1 ? "1 star" : `${project.stars} stars`;
};

onMounted(async () => {
  // Dispatch an action to fetch the projects
  await projectStore.fetchProjects();
  projects.value = projectStore.projects;
});
</script>

<template>
  <section class="projects-section">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-archive"></i></span>
      Featured Projects
    </h2>

    <!-- Error handling -->
    <v-alert v-if="projectStore.error" type="error" class="mb-4">
      {{ projectStore.error }}
    </v-alert>

    <!-- Loading state -->
    <div v-if="projectStore.isLoading" class="loading-container">
      <VSkeletonLoader type="card" class="mx-auto" width="300" />
    </div>

    <!-- Projects grid -->
    <div v-else class="projects-grid">
      <div
        v-for="project in projects"
        :key="project.gitName"
        class="project-card"
      >
        <!-- Project image -->
        <div class="project-image">
          <VImg
            :alt="project.name"
            :src="project.image"
            :title="project.name"
            cover
            height="220px"
            class="project-img"
          >
            <template v-slot:placeholder>
              <div class="image-placeholder">
                <v-progress-circular
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </VImg>
        </div>

        <!-- Project content -->
        <div class="project-content">
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>

          <!-- Project tags -->
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>

          <!-- Project stats -->
          <div class="project-stats">
            <div class="stat">
              <i class="fas fa-star"></i>
              <span>{{ startString(project) }}</span>
            </div>
            <div class="stat">
              <i class="fas fa-code-branch"></i>
              <span>{{ project.forks }} forks</span>
            </div>
          </div>

          <!-- Contributors -->
          <div class="contributors-section">
            <h4 class="contributors-title">Contributors</h4>
            <div class="contributors-list">
              <div
                v-for="contributor in project.contributors"
                :key="contributor.login"
                class="contributor"
              >
                <VImg
                  :src="contributor.avatar_url"
                  alt="Contributor Avatar"
                  height="32"
                  rounded="circle"
                  width="32"
                  class="contributor-avatar"
                />
                <a
                  :href="contributor.html_url"
                  target="_blank"
                  class="contributor-name"
                >
                  {{ contributor.login }}
                </a>
                <v-badge
                  :content="contributor.contributions"
                  color="primary"
                  floating
                  class="contributor-badge"
                />
              </div>
            </div>
          </div>

          <!-- Action button -->
          <div class="project-actions">
            <VBtn
              class="action-btn"
              variant="outlined"
              @click="openLink(project.webLink ? project.webLink : project.url)"
            >
              <span v-if="project.webLink">Visit Site</span>
              <span v-else>View Code</span>
              <i
                class="ml-2"
                :class="
                  project.webLink ? 'fas fa-external-link-alt' : 'fab fa-github'
                "
              ></i>
            </VBtn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
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
  background: linear-gradient(90deg, var(--color-gradient-start), var(--color-gradient-end));
  border-radius: 2px;
}

.icon-holder {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.18);
}

.loading-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  overflow: hidden;
}

.project-img {
  width: 100%;
  transition: transform 0.3s ease;
}

.project-card:hover .project-img {
  transform: scale(1.05);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f3f4f6;
}

.project-content {
  padding: 2rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.project-description {
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #e5e7eb;
  color: #111827;
}

.project-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.stat i {
  color: var(--color-primary);
  font-size: 1rem;
}

.contributors-section {
  margin-bottom: 1.5rem;
}

.contributors-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.contributors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.contributor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.contributor:hover {
  background: #f3f4f6;
}

.contributor-avatar {
  border: 2px solid #e5e7eb;
}

.contributor-name {
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.contributor-name:hover {
  color: color-mix(in srgb, var(--color-primary) 80%, black 20%);
}

.contributor-badge {
  margin-left: auto;
}

.project-actions {
  display: flex;
  justify-content: center;
}

.action-btn {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 140px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(44, 62, 80, 0.18);
}

.action-btn span {
  display: inline-block;
}

.action-btn i {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .projects-section {
    padding: 2rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.25rem;
  }

  .project-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .contributors-list {
    gap: 0.75rem;
  }
}
</style>

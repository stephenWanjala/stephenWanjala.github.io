<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getImageUrl, openLink, type Project} from '@/projects/viewmodel';
import {useProjectStore} from '@/store/projectStore';

const projectStore = useProjectStore(); // Initialize the Pinia store


const projects = ref<Project[]>([]);


const startString = (project: Project) => {
  return parseInt(project.stars) === 1 ? '1 star' : `${project.stars} stars`;
}

onMounted(async () => {
  // Dispatch an action to fetch the projects
  await projectStore.fetchProjects();
  projects.value = projectStore.projects;
});
</script>


<template>
  <div class="container mt-4">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-archive"></i></span>
      Projects
    </h2>
    <v-progress-linear v-if="projectStore.isLoading" indeterminate/>
    <div class="row">
      <div class="card-container">
        <div v-for="project in projects" :key="project.gitName" class="card">
          <!-- Card content -->
          <VImg
              :src="getImageUrl(project.image)"
              class="card-img-top img-fluid"
              cover
              :alt="project.name"
              title="{{ project.name }}"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </VImg>
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
              <div class=" row">
                <!-- Tags and Contributors -->
                <div class="tags-and-contributors">
                  <VCard class="tags">
                    <strong>Tags:</strong>
                    <ul>
                      <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
                    </ul>
                  </VCard>

                  <!-- Contributors -->
                  <VCard class="contributors">
                    <strong>Contributors:</strong>
                    <div class="row align-items-center">
                      <ul class=" d-flex flex-wrap p-3">
                        <li v-for="contributor in project.contributors" :key="contributor.login"
                            class="col p-2 d-flex gap-1 text-center v-list-item--border ">
                          <div class="d-flex text-center gap-2">
                            <VImg rounded="circle" width="24" height="24" :src="contributor.avatar_url"
                                  alt="Contributor Avatar"/>
                            <a :href="contributor.html_url" target="_blank" class="text-center">{{
                                contributor.login
                              }}</a>
                            <v-badge :content="contributor.contributions"
                                     floating
                                     color="info"
                                     class="text-center mt-4 mr-3"
                            />
                          </div>
                        </li>
                      </ul>

                    </div>
                  </VCard>
                </div>
              </div>


            <div class="d-flex justify-content-between align-items-center mt-3">
              <p class="m-2 font-lg">{{ startString(project) }}</p>
              <p class="m-2 font-lg">{{ project.forks }} forks</p>

              <VBtn class="btn btn-outline-secondary" @click="openLink(project.url)"
                    variant="outlined">
                Source <i class="bi bi-github ml-2"></i>
              </VBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Default styles for larger screens */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.tags-and-contributors {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.tags,
.contributors {
  padding: 10px;
  border-radius: 8px;
  background-color: #f0f0f0;
  width: 100%;
}

.tags ul, .contributors ul {
  margin: 1px;
  padding: 2px;
  list-style: circle inside;

}

.contributors {
  align-self: start;
}


/* Media query for smaller and medium screens */
@media (max-width: 992px) {
  .card-container {
    grid-template-columns: 1fr; /* Single column layout on smaller screens */
  }

  .tags-and-contributors {
    flex-direction: column; /* Full width for tags and contributors on smaller screens */
  }

  .tags,
  .contributors {
    width: 100%; /* Tags and contributors span full width on smaller screens */
  }
}
</style>

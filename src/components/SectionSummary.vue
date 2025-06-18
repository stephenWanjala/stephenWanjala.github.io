<script setup lang="ts">
import { onMounted } from "vue";
import { useProfile } from "@/composables/useSanity";

const { profile, isLoading, error, fetchProfile } = useProfile();

onMounted(async () => {
  // Fetch profile from Sanity using Vue composable
  await fetchProfile();
});
</script>

<template>
  <section class="summary-section">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-user"></i></span>
      Career Profile
    </h2>

    <!-- Error handling -->
    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Loading state -->
    <div v-if="isLoading" class="d-flex justify-center my-4">
      <v-progress-circular indeterminate color="primary" size="40" />
    </div>

    <div v-else-if="profile" class="summary">
      <div class="profile-header">
        <div class="profile-info">
          <h3>{{ profile.name }}</h3>
          <p class="title">{{ profile.title }}</p>
        </div>
        <div v-if="profile.avatar" class="profile-avatar">
          <v-img
            :src="profile.avatar"
            :alt="profile.name"
            width="80"
            height="80"
            rounded="circle"
            cover
          />
        </div>
      </div>

      <div class="summary-content">
        <p class="summary-text">{{ profile.summary }}</p>
      </div>

      <!-- Social links -->
      <div
        v-if="profile.socials && profile.socials.length > 0"
        class="social-links"
      >
        <h4>Connect with me:</h4>
        <div class="social-icons">
          <a
            v-for="social in profile.socials"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <i :class="social.icon"></i>
            <span>{{ social.platform }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Fallback content if no profile data -->
    <div v-else class="summary">
      <ul>
        <li>Mobile app developer experienced with Jetpack Compose.</li>
        <li>
          Backend development skills in Kotlin Ktor,fastify and Python Django.
        </li>
        <li>Web development experience with Vue.js and Next.js.</li>
        <li>Passionate about learning and creative problem-solving in tech.</li>
        <li>Seeking opportunities to contribute to innovative projects.</li>
        <li>Interested in collaborative tech roles.</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.summary-section {
  width: 100%;
  padding: 2rem 0;
}

.section-title {
  color: #2d3748;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e2e8f0;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
}

.icon-holder {
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.profile-info h3 {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info .title {
  margin: 0.5rem 0 0 0;
  color: #4a5568;
  font-size: 1.1rem;
}

.summary-content {
  margin-bottom: 1.5rem;
}

.summary-text {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.social-links h4 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-decoration: none;
  color: #4a5568;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #edf2f7;
  border-color: #3498db;
  color: #3498db;
}

.social-link i {
  font-size: 1.2rem;
}

.summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.summary li {
  position: relative;
  padding-left: 2rem;
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
}

.summary li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #3498db;
  font-weight: bold;
}

@media (max-width: 768px) {
  .summary-section {
    padding: 1.5rem 1rem;
  }

  .summary {
    padding: 1.5rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .social-icons {
    justify-content: center;
  }

  .summary li {
    font-size: 1rem;
    padding-left: 1.5rem;
  }
}
</style>

<script lang="ts" setup>
import { useProfile } from "@/composables/useSanity";

const { profile, isLoading, error, fetchProfile } = useProfile();
</script>

<template>
  <div class="contact-container container-block">
    <h2 class="container-block-title">
      <i class="fas fa-address-book title-icon"></i>
      Contact Information
    </h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <v-progress-circular indeterminate color="white" size="30" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
    </div>

    <!-- Social links from profile -->
    <ul v-else-if="profile && profile.socials && profile.socials.length > 0" class="contact-list">
      <li v-for="social in profile.socials" :key="social.platform" class="contact-item">
        <a
          :href="social.url"
          target="_blank"
          class="contact-link"
        >
          <i :class="social.icon"></i>
          <span class="contact-text">{{ social.platform }}</span>
        </a>
      </li>
      
      <!-- Email contact (hardcoded since it's not in profile.socials) -->
      <li class="contact-item">
        <a
          href="mailto:stephenwanjala145@gmail.com"
          target="_blank"
          class="contact-link"
        >
          <i class="fa-solid fa-envelope"></i>
          <span class="contact-text">stephenwanjala145@gmail.com</span>
        </a>
      </li>
    </ul>

    <!-- Fallback to original content if no profile data -->
    <ul v-else class="contact-list">
      <li class="contact-item">
        <a
          href="mailto:stephenwanjala145@gmail.com"
          target="_blank"
          class="contact-link"
        >
          <i class="fa-solid fa-envelope"></i>
          <span class="contact-text">stephenwanjala145@gmail.com</span>
        </a>
      </li>

      <li class="contact-item">
        <a href="https://www.linkedin.com/in/wanjalastephen5/" target="_blank" class="contact-link">
          <i class="fa-brands fa-linkedin-in"></i>
          <span class="contact-text">Stephen Wanjala</span>
        </a>
      </li>

      <li class="contact-item">
        <a href="https://github.com/stephenWanjala" target="_blank" class="contact-link">
          <i class="fa-brands fa-github"></i>
          <span class="contact-text">stephenWanjala</span>
        </a>
      </li>

      <li class="contact-item">
        <a href="https://twitter.com/wanjalastephen5" target="_blank" class="contact-link">
          <i class="fa-brands fa-x-twitter"></i>
          <span class="contact-text">Wanjalastephen5</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contact-container {
  margin-bottom: 2rem;
}

.container-block-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

.title-icon {
  font-size: 1.1rem;
  opacity: 0.9;
}

.loading-container, .error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.error-message {
  color: #ff5252;
  font-size: 0.9rem;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  text-decoration: none;
}

.contact-link i {
  width: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
}

.contact-text {
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .contact-item:hover {
    transform: none;
  }

  .contact-link {
    padding: 0.75rem;
  }
}
</style>
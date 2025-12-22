<script setup lang="ts">
import { ref, onMounted } from "vue";
import Socials from "@/components/Socials.vue";
import Education from "@/components/Education.vue";
import Languages from "@/components/Languages.vue";
import Hobbies from "@/components/Hobbies.vue";

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <aside class="sidebar-wrapper" :class="{ visible: isVisible }">
    <div class="profile-container">
      <div class="image-wrapper">
        <VImg
          alt="profile image"
          class="profile"
          src="/images/profile.jpg"
          width="200px"
          height="200px"
          rounded="circle"
          contain
          loading="lazy"
          :transition="'scale-transition'"
        />
      </div>
      <h1 class="name">Wanjala Stephen</h1>
      <h3 class="tagline">Software Developer</h3>
      <p class="bio">
        Passionate about creating innovative solutions with modern technologies
      </p>

      <div class="profile-actions">
        <a
          href="mailto:stephenwanjala145@gmail.com"
          class="action-button primary"
        >
          <i class="fas fa-envelope"></i> Contact Me
        </a>
        <a href="/resume.pdf" target="_blank" class="action-button secondary">
          <i class="fas fa-download"></i> Download CV
        </a>
      </div>
    </div>

    <div class="sidebar-content">
      <Socials />
      <Education />
      <Languages />
      <Hobbies />
    </div>
  </aside>
</template>

<style scoped>
.sidebar-wrapper {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-wrapper.visible {
  opacity: 1;
  transform: translateX(0);
}

.profile-container {
  padding: 3rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.image-wrapper {
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.image-wrapper::after {
  content: "";
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  z-index: -1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

.profile {
  border: 4px solid rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.profile:hover {
  transform: scale(1.05);
}

.name {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.025em;
}

.tagline {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.bio {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}

.action-button {
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.action-button.primary {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-button.primary:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.sidebar-content {
  padding: 2rem;
}

@media (max-width: 768px) {
  .sidebar-wrapper {
    transform: none;
    opacity: 1;
  }

  .profile-container {
    padding: 2rem 1.5rem;
  }

  .name {
    font-size: 2rem;
  }

  .tagline {
    font-size: 1.1rem;
  }

  .bio {
    font-size: 0.95rem;
    max-width: 100%;
  }

  .action-button {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style>

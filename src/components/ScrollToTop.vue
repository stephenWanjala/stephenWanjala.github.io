<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const isVisible = ref(false);

const scrollToTop = () => {
  const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
  ).matches;
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, {passive: true});
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Transition name="scroll-button">
    <button
        v-if="isVisible"
        @click="scrollToTop"
        class="scroll-to-top"
        aria-label="Scroll to top"
        type="button"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.18);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0.9;
}

.scroll-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(44, 62, 80, 0.24);
  opacity: 1;
}

.scroll-to-top:active {
  transform: translateY(-1px);
}

.scroll-to-top i {
  transition: transform 0.3s ease;
}

.scroll-to-top:hover i {
  transform: translateY(-2px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .scroll-to-top {
    transition: none;
  }

  .scroll-to-top:hover i {
    transform: none;
  }
}
</style>

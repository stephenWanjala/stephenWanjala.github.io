<script setup lang="ts">
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-text">
        <i class="fas fa-heart heart-icon" aria-hidden="true"></i>
        <span class="copyright">
          © {{ currentYear }} Wanjala Stephen. All rights reserved.
        </span>
      </div>
      <div class="footer-links">
        <a href="mailto:stephenwanjala145@gmail.com" class="footer-link">
          <i class="fas fa-envelope"></i>
          Contact
        </a>
        <a href="https://github.com/stephenWanjala" target="_blank"  rel="noopener" class="footer-link">
          <i class="fab fa-github"></i>
          GitHub
        </a>
        <a href="https://linkedin.com/in/stephen-wanjala" target="_blank"  rel="noopener" class="footer-link">
          <i class="fab fa-linkedin"></i>
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.heart-icon {
  color: #ef4444;
  animation: heartbeat 2s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.copyright {
  font-weight: 500;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
}

.footer-link:hover {
  color: #667eea;
  background: #f3f4f6;
  transform: translateY(-1px);
}

.footer-link i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 0;
    margin-top: 2rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .footer-links {
    gap: 1rem;
  }

  .footer-link {
    font-size: 0.875rem;
    padding: 0.5rem;
  }
}
</style>

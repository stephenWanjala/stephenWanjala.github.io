<template>
  <section class="summary-section">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-user"></i></span>
      Career Profile
    </h2>
    <div class="summary">
      <ul>
        <li>
          Software Developer with a strong foundation in mobile app development
          using Jetpack Compose.
        </li>
        <li>
          Proficient in Python Django &#38; Kotlin Ktor for backend development
        </li>
        <li>
          Skilled in crafting dynamic web interfaces with Vue.js &amp; NextJs.
        </li>
        <li>
          Committed to continuous learning, innovation, and creative
          problem-solving.
        </li>
        <li>
          Eager to contribute to impactful projects that leverage cutting-edge
          technologies.
        </li>
        <li>Open to collaborative opportunities in Tech</li>
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
  content: '';
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
  content: '→';
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

  .summary li {
    font-size: 1rem;
    padding-left: 1.5rem;
  }
}
</style>

<template>
  <section class="summary-section">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-user" aria-hidden="true"></i></span>
      Career Profile
    </h2>
    <div class="summary">
      <div class="summary-content">
        <p class="summary-intro">
          Experienced software developer with expertise in mobile, web, and backend development. 
          Passionate about creating innovative solutions and continuously learning new technologies.
        </p>
        <ul class="summary-points">
          <li>Mobile app developer experienced with Jetpack Compose</li>
          <li>Backend development skills in Kotlin Ktor, Fastify and Python Django</li>
          <li>Web development experience with Vue.js and Next.js</li>
          <li>Passionate about learning and creative problem-solving in tech</li>
          <li>Seeking opportunities to contribute to innovative projects</li>
          <li>Interested in collaborative tech roles</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary-section {
  width: 100%;
  padding: 3rem 0;
}

.section-title {
  color: #111827;
  margin-bottom: 2.5rem;
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

.summary {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.summary:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.summary-content {
  max-width: 800px;
}

.summary-intro {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
  margin: 0 0 2rem 0;
  font-weight: 500;
}

.summary-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.25rem;
}

.summary-points li {
  position: relative;
  padding-left: 2.5rem;
  color: #4b5563;
  font-size: 1.05rem;
  line-height: 1.6;
  transition: color 0.2s ease;
}

.summary-points li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 1.2rem;
  background: #ecfdf5;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.summary-points li:hover {
  color: #111827;
}

@media (max-width: 768px) {
  .summary-section {
    padding: 2rem 0;
  }

  .summary {
    padding: 2rem;
    margin: 0 1rem;
  }

  .summary-intro {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .summary-points li {
    font-size: 1rem;
    padding-left: 2rem;
  }

  .summary-points li::before {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
}
</style>

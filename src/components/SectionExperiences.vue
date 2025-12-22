<script setup lang="ts">
import { usePortFolioStore } from "@/store/PortFolioStore";
import { computed, ref, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import gsap from "gsap";
import { VSkeletonLoader } from "vuetify/components";

const portFolioStore = usePortFolioStore();
const sectionRef = ref<HTMLElement | null>(null);

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

const calculateTimeSince = (start: Date, end: Date): string => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );

  let timeSince = "";
  if (diffYears > 0) {
    timeSince += `${diffYears} yr${diffYears > 1 ? "s" : ""}`;
  }
  if (diffMonths > 0) {
    timeSince += timeSince ? " " : "";
    timeSince += `${diffMonths} mo${diffMonths > 1 ? "s" : ""}`;
  }
  return timeSince || " 1 month";
};

const currentDate = computed(() => new Date());

const formatTimeRange = (
  start: Date,
  end?: Date,
  current?: boolean,
): string => {
  const startDate = new Date(start);
  const endDate = current
    ? currentDate.value
    : end
      ? new Date(end)
      : currentDate.value;

  const formattedStart = formatDate(startDate);
  const formattedEnd = current ? "Present" : formatDate(endDate);
  const timeSince = calculateTimeSince(startDate, endDate);

  return `${formattedStart} - ${formattedEnd} · ${timeSince}`;
};

onMounted(() => {
  if (!sectionRef.value) return;

  const { stop } = useIntersectionObserver(
      sectionRef.value,
      ([entry]) => {
        if (entry?.isIntersecting) {
          animateExperiences();
          stop();
        }
      },
      { threshold: 0.2 },
  );
});


const animateExperiences = () => {
  gsap.from(".experience-item", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power2.out",
  });
};
</script>

<template>
  <section ref="sectionRef" class="experience-section">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fas fa-briefcase"></i></span>
      Professional Experience
    </h2>

    <div v-if="portFolioStore.isLoading" class="loading-container">
      <VSkeletonLoader type="card" />
    </div>

    <div v-else class="timeline">
      <div
        v-for="experience in portFolioStore.workExperiences"
        :key="experience.company"
        class="experience-item"
      >
        <div class="timeline-dot"></div>
        <div class="experience-card">
          <div class="company-header">
            <div class="logo-container">
              <VImg
                v-if="experience.logo"
                :src="experience.logo"
                :alt="experience.company"
                class="company-logo"
              />
              <div v-else class="logo-placeholder">
                {{ experience.company.charAt(0) }}
              </div>
            </div>
            <div class="company-info">
              <h3 class="company-name">
                <a
                  :href="experience.companyLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ experience.company }}
                </a>
              </h3>
            </div>
          </div>

          <div class="roles-container">
            <div
              v-for="role in experience.roles"
              :key="role.jobTitle"
              class="role"
            >
              <div class="role-header">
                <h4 class="role-title">{{ role.jobTitle }}</h4>
                <span class="duration">
                  {{
                    formatTimeRange(
                      role.time.start,
                      role.time.end,
                      role.time.current,
                    )
                  }}
                </span>
              </div>
              <ul class="achievements">
                <li v-for="detail in role.details" :key="detail">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

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

.loading-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.timeline {
  position: relative;
  padding-left: 2.5rem;
  max-width: 900px;


  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #667eea, #764ba2);
    border-radius: 1px;
  }
}

.experience-item {
  position: relative;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: -2.9rem;
    top: 1.5rem;
    width: 1.2rem;
    height: 1.2rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    transition: transform 0.3s ease;
  }

  &:hover .timeline-dot {
    transform: scale(1.2);
  }
}

.experience-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
}

.company-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.logo-container {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #f9fafb;

  .company-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .logo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
  }
}

.company-info {
  .company-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #111827;

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #667eea;
      }
    }
  }
}

.roles-container {
  .role {
    padding: 1.5rem 0;
    border-top: 1px solid #e5e7eb;

    &:first-child {
      padding-top: 0;
      border-top: none;
    }
  }
}

.role-header {
  margin-bottom: 1.5rem;

  .role-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.75rem 0;
  }

  .duration {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    display: inline-block;
  }
}

.achievements {
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
    color: #4b5563;
    font-size: 1rem;
    line-height: 1.6;

    &::before {
      content: "•";
      position: absolute;
      left: 0.5rem;
      color: #667eea;
      font-size: 1.5rem;
      font-weight: bold;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 768px) {
  .experience-section {
    padding: 2rem 0;
  }

  .timeline {
    padding-left: 2rem;
  }

  .experience-item .timeline-dot {
    left: -2.4rem;
    width: 1rem;
    height: 1rem;
  }

  .company-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .logo-container {
    width: 3rem;
    height: 3rem;
  }

  .company-info .company-name {
    font-size: 1.25rem;
  }

  .experience-card {
    padding: 1.5rem;
  }

  .role-header .role-title {
    font-size: 1.125rem;
  }
}
</style>

<script setup lang="ts">
import SectionSkills from "@/components/SectionSkills.vue";
import SideBarVue from "@/components/SideBar.vue";
import SectionSummary from "@/components/SectionSummary.vue";
import SectionExperiences from "@/components/SectionExperiences.vue";
import Projects from "@/components/Projects.vue";
import FooterVue from "@/components/FooterVue.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
</script>

<template>
  <div class="wrapper mt-lg-5">
    <SideBarVue />
    <div class="main-wrapper">
      <SectionSummary />

      <SectionExperiences />
      <Projects />

      <SectionSkills />
      <FooterVue />
    </div>
    <ScrollToTop />
  </div>
</template>

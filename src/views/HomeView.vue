<script setup lang="ts">
import SectionSkills from "@/components/SectionSkills.vue";
import SideBarVue from "@/components/SideBar.vue";
import SectionSummary from "@/components/SectionSummary.vue";
import SectionExperiences from "@/components/SectionExperiences.vue";
import Projects from "@/components/Projects.vue";
import FooterVue from "@/components/FooterVue.vue";
</script>
<template>
  <div class="bg-[#42a8c0] relative shadow-md shadow-black/10 mt-lg-5">
    <SideBarVue />
    <div class="main-wrapper">
      <SectionSummary />

      <SectionExperiences />
      <Projects />

      <SectionSkills />
      <FooterVue />
    </div>
  </div>
</template>

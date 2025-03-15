<script lang="ts" setup>
import { usePortFolioStore } from "@/store/PortFolioStore";

const { educationLevels } = usePortFolioStore();
</script>

<template>
  <div class="education-container container-block">
    <h2 class="container-block-title">Education</h2>

    <div
      class="item"
      v-for="education in educationLevels"
      :key="education.degree"
    >
      <h4 class="degree">{{ education.degree }}</h4>
      <h5 class="meta">{{ education.school }}</h5>
      <div class="time">{{ education.duration }}</div>
    </div>
  </div>
</template>

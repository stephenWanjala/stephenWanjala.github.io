<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import { useSanity } from "@/composables/useSanity";

const { fetchAllData } = useSanity();

onMounted(async () => {
  // Fetch all data from Sanity using Vue composable
  await fetchAllData();
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

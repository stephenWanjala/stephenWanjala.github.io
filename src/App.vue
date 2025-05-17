<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="bg-[#42a8c0] relative shadow-md shadow-black/10">
      <nav>
        <RouterLink to="/" />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts" setup>
import type { Patient } from "@prisma/client";

const { data: rooms } = await useFetch<{ roomNr: string; patient?: Patient }[]>("/api/floormap");
</script>

<template>
  <div class="container mt-5 pt-2">
    <div class="mx-auto responsive-width" style="height: 70vh; width: 90vw">
      <MapComponent :rooms />
    </div>
  </div>
</template>

<style scoped>
.responsive-width {
  max-width: 75%;
}

@media only screen and (max-width: 768px) {
  .responsive-width {
    max-width: 100%;
  }
}
</style>

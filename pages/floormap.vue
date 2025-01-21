<script lang="ts" setup>
import type { Patient } from "@prisma/client";

definePageMeta({
  title: "Kamers",
});

const { data: rooms } = await useFetch<{ roomNr: string; patient?: Patient }[]>("/api/floormap");
</script>

<template>
  <div class="container mt-5 pt-2">
    <div class="mx-auto responsive-width" style="height: 70vh; width: 90vw">
      <MapComponent :rooms />
    </div>
    <div class="mt-3">
      <p>Kleur Legenda:</p>
      <div class="d-flex flex-wrap gap-3">
        <div class="d-flex align-items-center gap-2">
          <div class="bg-primary-subtle border border-dark" style="width: 20px; height: 20px;"></div>
          <span style="padding-right: 9px;">Kamer in gebruik</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="bg-secondary-subtle border border-dark" style="width: 20px; height: 20px;"></div>
          <span>Kamer leeg</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="bg-primary border border-dark" style="width: 20px; height: 20px;"></div>
          <span>Zelfde ziektebeeld</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="bg-danger border border-dark" style="width: 20px; height: 20px;"></div>
          <span>Ander ziektebeeld</span>
        </div>
      </div>
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

<script setup lang="ts">
const { getSession, data } = useAuth();

const session = await getSession();
</script>

<template>
  <div class="page-container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 20rem">
      <h2 class="text-center mb-1">Welkom,</h2>
      <h5 class="text-center">{{ session?.user?.firstName }}</h5>
      <div class="mb-3">
        <NuxtLink to="/addPatients" class="start-button btn btn-primary w-100 mt-4">Start dienst</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
  /* .page-container {
    background-color: #ecf0f1;
  }

  .start-button {
    background-color: #50a399;
    color: white;
  } */
</style>

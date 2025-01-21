<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --bs-body-bg: #ecf0f1;
  --bs-primary-rgb: 80, 163, 153;
}

.bg-primary {
  background-color: #50a399 !important;
}

.btn-primary {
  --bs-btn-bg: #50a399;
  --bs-btn-hover-bg: #4a988e;
  --bs-btn-hover-border-color: #4a988e;
  --bs-btn-active-bg: #4a988e;
  --bs-btn-active-border-color: #4a988e;
  --bs-btn-border-color: #50a399;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(80, 163, 153, 0.25);
  border-color: #50a399;
}
</style>

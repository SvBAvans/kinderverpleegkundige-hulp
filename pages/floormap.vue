<script lang="ts" setup>
const logClick = (room: string) => {
  console.log("Clicked room: " + room);
};

const rooms = ["1", "2", "3", "4", "5", "6", "7", "8", "neo-1", "neo-2"];
</script>

<template>
  <div class="container mt-5 pt-2">
    <div class="mx-auto responsive-width" style="height: 70vh; width: 90vw">
      <MapComponent @room-click="logClick" :rooms />
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

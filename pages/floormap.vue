<script lang="ts" setup>
const logClick = (room: string) => {
  console.log("Clicked room: " + room);
};

//TODO: Dit is test data
const rooms = [
  { roomNr: "1", patient: { firstName: "John", lastName: "Doe", diseaseProfile: "Tintelende tenen" } },
  { roomNr: "2" },
  { roomNr: "3" },
  { roomNr: "4" },
  { roomNr: "5" },
  { roomNr: "6" },
  { roomNr: "7" },
  { roomNr: "8" },
  { roomNr: "neo-1" },
  { roomNr: "neo-2" },
];
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

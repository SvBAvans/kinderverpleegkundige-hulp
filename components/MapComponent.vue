<script lang="ts" setup>
import type { Patient } from "@prisma/client";

const props = defineProps<{ rooms: { roomNr: string; patient?: Patient }[] }>();

const emit = defineEmits<{
  (e: "roomClick", room: string): void;
}>();

useHead({
  script: [
    {
      innerHTML: "const popoverTriggerList = document.querySelectorAll('[data-bs-toggle=\"popover\"]'); const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));",
      tagPosition: "bodyClose",
    },
  ],
});
</script>

<template>
  <div class="row h-100 pt-3">
    <template v-for="(room, index) in props.rooms">
      <a
        class="text-decoration-none text-reset col-4 border d-flex align-items-center border-black"
        :class="{ 'justify-content-end': index % 2 == 0, 'bg-primary-subtle': room.patient != null, 'bg-secondary-subtle': room.patient == null }"
        @click="emit('roomClick', room.roomNr)"
        data-bs-toggle="popover"
        data-bs-placement="top"
        data-bs-trigger="focus"
        :data-bs-title="room.patient ? `${room.patient.firstName} ${room.patient.lastName}` : ` `"
        :data-bs-content="room.patient ? room.patient.diseaseProfile : 'Empty'"
        tabindex="0"
      >
        {{ room.roomNr }}
      </a>

      <div v-if="index % 2 == 0 && rooms.length >= index + 2" class="col-4" :class="{ 'border-top border-black': rooms.length < index + 3 }"></div>
    </template>
  </div>
</template>

<style scoped></style>

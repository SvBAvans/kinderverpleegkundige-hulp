<script lang="ts" setup>
import type { Patient } from "@prisma/client";
import TooltipContentComponent from "./TooltipContentComponent.vue";

const props = defineProps<{ rooms: { roomNr: string; patient?: Patient }[] }>();

const emit = defineEmits<{
  (e: "roomClick", room: string): void;
}>();

import { ref, onMounted, onBeforeUnmount } from "vue";
let popoverInstances: bootstrap.Popover[] = [];

// Reactive state for toggling
const toggleState = ref(false);

// Function to handle button click inside the popover
const handleInnerButtonClick = () => {
  toggleState.value = !toggleState.value;
  console.log("Inner button clicked! Toggle state:", toggleState.value);
};

// Initialize popovers and attach event listeners
const initializePopovers = () => {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverInstances = [...popoverTriggerList].map((triggerEl) => {
    const popover = new bootstrap.Popover(triggerEl, {
      html: true,
      trigger: "focus",
      sanitize: false,
    });

    triggerEl.addEventListener("shown.bs.popover", () => {
      // Access the popover element
      const popoverContent = document.body.querySelector(".popover");
      if (popoverContent) {
        const innerButton = popoverContent.querySelector(".inner-button");
        if (innerButton) {
          innerButton.removeEventListener("click", handleInnerButtonClick); // Avoid duplicate listeners
          innerButton.addEventListener("click", handleInnerButtonClick);
        }
      }
    });

    return popover;
  });
};

// Clean up popovers
const destroyPopovers = () => {
  popoverInstances.forEach((popover) => popover.dispose());
  popoverInstances = [];
};

// Initialize and clean up popovers in lifecycle hooks
onMounted(() => {
  initializePopovers();
});

onBeforeUnmount(() => {
  destroyPopovers();
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
        data-bs-trigger="focus"
        :data-bs-title="room.patient ? `${room.patient.firstName} ${room.patient.lastName}` : ` `"
        :data-bs-content="room.patient ? `<div><button class='btn btn-success inner-button btn-sm'>Inner Button</button></div>` : 'Empty'"
        tabindex="0"
      >
        {{ room.roomNr }}
      </a>

      <div v-if="index % 2 == 0 && props.rooms.length >= index + 2" class="col-4" :class="{ 'border-top border-black': props.rooms.length < index + 3 }"></div>
    </template>
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
import type { Patient } from "@prisma/client";

const props = defineProps<{ rooms: { roomNr: string; patient?: Patient }[] }>();

const emit = defineEmits<{
  (e: "roomClick", room: string): void;
}>();

// @ts-expect-error bootstrap is available in the browser.
let popoverInstances: Record<string, bootstrap.Popover> = {};

const isCompareActive = ref(false);
const compareResults = reactive<Record<string, boolean>>({});

const handleInnerButtonClick = (roomNr: string) => {
  if (isCompareActive.value) {
    isCompareActive.value = !isCompareActive.value;
    updatePopoverContent();
    return;
  }

  const room = props.rooms.find((room) => room.roomNr == roomNr);
  if (!room) return;

  const disease = room.patient?.diseaseProfile;

  const results = props.rooms.map((room) => {
    room.match = room.patient?.diseaseProfile == disease;
    return room;
  });
  const tempResult: any = {};
  results.forEach((res) => {
    compareResults[res.roomNr] = res.match;
  });

  isCompareActive.value = !isCompareActive.value;

  updatePopoverContent();
};

const updatePopoverContent = () => {
  props.rooms.forEach((room) => {
    const popover = popoverInstances[room.roomNr];
    if (popover) {
      const newContent = room.patient
        ? `<div>${room.patient.diseaseProfile}<br/><button class='btn btn-primary inner-button btn-sm mt-3 w-100' data-roomNr='${room.roomNr}'>${isCompareActive.value ? "Stop vergelijking" : "Vergelijk"}</button></div>`
        : "Empty";
      popover._config.content = newContent;
    }
  });
};

const initializePopovers = () => {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTriggerList.forEach((triggerEl) => {
    const roomNr = triggerEl.getAttribute("data-roomNr") as string;
    if (!roomNr) return;
    // @ts-expect-error bootstrap is available in the browser.
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
          innerButton.removeEventListener("click", handleInnerButtonClick);
          innerButton.addEventListener("click", () => handleInnerButtonClick(innerButton.getAttribute("data-roomNr") as string));
        }
      }
    });

    popoverInstances[roomNr] = popover;
  });
};

const destroyPopovers = () => {
  popoverInstances.forEach((popover) => popover.dispose());
  popoverInstances = [];
};

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
        :class="[
          {
            'justify-content-end': index % 2 == 0,
            'bg-primary-subtle': room.patient != null && !isCompareActive,
            'bg-secondary-subtle': room.patient == null,
            'bg-primary': isCompareActive && compareResults[room.roomNr],
            'bg-danger': isCompareActive && !compareResults[room.roomNr],
          },
        ]"
        @click="emit('roomClick', room.roomNr)"
        data-bs-toggle="popover"
        data-bs-trigger="focus"
        :data-roomNr="room.roomNr"
        :data-bs-title="room.patient ? `${room.patient.firstName} ${room.patient.lastName}` : ` `"
        :data-bs-content="
          room.patient
            ? `<div class='popover-content'>${room.patient.diseaseProfile}<br/><button class='btn btn-primary inner-button btn-sm mt-3 w-100' data-roomNr='${room.roomNr}'>${isCompareActive ? 'Stop vergelijking' : 'Vergelijk'}</button></div>`
            : 'Empty'
        "
        data-bs-custom-class="custom-popover"
        tabindex="0"
      >
        {{ room.roomNr }}
      </a>

      <div v-if="index % 2 == 0 && props.rooms.length >= index + 2" class="col-4" :class="{ 'border-top border-black': props.rooms.length < index + 3 }"></div>
    </template>
  </div>
</template>

<style>
  .custom-popover {
    min-width: 200px;
    word-wrap: break-word;
    white-space: normal;
  }

  .popover-content {
    display: block;
  }
</style>

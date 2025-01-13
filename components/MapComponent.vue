<script lang="ts" setup>
const props = defineProps<{ rooms: string[] }>();

const emit = defineEmits<{
  (e: "roomClick", room: string): void;
}>();
</script>

<template>
  <div class="row h-100 pt-3">
    <template v-for="(room, index) in props.rooms">
      <div class="col-4 border d-flex align-items-center border-black" :class="{ 'justify-content-end': index % 2 == 0 }" @click="emit('roomClick', room)">{{ room }}</div>

      <div v-if="index % 2 == 0 && rooms.length >= index + 2" class="col-4" :class="{ 'border-top border-black': rooms.length < index + 3 }"></div>
    </template>
  </div>
</template>

<style></style>

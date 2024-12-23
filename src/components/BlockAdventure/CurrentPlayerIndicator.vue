<script setup lang="ts">
import { Player } from 'types/blockAdventure/types';

withDefaults(
  defineProps<{
    modelValue: Player;
    offset: number;
    size?: number;
  }>(),
  {
    size: 145,
  },
);
</script>

<template>
  <q-icon
    class="q-ma-sm"
    name="mdi-arrow-up-bold"
    color="green"
    size="md"
    style="transition: all 0.25s ease-in-out; z-index: 100"
    :style="{
      left: `${modelValue.x * size + offset}px`,
      top: `${30 + modelValue.y * size}px`,
    }"
  />
</template>

<style scoped></style>

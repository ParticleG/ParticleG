<script setup lang="ts">
import { Player } from 'types/blockAdventure/types';
import { onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: Player;
    active: boolean;
    offset: number;
    size?: number;
  }>(),
  {
    size: 145,
  },
);

const animate = ref(true);
const animationInterval = ref<NodeJS.Timeout>();

onMounted(() => {
  animationInterval.value = setInterval(() => {
    if (!props.active) {
      animate.value = true;
      return;
    }
    animate.value = !animate.value;
  }, 2500);
});

onUnmounted(() => {
  clearInterval(animationInterval.value);
});
</script>

<template>
  <div
    class="q-ma-sm"
    :class="{ animate_avatar: active && animate }"
    style="
      border: 2px solid var(--q-primary);
      border-radius: 50%;
      transition: all 0.25s ease-in-out;
      z-index: 100;
    "
    :style="{
      left: `${modelValue.x * size + offset}px`,
      top: `${modelValue.y * size}px`,
      zIndex: active ? 100 : 1,
    }"
  >
    <q-avatar size="30px">
      <img :src="modelValue.avatar" :alt="`Player ${modelValue.id}`" />
    </q-avatar>
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      transition-hide="jump-down"
      transition-show="jump-up"
    >
      [P{{ modelValue.id }}] {{ modelValue.name }}
    </q-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.animate_avatar {
  animation: bounce 1s 1;
}
</style>

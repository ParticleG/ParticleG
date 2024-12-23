<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { Reactive } from 'vue';

import { BlockAdventure } from 'types/blockAdventure';

withDefaults(
  defineProps<{
    modelValue: Reactive<BlockAdventure>;
    size?: number;
  }>(),
  {
    size: 145,
  },
);
</script>

<template>
  <q-scroll-area class="full-width relative-position" style="height: 80vh">
    <q-card
      v-for="(blockInfo, blockIndex) in modelValue.map"
      :key="blockIndex"
      class="row justify-center items-center absolute q-pa-lg"
      bordered
      flat
      style="border-width: 2px"
      :style="{
        left: `${blockInfo.x * size}px`,
        top: `${blockInfo.y * size}px`,
        height: `${size}px`,
        width: `${size}px`,
      }"
    >
      <div>
        {{ blockInfo.label }}
      </div>
      <div class="absolute-bottom-left">No.{{ blockIndex }}</div>
      <div
        v-if="blockInfo.direction"
        class="flex flex-center"
        :class="{
          'absolute-top': blockInfo.direction === 'up',
          'absolute-bottom': blockInfo.direction === 'down',
          'absolute-left': blockInfo.direction === 'left',
          'absolute-right': blockInfo.direction === 'right',
        }"
      >
        <q-avatar
          class="no-pointer-events"
          color="grey-4"
          round
          size="md"
          text-color="white"
          unelevated
          style="z-index: 10"
          :style="{
            left:
              blockInfo.direction === 'right'
                ? '18px'
                : blockInfo.direction === 'left'
                  ? '-18px'
                  : 0,
            top:
              blockInfo.direction === 'down'
                ? '18px'
                : blockInfo.direction === 'up'
                  ? '-18px'
                  : 0,
          }"
        >
          <q-icon :name="`mdi-chevron-${blockInfo.direction}`" size="md" />
        </q-avatar>
      </div>
    </q-card>

  </q-scroll-area>
</template>

<style scoped></style>

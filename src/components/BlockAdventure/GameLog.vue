<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string[];
}>();

const logScroll = ref<QScrollArea>();

watch(
  () => props.modelValue.length,
  () => {
    logScroll.value?.setScrollPercentage('vertical', 100, 200);
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div class="column" style="height: calc(20vh - 100px)">
    <div class="text-h6">Game Log</div>
    <q-card
      class="col-grow"
      bordered
      flat
      style="border-color: var(--q-primary); border-width: 2px"
    >
      <q-scroll-area ref="logScroll" class="full-height">
        <div
          v-for="(item, index) in modelValue"
          :key="index"
          style="white-space: pre"
        >
          {{ item }}
        </div>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<style scoped></style>

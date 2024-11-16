<script setup lang="ts">
import { QRejectedEntry } from 'quasar';
import { ref } from 'vue';

import { parseManifest } from 'types/aura';

const filesImages = ref<File>();

const onChange = (file: File) => {
  const reader = new FileReader();
  reader.onload = (evt) => {
    if (typeof evt.target?.result === 'string') {
      try {
        const manifest = parseManifest(JSON.parse(evt.target.result));
        console.log(manifest);
      } catch (error) {
        console.error(error);
      }
    }
  };
  reader.readAsText(file);
};

const onRejected = (rejectedEntries: QRejectedEntry[]) => {
  console.log('Rejected files:', rejectedEntries);
};
</script>

<template>
  <q-page class="row justify-center q-pa-xl">
    <q-file
      accept=".json"
      clearable
      label="Select config file"
      outlined
      v-model="filesImages"
      @rejected="onRejected"
      @update:model-value="onChange"
    />
  </q-page>
</template>

<style scoped></style>

<script setup lang="ts">
import { QRejectedEntry } from 'quasar';
import { ref } from 'vue';

import { parseManifest } from 'types/aura';
import { readFileText } from 'utils/common';

const file = ref<File>();
const isLoading = ref(false);

const onChange = async (file: File) => {
  isLoading.value = true;
  try {
    const manifest = parseManifest(JSON.parse(await readFileText(file)));
    console.log(manifest);
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false;
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
      :loading="isLoading"
      outlined
      v-model="file"
      @rejected="onRejected"
      @update:model-value="onChange"
    />
  </q-page>
</template>

<style scoped></style>

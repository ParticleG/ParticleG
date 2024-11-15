<script setup lang="ts">
import { QRejectedEntry } from 'quasar';
import { ref } from 'vue';

const filesImages = ref<File>();

const onChange = (file: File) => {
  console.log('Selected file:', file);
};

const onRejected = (rejectedEntries: QRejectedEntry[]) => {
  console.log('Rejected files:', rejectedEntries);
};
</script>

<template>
  <q-page class="row justify-center q-pa-xl">
    <q-file
      accept=".json"
      label="Select config file"
      outlined
      v-model="filesImages"
      @rejected="onRejected"
      @update:model-value="onChange"
    />
  </q-page>
</template>

<style scoped></style>

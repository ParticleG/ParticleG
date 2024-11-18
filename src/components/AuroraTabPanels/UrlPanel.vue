<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

import { i18nSubPath } from 'utils/common';
import { parseError, parseManifest } from 'types/aura';
import { ErrorTreeNode, Manifest } from 'types/aura/types';

const emit = defineEmits<{
  clear: [];
  reject: [errors: ErrorTreeNode[]];
  resolve: [manifest: Manifest];
}>();

const content = ref<string>();
const error = ref(false);

const i18n = i18nSubPath('components.AuroraTabPanels.UrlPanel');

const setError = (errors?: ErrorTreeNode[]) => {
  if (errors) {
    error.value = true;
    emit('reject', errors);
  } else {
    error.value = false;
    emit('clear');
  }
};

const onChange = async () => {
  setError();
  if (!content.value?.length) {
    return;
  }
  const data = await axios.get(content.value)
  console.log(data)
  const result = parseManifest((await axios.get(content.value)).data);
  if (result.success) {
    emit('resolve', result.data);
  } else {
    setError(parseError(result.error));
  }
};
</script>

<template>
  <div class="column q-gutter-y-md">
    <div class="text-h6">
      {{ i18n('labels.title') }}
    </div>
    <q-input
      autofocus
      clearable
      :error="error"
      hide-bottom-space
      outlined
      v-model="content"
      @change="onChange"
    />
  </div>
</template>

<style scoped></style>

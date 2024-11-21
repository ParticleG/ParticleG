<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

import { i18nSubPath } from 'utils/common';
import { parseError, parseManifest } from 'types/aura';
import { ErrorTreeNode, Manifest } from 'types/aura/types';

const errors = defineModel<ErrorTreeNode[]>('errors', { required: true });
const manifest = defineModel<Manifest | undefined>('manifest', {
  required: true,
});

const content = ref<string>();

const i18n = i18nSubPath('components.AuroraTabPanels.UrlPanel');
const clear = () => {
  content.value = '';
  errors.value = [];
  manifest.value = undefined;
};
const onChange = async () => {
  if (!content.value?.length) {
    errors.value = [];
    manifest.value = undefined;
    return;
  }
  const result = parseManifest((await axios.get(content.value)).data);
  if (result.success) {
    errors.value = [];
    manifest.value = result.data;
  } else {
    errors.value = parseError(result.error);
    manifest.value = undefined;
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
      :error="!!errors?.length"
      hide-bottom-space
      outlined
      v-model="content"
      @change="onChange"
      @clear="clear"
    />
  </div>
</template>

<style scoped></style>

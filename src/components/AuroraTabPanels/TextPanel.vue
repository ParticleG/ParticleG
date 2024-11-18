<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import { ErrorTreeNode, Manifest } from 'types/aura/types';
import { parseError, parseManifest } from 'types/aura';
import { i18nSubPath } from 'utils/common';

const { dark } = useQuasar();

const errors = defineModel<ErrorTreeNode[]>('errors', { required: true });
const manifest = defineModel<Manifest | undefined>('manifest', { required: true });

const content = ref<string>();

const i18n = i18nSubPath('components.AuroraTabPanels.TextPanel');
const clear = () => {
  content.value = '';
  errors.value = [];
  manifest.value = undefined;
};
const onChange = () => {
  errors.value = [];
  if (!content.value?.length) {
    return;
  }
  const result = parseManifest(content.value);
  if (result.success) {
    manifest.value = result.data;
  } else {
    errors.value = parseError(result.error);
  }
};
</script>

<template>
  <div class="column q-gutter-y-md">
    <div class="text-h6">
      {{ i18n('labels.textInput') }}
    </div>
    <q-field
      autofocus
      clearable
      :error="!!errors?.length"
      hide-bottom-space
      outlined
      v-model="content"
      @clear="clear"
    >
      <template v-slot:control>
        <vue-monaco-editor
          class="self-center full-width no-outline"
          tabindex="0"
          language="json"
          :options="{
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
          }"
          :theme="dark.isActive ? 'vs-dark' : 'vs'"
          v-model:value="textInput.value"
          @change="onChange"
          style="min-height: 10rem; max-height: 30vh"
        />
      </template>
    </q-field>
  </div>
</template>

<style scoped></style>

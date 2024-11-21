<script setup lang="ts">
import { MonacoEditor, VueMonacoEditor } from '@guolao/vue-monaco-editor';
import { useQuasar } from 'quasar';
import { ref, shallowRef } from 'vue';

import { ErrorTreeNode, Manifest } from 'types/aura/types';
import { parseError, parseManifest } from 'types/aura';
import { i18nSubPath } from 'utils/common';

const { dark } = useQuasar();

const errors = defineModel<ErrorTreeNode[]>('errors', { required: true });
const manifest = defineModel<Manifest | undefined>('manifest', {
  required: true,
});

const content = ref<string>();
const monacoEditor = shallowRef<MonacoEditor>();

const i18n = i18nSubPath('components.AuroraTabPanels.TextPanel');
const clear = () => {
  content.value = '';
  errors.value = [];
  manifest.value = undefined;
};
const onChange = () => {
  if (!content.value?.length) {
    errors.value = [];
    manifest.value = undefined;
    return;
  }
  const result = parseManifest(content.value);
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
          v-model:value="content"
          @change="onChange"
          @mount="monacoEditor = $event"
          style="min-height: 10rem; max-height: 30vh"
        />
      </template>
    </q-field>
  </div>
</template>

<style scoped></style>

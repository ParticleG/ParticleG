<script setup lang="ts">
import { QRejectedEntry, useQuasar } from 'quasar';
import { reactive, ref } from 'vue';

import { parseManifest, parseError } from 'types/aura';
import { i18nCommon, i18nSubPath, readFileText } from 'utils/common';
import { ErrorTreeNode } from 'types/aura/types';
import axios from 'axios';

const { dark } = useQuasar();
const loadMethods = ['url', 'text', 'file'];

const loadMethod = ref(loadMethods[0]);
const errors = ref<ErrorTreeNode[]>([]);

const i18n = i18nSubPath('pages.AuroraPage');

const fileInput = reactive<{
  loading: boolean;
  value?: File;
  onAccept: (file: File) => void;
  onReject: (rejectedEntries: QRejectedEntry[]) => void;
}>({
  loading: false,
  onAccept: async (file: File) => {
    errors.value = [];
    fileInput.loading = true;
    const result = parseManifest(await readFileText(file));
    if (result.success) {
      console.log(result.data);
    } else {
      errors.value = parseError(result.error);
    }
    fileInput.loading = false;
  },
  onReject: (rejectedEntries: QRejectedEntry[]) => {
    errors.value = rejectedEntries.map(({ file: { name, type } }) => ({
      label: 'INVALID_FILE',
      children: [
        {
          label: i18n('labels.invalidFile', {
            name,
            type,
          }),
        },
      ],
    }));
  },
});
const textInput = reactive<{
  value?: string;
  onChange: () => void;
}>({
  onChange: () => {
    errors.value = [];
    if (!urlInput.value?.length) {
      return;
    }
    const result = parseManifest(urlInput.value);
    if (result.success) {
      console.log(result.data);
    } else {
      errors.value = parseError(result.error);
    }
  },
});
const urlInput = reactive<{
  value?: string;
  onChange: () => void;
}>({
  onChange: async () => {
    errors.value = [];
    if (!urlInput.value?.length) {
      return;
    }
    const result = parseManifest((await axios.get(urlInput.value)).data);
    if (result.success) {
      console.log(result.data);
    } else {
      errors.value = parseError(result.error);
    }
  },
});
</script>

<template>
  <q-page class="row justify-center q-pa-xl">
    <div class="col-8 column">
      <q-card>
        <q-toolbar>
          <q-toolbar-title>{{ i18n('labels.loadMethod') }}</q-toolbar-title>
          <q-tabs no-caps v-model="loadMethod">
            <q-tab
              v-for="(item, index) in loadMethods"
              :key="index"
              :name="item"
              :label="i18n(`tabs.${item}`)"
            />
          </q-tabs>
        </q-toolbar>
        <q-tab-panels animated v-model="loadMethod">
          <q-tab-panel name="url">
            <q-input
              autofocus
              clearable
              :error="!!errors.length"
              hide-bottom-space
              :label="i18n('labels.urlInput')"
              outlined
              v-model="urlInput.value"
              @change="urlInput.onChange"
            />
          </q-tab-panel>
          <q-tab-panel name="text">
            <div class="column q-gutter-y-md">
              <div class="text-h6">
                {{ i18n('labels.textInput') }}
              </div>
              <q-field
                autofocus
                clearable
                :error="!!errors.length"
                hide-bottom-space
                outlined
                v-model="textInput.value"
                @clear="
                textInput.value = '';
                textInput.onChange();
              "
              >
                <template v-slot:control>
                  <vue-monaco-editor
                    class="self-center full-width no-outline q-pt-md"
                    tabindex="0"
                    language="json"
                    :options="{
                    automaticLayout: true,
                    formatOnType: true,
                    formatOnPaste: true,
                  }"
                    :theme="dark.isActive ? 'vs-dark' : 'vs'"
                    v-model:value="textInput.value"
                    @change="textInput.onChange"
                    style="min-height: 10rem; max-height: 30vh"
                  />
                </template>
              </q-field>
            </div>
          </q-tab-panel>
          <q-tab-panel name="file">
            <q-file
              accept=".json"
              clearable
              :error="!!errors.length"
              hide-bottom-space
              :label="i18n('labels.fileInput')"
              :loading="fileInput.loading"
              outlined
              v-model="fileInput.value"
              @rejected="fileInput.onReject"
              @update:model-value="fileInput.onAccept"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <q-card v-if="errors.length">
        <q-card-section class="text-negative">
          <div class="text-h6">
            {{ i18nCommon('zod.manifestParseError') }}
          </div>
          <q-tree
            default-expand-all
            dense
            no-transition
            node-key="label"
            :nodes="errors"
            text-color="negative"
          />
        </q-card-section>
      </q-card>
      <q-card v-else>
        <q-card-section></q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped></style>

<script setup lang="ts">
import { QRejectedEntry } from 'quasar';
import { reactive, ref } from 'vue';

import { parseManifest, parseError } from 'types/aura';
import { i18nCommon, i18nSubPath, readFileText } from 'utils/common';
import { ErrorTreeNode, Manifest } from 'types/aura/types';
import UrlPanel from 'components/AuroraTabPanels/UrlPanel.vue';

const loadMethods = ['url', 'text', 'file'];

const loadMethod = ref(loadMethods[0]);
const errors = ref<ErrorTreeNode[]>([]);
const manifest = ref<Manifest>();

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
            <url-panel
              @clear="errors = []"
              @reject="errors = $event"
              @resolve="manifest = $event"
            />
          </q-tab-panel>
          <q-tab-panel name="text">

          </q-tab-panel>
          <q-tab-panel name="file">
            <div class="column q-gutter-y-md">
              <div class="text-h6">
                {{ i18n('labels.fileInput') }}
              </div>
              <q-file
                accept=".json"
                clearable
                :error="!!errors.length"
                hide-bottom-space
                :loading="fileInput.loading"
                outlined
                v-model="fileInput.value"
                @rejected="fileInput.onReject"
                @update:model-value="fileInput.onAccept"
              />
            </div>
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

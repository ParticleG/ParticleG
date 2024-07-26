<script setup lang="ts">
import { micromark } from 'micromark';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { getProfileReadMe } from 'utils/requests';

const { query } = useRoute();

const noReadMe = ref(false);
const readMeHtml = ref('');
const readMeUrl = ref('');
const username = ref(query.username?.toString() ?? 'ParticleG');

onMounted(async () => {
  const readMe = await getProfileReadMe(username.value);
  if (readMe) {
    readMeHtml.value = micromark(readMe.content, {
      allowDangerousHtml: true,
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
    });
    readMeUrl.value = readMe.url;
  } else {
    noReadMe.value = true;
  }
});
</script>

<template>
  <q-page class="flex row q-col-gutter-lg q-pa-xl">
    <div class="col-6">
      <q-card>
        <q-card-section></q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <q-card>
        <q-card-section>
          <q-breadcrumbs color="primary">
            <q-breadcrumbs-el
              :label="username"
              icon="person"
              :href="`https://github.com/${username}`"
              target="_blank"
            />
            <q-breadcrumbs-el
              v-if="!noReadMe"
              :label="username"
              icon="book"
              :href="`https://github.com/${username}/${username}`"
              target="_blank"
            />
            <q-breadcrumbs-el v-if="!noReadMe" label="README.md" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset/>
        <q-card-section>
          <div v-html="readMeHtml" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped></style>

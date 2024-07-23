<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const readMeHtml = ref('');

onMounted(async () => {
  try {
    readMeHtml.value = (
      await axios.post('https://api.github.com/markdown', {
        text: (
          await axios.get(
            'https://raw.githubusercontent.com/ParticleG/ParticleG/main/README.md',
          )
        ).data.replaceAll('theme=github_dark', 'theme=github_light'),
      })
    ).data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <q-page class="flex row q-col-gutter-lg q-pa-xl">
    <div class="col-6">
      <q-card>
        <q-card-section>
          <div v-html="readMeHtml" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <q-card>
        <q-card-section>
          <div v-html="readMeHtml" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped></style>

<script setup lang="ts">
import axios from 'axios';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { dark } = useQuasar();
const { query } = useRoute();

const readMeHtml = ref('');
const user = ref(query.user ?? 'ParticleG');

onMounted(async () => {
  try {
    readMeHtml.value = (
      await axios.post('https://api.github.com/markdown', {
        text: (
          await axios.get(
            `https://raw.githubusercontent.com/${user.value}/${user.value}/main/README.md`,
          )
        ).data.replaceAll(
          /theme=(.*?)&/gm,
          dark.isActive ? 'theme=github_dark&' : 'theme=github_light&',
        ),
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

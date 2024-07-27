<script setup lang="ts">
import 'css/github-markdown.css';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { getProfileReadMe, getUser } from 'utils/requests';
import { GithubUser } from 'utils/requests/types';

const { query } = useRoute();

const githubUser = ref<GithubUser | null | undefined>();
const readMe = ref<{ content: string; url: string } | null | undefined>();
const username = ref(query.username?.toString() ?? 'ParticleG');

onMounted(async () => {
  getProfileReadMe(username.value).then((data) => {
    if (data) {
      readMe.value = {
        content: micromark(data.content, {
          allowDangerousHtml: true,
          extensions: [gfm()],
          htmlExtensions: [gfmHtml()],
        }),
        url: data.url,
      };
    } else {
      readMe.value = null;
    }
  });
  getUser(username.value).then((data) => {
    if (data) {
      githubUser.value = data;
    } else {
      githubUser.value = null;
    }
  });
});
</script>

<template>
  <q-page class="row justify-center q-pa-xl">
    <div class="row col-grow q-col-gutter-x-lg" style="max-width: 76rem">
      <div class="col-md-3 col-12">
        <div v-if="githubUser" class="github-font q-gutter-y-md">
          <div class="row items-center q-col-gutter-x-md">
            <div class="col-md-12 col-2">
              <q-img
                loading="eager"
                :src="githubUser.avatar_url"
                style="
                  border: 1px solid #9e9e9e;
                  border-radius: 50%;
                  position: relative;
                  width: 100%;
                  height: 0;
                  padding-bottom: 100%;
                "
              />
            </div>
            <div class="col-md-12 col-grow column">
              <div class="text-h5 text-weight-medium">
                {{ githubUser.name ?? githubUser.login }}
              </div>
              <div class="text-grey-8 text-h6 text-weight-thin">
                {{ githubUser.login }}
              </div>
            </div>
          </div>
          <div class="text-body1">
            {{ githubUser.bio }}
          </div>
          <q-btn
            class="full-width"
            color="blue"
            icon-right="mdi-github"
            label="See on Github"
            no-caps
            unelevated
            :href="`https://github.com/${username}`"
            target="_blank"
          />
          <div class="row items-end q-gutter-x-xs">
            <q-icon name="people" size="xs" />
            <div class="text-weight-medium">{{ githubUser.followers }}</div>
            <div class="text-grey-8">followers</div>
            <div class="text-weight-medium">·</div>
            <div class="text-weight-medium">{{ githubUser.following }}</div>
            <div class="text-grey-8">following</div>
          </div>
          <q-separator />
        </div>
      </div>
      <div class="col-md-grow col-12">
        <q-card bordered flat>
          <q-card-section>
            <q-breadcrumbs color="primary">
              <q-breadcrumbs-el
                :label="username"
                icon="person"
                :href="`https://github.com/${username}`"
                target="_blank"
              />
              <q-breadcrumbs-el
                v-if="readMe"
                :label="username"
                icon="book"
                :href="`https://github.com/${username}/${username}`"
                target="_blank"
              />
              <q-breadcrumbs-el v-if="readMe" label="README.md" />
            </q-breadcrumbs>
          </q-card-section>
          <q-card-section>
            <article
              v-if="readMe"
              :class="{
                'github-markdown-dark': $q.dark.isActive,
                'github-markdown-light': !$q.dark.isActive,
              }"
              v-html="readMe.content"
              style="max-width: calc(60vw - 10rem)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>

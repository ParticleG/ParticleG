<script setup lang="ts">
import 'css/github-markdown.css';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import {
  getProfileReadMe,
  getUser,
  getUserOrganizations,
} from 'utils/requests';
import { GithubUser, GithubUserOrganization } from 'utils/requests/types';
import { createI18n } from 'utils/common';
import { useI18n } from 'vue-i18n';

const { query } = useRoute();

const githubUser = ref<GithubUser | null | undefined>();
const githubUserOrganizations = ref<
  GithubUserOrganization[] | null | undefined
>();
const readMe = ref<{ content: string; url: string } | null | undefined>();
const username = ref(query.username?.toString() ?? 'ParticleG');

const i18n = createI18n(useI18n(), 'pages.HomePage.');

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
  getUserOrganizations(username.value).then((data) => {
    if (data) {
      githubUserOrganizations.value = data;
    } else {
      githubUserOrganizations.value = null;
    }
  });
});
</script>

<template>
  <q-page class="row justify-center q-pa-xl">
    <div
      v-if="githubUser !== null"
      class="row col-grow q-col-gutter-lg"
      style="max-width: 76rem"
    >
      <div class="col-md-3 col-12">
        <div v-if="githubUser" class="github-font q-gutter-y-md">
          <div class="row items-center q-col-gutter-x-md">
            <div class="col-md-12 col-2">
              <q-img
                :src="githubUser.avatar_url"
                style="
                  border: 1px solid #323439;
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
          <template v-if="githubUserOrganizations">
            <q-separator />
            <div class="column q-gutter-y-sm">
              <div class="text-body1 text-weight-medium">Organizations</div>
              <div class="col-grow row q-gutter-x-xs">
                <q-btn
                  v-for="organization in githubUserOrganizations"
                  :key="organization.id"
                  color="#323439"
                  :href="`https://github.com/${organization.login}`"
                  outline
                  padding="none"
                  target="_blank"
                >
                  <q-avatar rounded size="lg">
                    <q-img :src="organization.avatar_url" />
                  </q-avatar>
                </q-btn>
                <div
                  v-if="!githubUserOrganizations.length"
                  class="text-body1 text-grey-8 text-italic text-weight-thin"
                >
                  {{ i18n('labels.noPublicOrganizations') }}
                </div>
              </div>
            </div>
          </template>
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
    <div v-else class="absolute-center">
      <div class="column items-center q-gutter-y-xl">
        <q-btn
          class="rotate-button"
          color="grey"
          icon="account_circle"
          round
          padding="none"
          size="35vmin"
          unelevated
        >
          <q-icon
            class="absolute-center"
            color="white"
            name="question_mark"
            size="15vmin"
            style="top: 33%"
          />
        </q-btn>
        <div
          class="text-grey text-italic text-weight-medium"
          style="font-size: 5vmin"
        >
          {{ i18n('labels.userNotFound', { username }) }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.rotate-button {
  transform: rotate(1turn);
  transition: 1s;
}

.rotate-button:active {
  transform: rotate(0);
  transition: 0s;
}
</style>

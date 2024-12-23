<script setup lang="ts">
import { QScrollArea, useQuasar } from 'quasar';
import { computed, onMounted, reactive, ref, watch } from 'vue';

import CurrentPlayerIndicator from 'components/BlockAdventure/CurrentPlayerIndicator.vue';
import GameLog from 'components/BlockAdventure/GameLog.vue';
import GameBlock from 'components/BlockAdventure/GameBlock.vue';
import GamePlayer from 'components/BlockAdventure/GamePlayer.vue';
import { BlockAdventure } from 'types/blockAdventure';
import { DEFAULT_MAP } from 'types/blockAdventure/constants';
import { BlockType, Player } from 'types/blockAdventure/types';
import { sleep } from 'utils/common';

const { screen } = useQuasar();

const isMobile = computed(() => screen.lt.md);
const game = reactive(
  new BlockAdventure(DEFAULT_MAP, [
    new Player(1, 'Mike', 'https://cdn.quasar.dev/img/avatar1.jpg'),
    new Player(2, 'Mary', 'https://cdn.quasar.dev/img/avatar2.jpg'),
    new Player(3, 'Alice', 'https://cdn.quasar.dev/img/avatar3.jpg'),
    new Player(4, 'John', 'https://cdn.quasar.dev/img/avatar4.jpg'),
  ]),
);

const boxShadow = ref('');
const gameScrollArea = ref<QScrollArea>();
const loading = ref(false);
const point = ref(0);
const size = ref(145);
const turnPercentage = ref(0);
const winner = ref<Player>();

const nextTurn = async () => {
  loading.value = true;
  turnPercentage.value = 0;

  point.value = await game.rollDice();
  turnPercentage.value = 30;

  const nextBlockType = await game.move(point.value, () => {
    if (turnPercentage.value < 70) {
      turnPercentage.value += 10;
    } else if (turnPercentage.value < 90) {
      turnPercentage.value += 5;
    } else if (turnPercentage.value < 100) {
      turnPercentage.value += 1;
    }
  });
  turnPercentage.value = 100;
  await sleep(500);

  switch (nextBlockType) {
    case BlockType.ReRoll: {
      loading.value = false;
      return;
    }
    default: {
      break;
    }
  }

  if (game.winner) {
    winner.value = game.winner;
    loading.value = false;
    return;
  }
  game.nextTurn();
  loading.value = false;
};

watch(
  () => game.currentPlayer,
  (value) => {
    gameScrollArea.value?.setScrollPosition(
      'horizontal',
      value.x * size.value,
      200,
    );
    gameScrollArea.value?.setScrollPosition(
      'vertical',
      value.y * size.value,
      200,
    );
  },
  {
    deep: true,
  },
);

const newGame = () => {
  loading.value = true;
  game.reset();
  winner.value = undefined;
  loading.value = false;
};

const updateBoxShadow = (info: {
  horizontalPosition: number;
  verticalPosition: number;
}) => {
  const offsetX =
    info.horizontalPosition === 0
      ? '-4rem'
      : info.horizontalPosition === 1
        ? '4rem'
        : '0';
  const offsetY =
    info.verticalPosition === 0
      ? '-4rem'
      : info.verticalPosition === 1
        ? '4rem'
        : '0';
  console.log(info);
  boxShadow.value = `inset ${offsetX} ${offsetY} 4rem rgba(0, 255, 255, 0.5)`;
};

onMounted(() => {
  game.reset();
});
</script>

<template>
  <q-page class="column q-gutter-y-md q-px-md q-px-md-xl q-py-md">
    <div
      class="row items-center q-gutter-x-xl"
      :class="{
        'justify-center': isMobile,
        'justify-start': !isMobile,
      }"
    >
      <div class="column q-gutter-y-sm">
        <div class="text-h5 text-center">Round {{ game.round + 1 }}</div>
        <div v-if="!winner" class="text-body1 text-center">
          {{ game.players[game.turn].name }}'s Turn
        </div>
        <div v-else class="text-body1 text-green text-center">
          {{ winner.name }} is the winner!
        </div>
      </div>
      <game-log
        class="col-grow col-md-2"
        :model-value="game.log"
        style="height: calc(20vh - 100px)"
      />
    </div>
    <q-card>
<!--      <div-->
<!--        class="absolute-full no-pointer-events"-->
<!--        style="z-index: 1"-->
<!--        :style="{ boxShadow }"-->
<!--      />-->
      <q-scroll-area
        ref="gameScrollArea"
        style="height: 80vh"
        @scroll="updateBoxShadow"
      >
        <game-block v-model="game" />
        <game-player
          v-for="(player, index) in game.players"
          :key="index"
          class="absolute"
          :active="!loading && game.currentPlayer.id === player.id"
          :offset="index * 25"
          :model-value="player"
        />
        <current-player-indicator
          class="absolute"
          :offset="game.turn * 25"
          v-model="game.currentPlayer"
        />
      </q-scroll-area>
    </q-card>
    <q-page-sticky
      :position="isMobile ? 'bottom-right' : 'top'"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="!winner"
        class="text-h5"
        color="primary"
        :disable="!!winner"
        :label="point"
        :loading="loading"
        padding="none"
        :percentage="turnPercentage"
        @click="nextTurn"
        style="height: 3rem; width: 3rem"
      >
        <template v-slot:loading>
          <q-spinner-hourglass />
        </template>
        <q-tooltip
          anchor="center left"
          self="center right"
          transition-hide="jump-right"
          transition-show="jump-left"
        >
          Roll the dice
        </q-tooltip>
      </q-btn>
      <q-btn
        v-else
        icon="mdi-restart"
        color="primary"
        dense
        size="lg"
        outline
        @click="newGame"
      >
        <q-tooltip
          anchor="center left"
          self="center right"
          transition-hide="jump-right"
          transition-show="jump-left"
        >
          New Game
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<style scoped></style>

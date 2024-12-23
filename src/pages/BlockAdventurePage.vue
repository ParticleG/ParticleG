<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import { BlockAdventure } from 'types/blockAdventure';
import { DEFAULT_MAP } from 'types/blockAdventure/constants';
import { BlockType, Player } from 'types/blockAdventure/types';
import GameMap from 'components/BlockAdventure/GameMap.vue';
import GameLog from 'components/BlockAdventure/GameLog.vue';
import { QScrollArea } from 'quasar';
import GamePlayer from 'components/BlockAdventure/GamePlayer.vue';
import CurrentPlayerIndicator from 'components/BlockAdventure/CurrentPlayerIndicator.vue';
import { sleep } from 'utils/common';

const game = reactive(
  new BlockAdventure(DEFAULT_MAP, [
    new Player(1, 'Mike', 'https://cdn.quasar.dev/img/avatar1.jpg'),
    new Player(2, 'Mary', 'https://cdn.quasar.dev/img/avatar2.jpg'),
    new Player(3, 'Alice', 'https://cdn.quasar.dev/img/avatar3.jpg'),
    new Player(4, 'John', 'https://cdn.quasar.dev/img/avatar4.jpg'),
  ]),
);

const loading = ref(false);
const point = ref(0);
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

const newGame = () => {
  loading.value = true;
  game.reset();
  winner.value = undefined;
  loading.value = false;
};

onMounted(() => {
  game.reset();
});
</script>

<template>
  <q-page class="column q-gutter-y-md q-px-xl q-py-md">
    <div class="row items-center justify-center q-gutter-x-xl">
      <div class="column q-gutter-y-sm">
        <div class="text-h5 text-center">Round {{ game.round + 1 }}</div>
        <div v-if="!winner" class="text-body1 text-center">
          {{ game.players[game.turn].name }}'s Turn
        </div>
        <div v-else class="text-body1 text-green text-center">
          {{ winner.name }} is the winner!
        </div>
      </div>
      <q-btn
        v-if="!winner"
        class="text-h5"
        color="primary"
        :disable="!!winner"
        :label="point"
        :loading="loading"
        outline
        padding="none"
        :percentage="turnPercentage"
        @click="nextTurn"
        style="height: 3rem; width: 3rem"
      >
        <template v-slot:loading>
          <q-spinner-hourglass />
        </template>
        <q-tooltip> Roll the dice</q-tooltip>
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
        <q-tooltip> New Game</q-tooltip>
      </q-btn>
      <game-log :model-value="game.log" style="height: calc(20vh - 100px)" />
    </div>
    <q-scroll-area class="full-width relative-position" style="height: 80vh">
      <game-map v-model="game" />
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
  </q-page>
</template>

<style scoped></style>

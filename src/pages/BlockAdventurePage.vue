<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { onMounted, reactive, ref, watch } from 'vue';

import { BlockAdventure, Player } from 'types/blockAdventure';
import { DEFAULT_MAP } from 'types/blockAdventure/constants';
import { BlockType } from 'types/blockAdventure/types';

const game = reactive(
  new BlockAdventure(DEFAULT_MAP, [
    'Player 1',
    'Player 2',
    'Player 3',
    'Player 4',
  ]),
);

const logScroll = ref<QScrollArea>();
const rolling = ref(false);
const running = ref(false);
const point = ref(0);
const size = ref(145);
const winner = ref<Player>();

const nextTurn = async () => {
  running.value = true;

  rolling.value = true;
  point.value = await game.rollDice();
  rolling.value = false;

  switch (await game.move(point.value)) {
    case BlockType.ReRoll: {
      running.value = false;
      return;
    }
    default: {
      break;
    }
  }

  if (game.winner) {
    winner.value = game.winner;
    running.value = false;
    return;
  }
  game.nextTurn();
  running.value = false;
};

const newGame = () => {
  game.reset();
  winner.value = undefined;
};

watch(
  () => game.log.length,
  () => {
    logScroll.value?.setScrollPercentage('vertical', 100, 200);
  },
  {
    deep: true,
  },
);

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
        :loading="running"
        outline
        padding="none"
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
      <div class="column" style="height: calc(20vh - 100px)">
        <div class="text-h6">Game Log</div>
        <q-card
          class="col-grow"
          bordered
          flat
          style="border-color: var(--q-primary); border-width: 2px"
        >
          <q-scroll-area ref="logScroll" class="full-height" style="width: 200px">
            <div
              v-for="(logItem, logIndex) in game.log"
              :key="logIndex"
              style="white-space: pre"
            >
              {{ logItem }}
            </div>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
    <q-scroll-area class="full-width relative-position" style="height: 80vh">
      <q-card
        v-for="(blockInfo, blockIndex) in game.map"
        :key="blockIndex"
        class="row justify-center items-center absolute q-pa-lg"
        bordered
        flat
        style="border-width: 2px"
        :style="{
          left: `${blockInfo.x * size}px`,
          top: `${blockInfo.y * size}px`,
          height: `${size}px`,
          width: `${size}px`,
        }"
      >
        <div>
          {{ blockInfo.label }}
        </div>
        <div class="absolute-bottom-left">No.{{ blockIndex }}</div>
        <div
          v-if="blockInfo.direction"
          class="flex flex-center"
          :class="{
            'absolute-top': blockInfo.direction === 'up',
            'absolute-bottom': blockInfo.direction === 'down',
            'absolute-left': blockInfo.direction === 'left',
            'absolute-right': blockInfo.direction === 'right',
          }"
        >
          <q-avatar
            class="no-pointer-events"
            color="grey-4"
            round
            size="md"
            text-color="white"
            unelevated
            style="z-index: 10"
            :style="{
              left:
                blockInfo.direction === 'right'
                  ? '18px'
                  : blockInfo.direction === 'left'
                    ? '-18px'
                    : 0,
              top:
                blockInfo.direction === 'down'
                  ? '18px'
                  : blockInfo.direction === 'up'
                    ? '-18px'
                    : 0,
            }"
          >
            <q-icon :name="`mdi-chevron-${blockInfo.direction}`" size="md" />
          </q-avatar>
        </div>
      </q-card>
      <q-avatar
        v-for="(player, index) in game.players"
        :key="index"
        class="absolute"
        :color="['red', 'blue', 'purple', 'orange'][index]"
        size="md"
        text-color="white"
        style="transition: all 0.35s ease-in-out; z-index: 100"
        :style="{
          left: `${5 + player.x * size + index * 35}px`,
          top: `${10 + player.y * size}px`,
        }"
      >
        {{ index + 1 }}
        <q-tooltip anchor="top middle" self="bottom middle">
          {{ player.name }}
        </q-tooltip>
      </q-avatar>
      <q-icon
        class="absolute"
        name="mdi-arrow-up-bold"
        color="green"
        size="md"
        style="transition: all 0.35s ease-in-out; z-index: 100"
        :style="{
          left: `${5 + game.players[game.turn].x * size + (game.turn % game.players.length) * 35}px`,
          top: `${38 + game.players[game.turn].y * size}px`,
        }"
      />
    </q-scroll-area>
  </q-page>
</template>

<style scoped></style>

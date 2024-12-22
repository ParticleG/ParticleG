import { Block, BlockType } from 'types/blockAdventure/types';
import { sleep } from 'utils/common';

export class Player {
  name: string;
  position: number;
  skip: number;
  diceModifier: (point: number) => number;

  constructor(name: string) {
    this.name = name;
    this.position = 0;
    this.skip = 0;
    this.diceModifier = (point) => point;
  }
}

export class BlockAdventure {
  private readonly _map: Block[];
  private readonly _players: Player[];
  private _log: string[] = [];
  private _round = 0;
  private _turn = 0;

  constructor(map: Block[], playerNames: string[]) {
    this._map = map;
    this._players = playerNames.map((name) => new Player(name));
  }

  get log() {
    return this._log;
  }

  get map() {
    return this._map.map((block, index) => ({
      ...block,
      x: this._calculateOffsetX(index),
      y: this._calculateOffsetY(index),
    }));
  }

  get players() {
    return this._players.map((player) => ({
      ...player,
      x: this._calculateOffsetX(player.position),
      y: this._calculateOffsetY(player.position),
    }));
  }

  get round() {
    return this._round;
  }

  get turn() {
    return this._turn;
  }

  get winner() {
    return this._players.find((player) => player.position >= this._map.length - 1);
  }

  reset() {
    this._players.forEach((player) => {
      player.position = 0;
      player.skip = 0;
      player.diceModifier = (point) => point;
    });
    this._log = ['Game started'];
    this._round = 0;
    this._turn = 0;
  }

  async rollDice(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const currentPlayer = this._players[this._turn];
          const point = currentPlayer.diceModifier(
            Math.floor(Math.random() * 6) + 1,
          );
          this._log.push(`${currentPlayer.name} rolled ${point}`);
          resolve(point);
        },
        200 + Math.random() * 300,
      );
    });
  }

  async move(distance: number) {
    const currentPlayer = this._players[this._turn];
    if (currentPlayer.skip > 0) {
      currentPlayer.skip--;
      this._log.push(
        `${currentPlayer.name} skipped this turn, ${currentPlayer.skip} skip turn(s) left`,
      );
      return;
    }
    currentPlayer.position += distance;
    await sleep(500);

    let nextBlock: Block | undefined = this._map[currentPlayer.position];
    while (nextBlock) {
      if (this._executeBlock(currentPlayer, nextBlock)) {
        return nextBlock.type;
      }
      nextBlock = this._map[currentPlayer.position];
      await sleep(500);
    }
  }

  nextTurn() {
    this._turn++;
    this._log.push(' ');
    if (this._turn >= this._players.length) {
      this._turn = 0;
      this._round++;
      this._log.push(`>> Round ${this._round + 1}`);
    }
  }

  private _executeBlock(player: Player, block: Block): boolean {
    switch (block.type) {
      case BlockType.Jump: {
        const newPosition = block.data >= 0 ? block.data : this._map.length + block.data;
        player.position = newPosition;
        this._log.push(`${player.name} jumped to No.${newPosition} block`);
        return false;
      }
      case BlockType.Move: {
        player.position += block.data;
        this._log.push(`${player.name} moved ${block.data} block(s)`);
        return false;
      }
      case BlockType.Skip: {
        player.skip += block.data;
        this._log.push(`${player.name} would skip next ${block.data} turn(s)`);
        return true;
      }
      case BlockType.ReRoll: {
        this._log.push(`${player.name} got a re-roll!`);
        return true;
      }
      case BlockType.DiceModifier: {
        player.diceModifier = block.data;
        this._log.push(
          `${player.name} got a dice modifier: "${block.data.name}"`,
        );
        return true;
      }
      default: {
        return true;
      }
    }
  }

  private _calculateOffsetX(index: number) {
    return (
      this._map.slice(0, index).filter((item) => item.direction === 'right')
        .length -
      this._map.slice(0, index).filter((item) => item.direction === 'left')
        .length
    );
  }

  private _calculateOffsetY(index: number) {
    return (
      this._map.slice(0, index).filter((item) => item.direction === 'down')
        .length -
      this._map.slice(0, index).filter((item) => item.direction === 'up').length
    );
  }
}

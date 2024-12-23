import { Block, BlockType, Player } from 'types/blockAdventure/types';
import { sleep } from 'utils/common';

export class BlockAdventure {
  private readonly _map: Block[];
  private readonly _players: Player[];
  private readonly _interval = 500;
  private _log: string[] = [];
  private _round = 0;
  private _speed = 1.0;
  private _turn = 0;

  constructor(map: Block[], players: Player[]) {
    this._map = map;
    this._players = players;
  }

  get currentPlayer() {
    return this.players[this._turn];
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
    return this._players.find(
      (player) => player.position >= this._map.length - 1,
    );
  }

  async move(distance: number, stepCallback?: (blockType: BlockType) => void) {
    const currentPlayer = this._players[this._turn];
    if (currentPlayer.skip > 0) {
      currentPlayer.skip--;
      this._log.push(
        `${currentPlayer.name} skipped this turn, ${currentPlayer.skip} skip turn(s) left`,
      );
      return;
    }
    currentPlayer.position += distance;
    await sleep(this._interval / this._speed);

    if (currentPlayer.position >= this._map.length) {
      // Go backward for the extra distance
      currentPlayer.position =
        this._map.length - 1 - (currentPlayer.position - this._map.length);
      this._log.push(
        `${currentPlayer.name} went too far, go back to No.${currentPlayer.position} block`,
      );
      await sleep(this._interval / this._speed);
    }

    let nextBlock: Block | undefined = this._map[currentPlayer.position];
    while (nextBlock) {
      if (this._executeBlock(currentPlayer, nextBlock)) {
        return nextBlock.type;
      }
      nextBlock = this._map[currentPlayer.position];
      stepCallback?.(nextBlock.type);
      await sleep(this._interval / this._speed);
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
          let point = Math.floor(Math.random() * 6) + 1;
          if (currentPlayer.diceModifier) {
            point = currentPlayer.diceModifier(
              Math.floor(Math.random() * 6) + 1,
            );
            currentPlayer.diceModifier = undefined;
          }
          this._log.push(`${currentPlayer.name} rolled ${point}`);
          resolve(point);
        },
        100 + Math.random() * 200,
      );
    });
  }

  setSpeed(speed: number) {
    if (speed > 0) {
      this._speed = speed;
      return true;
    }
    return false;
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

  private _executeBlock(player: Player, block: Block): boolean {
    switch (block.type) {
      case BlockType.Jump: {
        const newPosition =
          block.data >= 0 ? block.data : this._map.length + block.data;
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
        this._log.push(`${player.name} got a dice modifier: "${block.label}"`);
        return true;
      }
      default: {
        return true;
      }
    }
  }
}

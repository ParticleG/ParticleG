export enum BlockType {
  Begin = 'Begin',
  End = 'End',
  Normal = 'Normal',
  Jump = 'Jump',
  Move = 'Move',
  Skip = 'Skip',
  ReRoll = 'ReRoll',
  DiceModifier = 'DiceModifier',
}

interface BaseBlock {
  type: BlockType;
  label: string;
  description: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export class BeginBlock implements BaseBlock {
  type: BlockType.Begin = BlockType.Begin;
  label = 'Begin';
  description = 'The start of the adventure.';
  direction?: 'up' | 'down' | 'left' | 'right';

  constructor(direction?: 'up' | 'down' | 'left' | 'right') {
    this.direction = direction;
  }
}

export class EndBlock implements BaseBlock {
  type: BlockType.End = BlockType.End;
  label = 'End';
  description = 'The end of the adventure.';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export class NormalBlock implements BaseBlock {
  type: BlockType.Normal = BlockType.Normal;
  label: string;
  description: string;
  direction?: 'up' | 'down' | 'left' | 'right';

  constructor(
    direction?: 'up' | 'down' | 'left' | 'right',
    label = '',
    description = 'A normal block.',
  ) {
    this.label = label;
    this.description = description;
    this.direction = direction;
  }
}

export class JumpBlock implements BaseBlock {
  type: BlockType.Jump = BlockType.Jump;
  label: string;
  description: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  data: number;

  constructor(
    data: number,
    label = 'Jump',
    description = 'Jump to a specific block.',
    direction?: 'up' | 'down' | 'left' | 'right',
  ) {
    this.data = data;
    this.label = label;
    this.description = description;
    this.direction = direction;
  }
}

export class MoveBlock implements BaseBlock {
  type: BlockType.Move = BlockType.Move;
  label: string;
  description: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  data: number;

  constructor(
    data: number,
    label = 'Move',
    description = 'Move a specific number of blocks.',
    direction?: 'up' | 'down' | 'left' | 'right',
  ) {
    this.data = data;
    this.label = label;
    this.description = description;
    this.direction = direction;
  }
}

export class SkipBlock implements BaseBlock {
  type: BlockType.Skip = BlockType.Skip;
  label: string;
  description: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  data: number;

  constructor(
    data: number,
    label = 'Skip',
    description = 'Skip a specific number of blocks.',
    direction?: 'up' | 'down' | 'left' | 'right',
  ) {
    this.data = data;
    this.label = label;
    this.description = description;
    this.direction = direction;
  }
}

export class ReRollBlock implements BaseBlock {
  type: BlockType.ReRoll = BlockType.ReRoll;
  label = 'ReRoll';
  description = 'ReRoll the dice.';
  direction?: 'up' | 'down' | 'left' | 'right';

  constructor(direction?: 'up' | 'down' | 'left' | 'right') {
    this.direction = direction;
  }
}

export class DiceModifierBlock implements BaseBlock {
  type: BlockType.DiceModifier = BlockType.DiceModifier;
  label = 'ReRoll';
  description = 'ReRoll the dice.';
  direction?: 'up' | 'down' | 'left' | 'right';
  data: (point: number) => number;

  constructor(
    data: (point: number) => number,
    label = 'Dice Modifier',
    description = 'Modify the next dice roll.',
    direction?: 'up' | 'down' | 'left' | 'right',
  ) {
    this.data = data;
    this.label = label;
    this.description = description;
    this.direction = direction;
  }
}

export type Block =
  | BeginBlock
  | EndBlock
  | NormalBlock
  | JumpBlock
  | MoveBlock
  | SkipBlock
  | ReRollBlock
  | DiceModifierBlock;

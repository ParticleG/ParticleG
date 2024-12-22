import {
  BeginBlock,
  DiceModifierBlock,
  EndBlock,
  JumpBlock,
  MoveBlock,
  NormalBlock,
  ReRollBlock,
  SkipBlock,
  Block,
} from 'types/blockAdventure/types';

export const DEFAULT_MAP: Block[] = [
  // Row 1
  new BeginBlock('right'),
  new JumpBlock(-1, 'To the End', 'Jump straight to the end block', 'right'),
  new NormalBlock('right'),
  new MoveBlock(-1, 'Move back 1', 'Move 2 blocks backwards', 'right'),
  new ReRollBlock('right'),
  new NormalBlock('down'),
  // Row 2
  new MoveBlock(-3, 'Move back 3', 'Move 3 blocks backwards', 'left'),
  new NormalBlock('left'),
  new MoveBlock(-2, 'Move back 2', 'Move 2 blocks backwards', 'left'),
  new MoveBlock(-1, 'Move back 1', 'Move 1 block backwards', 'left'),
  new NormalBlock('left'),
  new DiceModifierBlock(
    (point) => point + 1,
    'Dice + 1',
    'Add 1 to the next dice roll',
    'down',
  ),
  // Row 3
  new SkipBlock(1, 'Skip 1', 'Skip 1 round', 'right'),
  new MoveBlock(1, 'Move forward 1', 'Move 1 block forward', 'right'),
  new NormalBlock('right'),
  new MoveBlock(-1, 'Move back 1', 'Move 1 block backwards', 'right'),
  new DiceModifierBlock(
    (point) => point * 2,
    'Dice * 2',
    'Multiply by 2 to the next dice roll',
    'right',
  ),
  new NormalBlock('down'),
  // Row 4
  new MoveBlock(-1, 'Move back 1', 'Move 1 block backwards', 'left'),
  new MoveBlock(-1, 'Move back 1', 'Move 1 block backwards', 'left'),
  new MoveBlock(-1, 'Move back 1', 'Move 1 block backwards', 'left'),
  new NormalBlock('left'),
  new DiceModifierBlock(
    (point) => point - 3,
    'Dice - 3',
    'Subtract 3 to the next dice roll',
    'left',
  ),
  new MoveBlock(-3, 'Move back 3', 'Move 3 block backwards', 'down'),
  // Row 5
  new NormalBlock('right'),
  new MoveBlock(1, 'Move forward 1', 'Move 1 block forward', 'right'),
  new NormalBlock('right'),
  new NormalBlock('right', 'Other move 1', 'Make someone move 1 block forward'),
  new NormalBlock('right', 'Hospital Exit', 'Exit of the hospital'),
  new MoveBlock(-4, 'Move back 4', 'Move 4 block backwards', 'down'),
  // Row 6
  new NormalBlock('left'),
  new DiceModifierBlock(
    (point) => point / 2,
    'Dice / 2',
    'Divide by 2 to the next dice roll',
    'left',
  ),
  new DiceModifierBlock(
    (point) => point * 3,
    'Dice * 3',
    'Multiply by 3 to the next dice roll',
    'left',
  ),
  new DiceModifierBlock(
    (point) => point ** 2,
    'Dice ** 2',
    'Squared to the next dice roll',
    'left',
  ),
  new DiceModifierBlock(
    (point) => Math.floor(Math.sqrt(point)),
    'floor(sqrt(Dice))',
    'Square root to the next dice roll (floored)',
    'left',
  ),
  new NormalBlock('down'),
  // Row 7
  new NormalBlock('right'),
  new MoveBlock(-2, 'Move back 2', 'Move 2 block backwards', 'right'),
  new EndBlock(),
];

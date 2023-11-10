export enum Player {
  PLAYER = 'Player',
  PLAYER_1 = 'Player 1',
  PLAYER_2 = 'Player 2',
  COMPUTER = 'Computer',
}

export enum GameSize {
  BASIC = 3,
  MEDIUM = 5,
  BIG = 20,
}

export enum Mark {
  X = 'x',
  O = 'o',
}

export enum MarkTurnMapping {
  x = 0,
  o = 1,
}

export enum Turn {
  FIRST = 0,
  SECOND = 1,
}

export enum WinCondition {
  BASIC = 3,
  ADVANCED = 5,
}

export const GameOption = {
  '3_3': {
    size: GameSize.BASIC,
    winCondition: WinCondition.BASIC,
  },
  '20_3': {
    size: GameSize.BIG,
    winCondition: WinCondition.BASIC,
  },
  '5_3': {
    size: GameSize.MEDIUM,
    winCondition: WinCondition.BASIC,
  },
  '20_5': {
    size: GameSize.BIG,
    winCondition: WinCondition.ADVANCED,
  },
  '5_5': {
    size: GameSize.MEDIUM,
    winCondition: WinCondition.ADVANCED,
  },
};

export const GameOptions = ['3_3', '5_3', '20_3', '5_5', '20_5'];

export enum Result {
  WIN = 'Win',
  LOSE = 'Lose',
  DRAW = 'Draw',
}

export const GameMode = {
  PVP: [Player.PLAYER_1, Player.PLAYER_2],
  PVC: [Player.PLAYER, Player.COMPUTER],
  CVP: [Player.COMPUTER, Player.PLAYER],
};

export const GameModes = ['PVP', 'PVC', 'CVP'];

export const START_INDEX = 0;

export enum WinType {
  HORIZONTAL = 'h-win',
  VERTICAL = 'r-win',
  LEFT_DIAGONAL = 'ld-win',
  RIGHT_DIAGONAL = 'rd-win',
}

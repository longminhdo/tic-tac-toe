export type Tile = string | null;
export type Turn = number;
export type Tiles = Array<Tile>;
export type Position = number | null;
export type Log = { turnIndex: Turn; position: Position };
export type Logs = Array<Log>;

export type Result = {
  gameOver: boolean;
  isDraw: boolean;
  winPositions: Array<Position>;
  winner: string;
  winType: string;
};

export type TicTacToe = {
  turnIndex: Turn;
  tiles: Tiles;
  setTiles: any;
  nextTurn: any;
  lastPosition: Position;
  setLastPosition: any;
  logs: Logs;
  setLogs: any;
  setTurnIndex: any;
  result: Result;
};

export type Tile = string | null;
export type Turn = 0 | 1;
export type Tiles = Array<Tile>;
export type Position = number | null;

export type TicTacToe = {
  turnIndex: Turn;
  tiles: Tiles;
  setTiles: any;
  nextTurn: any;
  lastPosition: Position;
  setLastPosition: any;
};

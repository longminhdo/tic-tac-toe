import { Player } from '@/constants/game';

export interface Game {
  size: number;
  players: Array<Player>;
  turnIndex: number;
  tiles: Array<string | null>;
  setTiles: any;
  setPlayers: any;
  setTurnIndex: any;
}

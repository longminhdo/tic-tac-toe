import { Player } from '@/constants/game';

export interface Game {
  size: number;
  player: Player;
  tiles: Array<string | null>;
  setTiles: any;
  setPlayer: any;
}

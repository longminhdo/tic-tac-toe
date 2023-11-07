import { Player } from '@/constants/game';

export type GameSettings = {
  winLength: number;
  size: number;
  players: Array<Player>;
  setPlayers: any;
  setWinLength: any;
  setSize: any;
};

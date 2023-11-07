import { Player } from '@/constants/game';

export type GameSettings = {
  winCondition: number;
  size: number;
  players: Array<Player>;
  setPlayers: any;
  setWinCondition: any;
  setSize: any;
};

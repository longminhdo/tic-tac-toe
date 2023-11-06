import { createContext } from 'react';
import { GameSize, Player } from '@/constants/game';
import { Game } from '@/types/ticTacToe';

export const TicTacToeContext = createContext<Game>({
  size: GameSize.BASIC,
  player: Player.PLAYER_1,
  tiles: [],
  setTiles: () => undefined,
  setPlayer: () => undefined,
});

import { createContext } from 'react';
import { GameSize, Player } from '@/constants/game';
import { Game } from '@/types/ticTacToe';

export const TicTacToeContext = createContext<Game>({
  size: GameSize.BASIC,
  players: [Player.PLAYER_1, Player.PLAYER_2],
  tiles: [],
  turnIndex: 0,
  setTiles: () => undefined,
  setPlayers: () => undefined,
  setTurnIndex: () => undefined,
});

import { createContext } from 'react';
import { TicTacToe } from '@/types/ticTacToe';

export const TicTacToeContext = createContext<TicTacToe>({
  tiles: [],
  turnIndex: 0,
  setTiles: () => undefined,
  nextTurn: () => undefined,
});

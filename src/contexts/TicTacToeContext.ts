import { createContext } from 'react';
import { TicTacToe } from '@/types/ticTacToe';

export const TicTacToeContext = createContext<TicTacToe>({
  tiles: [],
  turnIndex: 0,
  lastPosition: null,
  setTiles: () => undefined,
  nextTurn: () => undefined,
  setLastPosition: () => undefined,
  logs: [],
  setLogs: () => undefined,
  setTurnIndex: () => undefined,
  result: { gameOver: false, isDraw: false, winPositions: [], winner: '', winType: '' },
});

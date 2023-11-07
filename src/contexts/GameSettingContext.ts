import { createContext } from 'react';
import { GameSize, Player, WinCondition } from '@/constants/game';
import { GameSettings } from '@/types/gameSettings';

export const GameSettingsContext = createContext<GameSettings>({
  winCondition: WinCondition.BASIC,
  size: GameSize.BASIC,
  players: [Player.PLAYER_1, Player.PLAYER_2],
  setPlayers: () => undefined,
  setSize: () => undefined,
  setWinCondition: () => undefined,
});

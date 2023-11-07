import { createContext } from 'react';
import { GameSize, Player, WinLength } from '@/constants/game';
import { GameSettings } from '@/types/gameSettings';

export const GameSettingsContext = createContext<GameSettings>({
  winLength: WinLength.BASIC,
  size: GameSize.BASIC,
  players: [Player.PLAYER_1, Player.PLAYER_2],
  setPlayers: () => undefined,
  setSize: () => undefined,
  setWinLength: () => undefined,
});

import React, { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GameSize, Player, WinCondition } from '@/constants/game';
import { routePaths } from '@/constants/routePaths';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import GamePage from '@/pages/GamePage/GamePage';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  const [size, setSize] = useState<number>(() => GameSize.BASIC);
  const [winCondition, setWinCondition] = useState<number>(() => WinCondition.BASIC);
  const [players, setPlayers] = useState<Array<Player>>(() => [Player.PLAYER_1, Player.PLAYER_2]);

  const settingsContextValue = useMemo(
    () => ({ size, players, winCondition, setPlayers, setSize, setWinCondition }),
    [size, players, winCondition],
  );

  return (
    <GameSettingsContext.Provider value={settingsContextValue}>
      <Routes>
        <Route
          path={routePaths.DEFAULT}
          element={<Navigate to="/home" replace />}
        />

        <Route
          path={routePaths.HOME}
          element={(
            <HomePage />
          )}
        />

        <Route
          path={routePaths.GAME}
          element={(
            <GamePage />
          )}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </GameSettingsContext.Provider>
  );
};

export default App;

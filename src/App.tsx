import React, { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GameSize, Player, WinLength } from '@/constants/game';
import { routePaths } from '@/constants/routePaths';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import GamePage from '@/pages/GamePage/GamePage';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  const [size, setSize] = useState<number>(() => GameSize.BASIC);
  const [winLength, setWinLength] = useState<number>(() => WinLength.BASIC);
  const [players, setPlayers] = useState<Array<Player>>(() => [Player.PLAYER_1, Player.PLAYER_2]);

  const settingsContextValue = useMemo(
    () => ({ size, players, winLength, setPlayers, setSize, setWinLength }),
    [size, players, winLength],
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

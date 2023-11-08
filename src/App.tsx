import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Theme } from '@/constants/app';
import { GameSize, Player, WinCondition } from '@/constants/game';
import { routePaths } from '@/constants/routePaths';
import { AppContext } from '@/contexts/AppContext';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import GamePage from '@/pages/GamePage/GamePage';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  const [size, setSize] = useState<number>(() => GameSize.BASIC);
  const [winCondition, setWinCondition] = useState<number>(() => WinCondition.BASIC);
  const [players, setPlayers] = useState<Array<Player>>(() => [Player.PLAYER_1, Player.PLAYER_2]);
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const [theme, setTheme] = useState(() => Theme.LIGHT);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settingsContextValue = useMemo(
    () => ({ size, players, winCondition, setPlayers, setSize, setWinCondition }),
    [size, players, winCondition],
  );

  const appContextValue = useMemo(
    () => ({ theme, setTheme, windowWidth }),
    [theme, windowWidth],
  );

  return (
    <AppContext.Provider value={appContextValue}>
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
    </AppContext.Provider>
  );
};

export default App;

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routePaths } from '@/constants/routePaths';
import GamePage from '@/pages/GamePage/GamePage';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

function App() {
  return (
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
  );
}

export default App;

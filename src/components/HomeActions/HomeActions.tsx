import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/constants/routePaths';
import './HomeActions.scss';

const HomeActions: React.FC = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    // TODO: clear local storage
    navigate(routePaths.GAME, { replace: true });
  };

  const handleContinue = () => {
    navigate(routePaths.GAME, { replace: true });
  };

  return (
    <div className="home-actions">
      <div className="home-actions-btn start" onClick={handleNewGame}>New Game</div>
      <div className="home-actions-btn continue" onClick={handleContinue}>Continue</div>
    </div>
  );
};

export default HomeActions;

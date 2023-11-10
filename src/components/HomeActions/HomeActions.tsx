import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/constants/routePaths';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { getGameLocalStorageKey } from '@/utils/gameUtils';
import './HomeActions.scss';

const HomeActions: React.FC = () => {
  const { size, players, winCondition } = useContext(GameSettingsContext);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(() => !localStorage.getItem(getGameLocalStorageKey({ size, players, winCondition })));

  const handleNewGame = () => {
    const key = getGameLocalStorageKey({ size, players, winCondition });
    localStorage.removeItem(key);
    setTimeout(() => {
      navigate(routePaths.GAME, { replace: true });
    }, 0);
  };

  const handleContinue = () => {
    if (disabled) {
      return;
    }

    navigate(routePaths.GAME, { replace: true });
  };

  useEffect(() => {
    setDisabled(!localStorage.getItem(getGameLocalStorageKey({ size, players, winCondition })));
  }, [players, size, winCondition]);

  return (
    <div className="home-actions">
      <div className="home-actions-btn start" onClick={handleNewGame}>New Game</div>
      <div className={`home-actions-btn continue ${disabled ? 'disabled' : ''}`} onClick={handleContinue}>Continue</div>
    </div>
  );
};

export default HomeActions;

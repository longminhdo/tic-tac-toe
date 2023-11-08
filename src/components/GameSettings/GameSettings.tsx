import { ChevronLeft, ChevronRight } from 'akar-icons';
import React, { useState } from 'react';
import { GameMode, GameSize } from '@/constants/game';
import './GameSettings.scss';

const GameSettings: React.FC = () => {
  const [sizeOption, setSizeOption] = useState(() => GameSize.BASIC);
  const [mode, setMode] = useState(() => GameMode.PVP);

  return (
    <div className="game-settings">
      <div className="game-options">
        <ChevronLeft strokeWidth={4} size={36} className="game-options-btn" />
        <span>
          {sizeOption}
          {' '}
          x
          {' '}
          {sizeOption}
        </span>
        <ChevronRight strokeWidth={4} size={36} className="game-options-btn" />
      </div>
      <div className="game-options">
        <ChevronLeft strokeWidth={4} size={36} className="game-options-btn" />
        <span>
          {mode}
        </span>
        <ChevronRight strokeWidth={4} size={36} className="game-options-btn" />
      </div>
    </div>
  );
};

export default GameSettings;

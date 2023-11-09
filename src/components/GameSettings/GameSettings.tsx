import { ChevronLeft, ChevronRight } from 'akar-icons';
import { isEqual } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { GameMode, GameModes, GameOption, GameOptions, START_INDEX } from '@/constants/game';
import './GameSettings.scss';

const getGameOption = (index) => {
  const gameOptionKey = GameOptions[index];

  if (!gameOptionKey) {
    return { size: null, winCondition: null };
  }

  return GameOption[gameOptionKey];
};

const getModeOption = (index) => {
  const modeOptionKey = GameModes[index];

  if (!modeOptionKey) {
    return [];
  }

  return GameMode[modeOptionKey];
};

const renderGameOption = (optionIndex) => {
  const { size, winCondition } = getGameOption(optionIndex);

  return `${size} x ${size} (Win: ${winCondition})`;
};

const renderModeOption = (modeIndex) => {
  const mode = getModeOption(modeIndex);

  return mode.join(' x ');
};

const GameSettings: React.FC = () => {
  const [optionIndex, setOptionIndex] = useState<number>(START_INDEX);
  const [modeIndex, setMode] = useState<number>(START_INDEX);

  const optionIndexRef = useRef<number>();
  const modeIndexRef = useRef<number>();

  const { setPlayers, setSize, setWinCondition } = useContext(GameSettingsContext);

  const handleNextOption = () => {
    setOptionIndex(prev => {
      if (prev === GameOptions.length - 1) {
        return START_INDEX;
      }

      return prev + 1;
    });
  };

  const handlePrevOption = () => {
    setOptionIndex(prev => {
      if (prev === START_INDEX) {
        return GameOptions.length - 1;
      }

      return prev - 1;
    });
  };

  const handleNextMode = () => {
    setMode(prev => {
      if (prev === GameModes.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  const handlePrevMode = () => {
    setMode(prev => {
      if (prev === START_INDEX) {
        return GameModes.length - 1;
      }

      return prev - 1;
    });
  };

  useEffect(() => {
    if (isEqual(optionIndexRef.current, optionIndex)) {
      return;
    }
    optionIndexRef.current = optionIndex;

    const { size, winCondition } = getGameOption(optionIndex);

    setSize(size);
    setWinCondition(winCondition);
  }, [optionIndex, setSize, setWinCondition]);

  useEffect(() => {
    if (isEqual(modeIndexRef.current, modeIndex)) {
      return;
    }
    modeIndexRef.current = modeIndex;

    setPlayers(getModeOption(modeIndex));
  }, [modeIndex, setPlayers]);

  return (
    <div className="game-settings">
      <div className="game-options">
        <ChevronLeft strokeWidth={4} size={36} className="game-options-btn" onClick={handlePrevOption} />
        <span>
          {renderGameOption(optionIndex)}
        </span>
        <ChevronRight strokeWidth={4} size={36} className="game-options-btn" onClick={handleNextOption} />
      </div>
      <div className="game-options">
        <ChevronLeft strokeWidth={4} size={36} className="game-options-btn" onClick={handlePrevMode} />
        <span>
          {renderModeOption(modeIndex)}
        </span>
        <ChevronRight strokeWidth={4} size={36} className="game-options-btn" onClick={handleNextMode} />
      </div>
    </div>
  );
};

export default GameSettings;

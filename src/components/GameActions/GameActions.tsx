import { ArrowCounterClockwise, ArrowCycle } from 'akar-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Breakpoints, IconButtonSize } from '@/constants/app';
import { AppContext } from '@/contexts/AppContext';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import { getInitialLastPosition, getInitialLogs, getInitialTiles, getInitialTurnIndex } from '@/utils/gameUtils';
import './GameActions.scss';

const GameActions: React.FC = () => {
  const { windowWidth } = useContext(AppContext);
  const { size } = useContext(GameSettingsContext);
  const { logs, setTiles, setLogs, setLastPosition, setTurnIndex } = useContext(TicTacToeContext);

  const [btnSize, setBtnSize] = useState<number>(() => (windowWidth > Breakpoints.MD ? IconButtonSize.DESKTOP : IconButtonSize.MOBILE));

  useEffect(() => {
    if (windowWidth > Breakpoints.MD) {
      setBtnSize(IconButtonSize.DESKTOP);
      return;
    }

    setBtnSize(IconButtonSize.MOBILE);
  }, [windowWidth]);

  const handleUndo = () => {
    setLogs(prev => {
      const newLogs = [...prev];
      const lastMove = prev.at(-1);
      const beforeLastMove = prev.at(-2);
      const prevPosition = lastMove?.position;
      const prevTurnIndex = lastMove?.turnIndex;

      if (prevPosition || prevPosition === 0) {
        setTiles(prev => {
          const newTiles = [...prev];
          newTiles[prevPosition] = null;

          return newTiles;
        });
      }

      if (prevTurnIndex || prevTurnIndex === 0) {
        setTurnIndex(prevTurnIndex);
      }

      if (beforeLastMove) {
        setLastPosition(beforeLastMove.position);
      } else {
        setLastPosition(null);
      }

      newLogs.pop();

      return newLogs;
    });
  };

  const handleRestart = () => {
    setTiles(getInitialTiles({ size, reset: true }));
    setLogs(getInitialLogs({ size, reset: true }));
    setTurnIndex(getInitialTurnIndex({ size, reset: true }));
    setLastPosition(getInitialLastPosition({ size, reset: true }));
  };

  return (
    <div className="game-actions">
      <div className={`game-actions-btn ${logs.at(-1) ? '' : 'disabled'}`} onClick={handleUndo}>
        <ArrowCounterClockwise strokeWidth={2} size={btnSize} />
      </div>
      <div className="game-actions-btn" onClick={handleRestart}>
        <ArrowCycle strokeWidth={2} size={btnSize} />
      </div>
    </div>
  );
};

export default GameActions;

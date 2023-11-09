import { ArrowCounterClockwise, ArrowCycle } from 'akar-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Breakpoints, IconButtonSize } from '@/constants/app';
import { AppContext } from '@/contexts/AppContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './GameActions.scss';

const GameActions: React.FC = () => {
  const { windowWidth } = useContext(AppContext);
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

  const handleReset = () => {
    console.log('reset');
  };

  return (
    <div className="game-actions">
      <div className={`game-actions-btn ${logs.at(-1) ? '' : 'disabled'}`}>
        <ArrowCounterClockwise strokeWidth={2} size={btnSize} onClick={handleUndo} />
      </div>
      <div className="game-actions-btn">
        <ArrowCycle strokeWidth={2} size={btnSize} onClick={handleReset} />
      </div>
    </div>
  );
};

export default GameActions;

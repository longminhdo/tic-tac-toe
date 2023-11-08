import { ArrowCounterClockwise, ArrowCycle } from 'akar-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Breakpoints, IconButtonSize } from '@/constants/app';
import { AppContext } from '@/contexts/AppContext';
import './GameActions.scss';

const GameActions: React.FC = () => {
  const { windowWidth } = useContext(AppContext);
  const [btnSize, setBtnSize] = useState<number>(() => (windowWidth > Breakpoints.MD ? IconButtonSize.DESKTOP : IconButtonSize.MOBILE));


  useEffect(() => {
    if (windowWidth > Breakpoints.MD) {
      setBtnSize(IconButtonSize.DESKTOP);
      return;
    }

    setBtnSize(IconButtonSize.MOBILE);
  }, [windowWidth]);

  const handleUndo = () => {
    console.log('undo');
  };

  const handleReset = () => {
    console.log('reset');
  };

  return (
    <div className="game-actions">
      <div className="game-actions-btn">
        <ArrowCounterClockwise strokeWidth={2} size={btnSize} onClick={handleUndo} />
      </div>
      <div className="game-actions-btn">
        <ArrowCycle strokeWidth={2} size={btnSize} onClick={handleReset} />
      </div>
    </div>
  );
};

export default GameActions;

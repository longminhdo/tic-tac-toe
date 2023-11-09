import { ChevronLeft } from 'akar-icons';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicTacToe from '@/components/TicTacToe/TicTacToe';
import { Breakpoints, IconButtonSize } from '@/constants/app';
import { routePaths } from '@/constants/routePaths';
import { AppContext } from '@/contexts/AppContext';
import './GamePage.scss';

const GamePage: React.FC = () => {
  const { windowWidth } = useContext(AppContext);
  const [btnSize, setBtnSize] = useState<number>(() => (windowWidth > Breakpoints.MD ? IconButtonSize.DESKTOP : IconButtonSize.MOBILE));
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(routePaths.HOME, { replace: true });
  };

  useEffect(() => {
    if (windowWidth > Breakpoints.MD) {
      setBtnSize(IconButtonSize.DESKTOP);
      return;
    }

    setBtnSize(IconButtonSize.MOBILE);
  }, [windowWidth]);

  return (
    <div className="game-page">
      <div className="page-header">
        <ChevronLeft strokeWidth={3} size={btnSize} className="back-btn" onClick={handleGoBack} />
        <h1>Tic Tac Toe</h1>
        <ChevronLeft strokeWidth={3} size={btnSize} className="back-btn" style={{ visibility: 'hidden' }} />
      </div>
      <div className="page-body">
        <TicTacToe />
      </div>
    </div>
  );
};

export default GamePage;

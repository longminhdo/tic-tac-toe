import React from 'react';
import TicTacToe from '@/components/TicTacToe/TicTacToe';
import './GamePage.scss';

// TODO: Dynamic board game size

const GamePage = () => {
  console.log('game page');

  return (
    <div className="game-page">
      <TicTacToe size={3} winLength={3} />
    </div>
  );
};

export default GamePage;

import React from 'react';
import TicTacToe from '@/components/TicTacToe/TicTacToe';
import './GamePage.scss';

// TODO: Dynamic board game size

const GamePage: React.FC = () => {
  console.log('game page');

  return (
    <div className="game-page">
      <h1>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
};

export default GamePage;

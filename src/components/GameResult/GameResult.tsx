import React from 'react';
import './GameResult.scss';

interface IGameResult {
  result: any;
}

const GameResult: React.FC<IGameResult> = ({ result }) => {
  const { gameOver } = result;

  if (!gameOver) {
    return null;
  }

  return <div className="game-result">Game Over</div>;
};

export default GameResult;

import React from 'react';
import './GameResult.scss';

interface GameResultProps {
  result: any;
}

const GameResult: React.FC<GameResultProps> = ({ result }) => {
  const { gameOver } = result;

  if (!gameOver) {
    return null;
  }

  return <div className="game-result">Game Over</div>;
};

export default GameResult;

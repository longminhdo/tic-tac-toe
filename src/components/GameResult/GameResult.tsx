import React, { useContext } from 'react';
import { MarkTurnMapping } from '@/constants/game';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { Result } from '@/types/ticTacToe';
import './GameResult.scss';

interface IGameResult {
  result: any;
}

const renderResultContent = ({ winner, players }) => {
  const player = players[MarkTurnMapping[winner]];

  if (!player) {
    return 'Draw';
  }

  return `${player} win`;
};

const GameResult: React.FC<IGameResult> = ({ result }: { result: Result }) => {
  const { gameOver, winner } = result;
  const { players } = useContext(GameSettingsContext);

  if (!gameOver) {
    return null;
  }

  return (
    <div className="game-result">
      <span className="game-over-text">Game Over</span>
      <span className="game-result-content">
        {renderResultContent({ winner, players })}
      </span>
    </div>
  );
};

export default GameResult;

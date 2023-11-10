import React, { useContext } from 'react';
import { MarkTurnMapping } from '@/constants/game';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { Result } from '@/types/ticTacToe';
import './GameResult.scss';

interface IGameResult {
  result: any;
}

const renderWinner = ({ winner, players }) => {
  const player = players[MarkTurnMapping[winner]];

  return player;
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
      <span className="win-player-text">
        {renderWinner({ winner, players })}
        {' '}
        win
      </span>
    </div>
  );
};

export default GameResult;

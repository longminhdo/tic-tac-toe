import { isEqual } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Board from '@/components/Board/Board';
import GameResult from '@/components/GameResult/GameResult';
import { Player, Turn } from '@/constants/game';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import { Position, Turn as TTurn, Tiles } from '@/types/ticTacToe';
import { checkWinner } from '@/utils/gameUtils';
import './TicTacToe.scss';

const TicTacToe: React.FC = () => {
  const { size, winCondition } = useContext(GameSettingsContext);
  const [tiles, setTiles] = useState(() => Array(size * size).fill(null));
  const [players, setPlayers] = useState(() => [Player.PLAYER_1, Player.PLAYER_2]);
  const [turnIndex, setTurnIndex] = useState<TTurn>(Turn.FIRST);
  const [lastPosition, setLastPosition] = useState<Position>(null);
  const [result, setResult] = useState<any>('');

  const tilesRef = useRef<Tiles>(Array(size * size).fill(null));

  const nextTurn = useCallback(() => {
    setTurnIndex(prev => {
      if (Turn.FIRST === prev) {
        return Turn.SECOND;
      }

      return Turn.FIRST;
    });
  }, []);

  useEffect(() => {
    if (isEqual(tilesRef.current, tiles)) {
      return;
    }

    tilesRef.current = [...tiles];
    const result = checkWinner({ tiles, winCondition, size, position: lastPosition });

    setResult(result);
  }, [lastPosition, size, tiles, winCondition]);

  const gameContextValue = useMemo(
    () => ({ lastPosition, size, tiles, players, turnIndex, setTiles, setPlayers, setTurnIndex, nextTurn, setLastPosition }),
    [lastPosition, size, tiles, players, turnIndex, nextTurn, setLastPosition],
  );

  return (
    <TicTacToeContext.Provider value={gameContextValue}>
      <div className={`tic-tac-toe ${result?.gameOver ? 'game-over' : ''}`}>
        <Board />
        <GameResult result={result} />
      </div>
    </TicTacToeContext.Provider>
  );
};

export default TicTacToe;

import { isEqual } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Board from '@/components/Board/Board';
import GameActions from '@/components/GameActions/GameActions';
import GameResult from '@/components/GameResult/GameResult';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import { Logs, Position, Turn as TTurn, Tiles } from '@/types/ticTacToe';
import { checkWinner, getInitialTiles } from '@/utils/gameUtils';
import './TicTacToe.scss';

const START_INDEX = 0;

const TicTacToe: React.FC = () => {
  const { size, winCondition, players } = useContext(GameSettingsContext);

  const [tiles, setTiles] = useState(() => getInitialTiles(size));
  const [turnIndex, setTurnIndex] = useState<TTurn>(START_INDEX);
  const [lastPosition, setLastPosition] = useState<Position>(null);
  const [result, setResult] = useState<any>('');
  const [logs, setLogs] = useState<Logs>([]);

  const tilesRef = useRef<Tiles>(getInitialTiles(size));

  const nextTurn = useCallback(() => {
    setTurnIndex(prev => {
      if (prev === players.length - 1) {
        return START_INDEX;
      }

      return ++prev;
    });
  }, [players.length]);

  useEffect(() => {
    if (isEqual(tilesRef.current, tiles)) {
      return;
    }

    tilesRef.current = [...tiles];
    const result = checkWinner({ tiles, winCondition, size, position: lastPosition });

    setResult(result);
  }, [lastPosition, size, tiles, winCondition]);

  const gameContextValue = useMemo(
    () => ({ logs, setLogs, lastPosition, size, tiles, turnIndex, setTiles, setTurnIndex, nextTurn, setLastPosition }),
    [logs, lastPosition, size, tiles, turnIndex, nextTurn],
  );

  return (
    <TicTacToeContext.Provider value={gameContextValue}>
      <div className="tic-tac-toe">
        <GameActions />

        <div className={`board-wrapper ${result?.gameOver ? 'game-over' : ''}`}>
          <Board />
          <GameResult result={result} />
        </div>
      </div>
    </TicTacToeContext.Provider>
  );
};

export default TicTacToe;

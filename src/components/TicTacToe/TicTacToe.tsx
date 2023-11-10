import { isEqual } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Board from '@/components/Board/Board';
import GameActions from '@/components/GameActions/GameActions';
import GameResult from '@/components/GameResult/GameResult';
import { START_INDEX } from '@/constants/game';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import { Logs, Position, Result, Turn as TTurn, Tiles } from '@/types/ticTacToe';
import { checkWinner, getGameLocalStorageKey, getInitialLastPosition, getInitialLogs, getInitialTiles, getInitialTurnIndex } from '@/utils/gameUtils';
import './TicTacToe.scss';

const TicTacToe: React.FC = () => {
  const { size, winCondition, players } = useContext(GameSettingsContext);

  const [tiles, setTiles] = useState(() => getInitialTiles({ size, key: getGameLocalStorageKey({ size, winCondition, players }) }));
  const [turnIndex, setTurnIndex] = useState<TTurn>(() => getInitialTurnIndex({ key: getGameLocalStorageKey({ size, winCondition, players }) }));
  const [lastPosition, setLastPosition] = useState<Position>(() => getInitialLastPosition({ key: getGameLocalStorageKey({ size, winCondition, players }) }));
  const [logs, setLogs] = useState<Logs>(() => getInitialLogs({ key: getGameLocalStorageKey({ size, winCondition, players }) }));
  const [result, setResult] = useState<Result>(() => checkWinner(
    {
      size,
      winCondition,
      tiles: getInitialTiles({ size, key: getGameLocalStorageKey({ size, winCondition, players }) }),
      position: getInitialLastPosition({ key: getGameLocalStorageKey({ size, winCondition, players }) }),
    },
  ));

  const tilesRef = useRef<Tiles>(getInitialTiles({ size, key: getGameLocalStorageKey({ size, winCondition, players }) }));
  const lastPositionRef = useRef<Position>(getInitialLastPosition({ key: getGameLocalStorageKey({ size, winCondition, players }) }));
  const debounce = useRef<any>();

  const nextTurn = useCallback(() => {
    setTurnIndex(prev => {
      if (prev === players.length - 1) {
        return START_INDEX;
      }

      return ++prev;
    });
  }, [players.length]);

  useEffect(() => {
    if (isEqual(tilesRef.current, tiles) && isEqual(lastPositionRef.current, lastPosition)) {
      return;
    }

    tilesRef.current = [...tiles];
    lastPositionRef.current = lastPosition;
    const result = checkWinner({ tiles, winCondition, size, position: lastPosition });

    setResult(result);
  }, [lastPosition, size, tiles, winCondition]);

  useEffect(() => {

  }, [players, size, winCondition, tiles, turnIndex, lastPosition, logs]);


  useEffect(() => {
    (() => {
      clearTimeout(debounce.current);

      debounce.current = setTimeout(async () => {
        const gameLocalStorageKey = getGameLocalStorageKey({ size, winCondition, players });

        if (tiles.every(t => !t)) {
          localStorage.removeItem(gameLocalStorageKey);
          return;
        }

        localStorage.setItem(gameLocalStorageKey, JSON.stringify({ tiles, turnIndex, lastPosition, logs }));
      }, 200);
    })();
  }, [lastPosition, logs, players, size, tiles, turnIndex, winCondition]);

  const gameContextValue = useMemo(
    () => ({ result, logs, setLogs, lastPosition, size, tiles, turnIndex, setTiles, setTurnIndex, nextTurn, setLastPosition }),
    [result, logs, lastPosition, size, tiles, turnIndex, nextTurn],
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

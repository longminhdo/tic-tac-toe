import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Board from '@/components/Board/Board';
import { Mark, Player } from '@/constants/game';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './TicTacToe.scss';

interface TicTacToeProps {
  size: number;
  winLength: number;
}

const checkWinner = ({ tiles, winLength }) => {

};

const TicTacToe: FunctionComponent<TicTacToeProps> = ({ size, winLength }) => {
  const [tiles, setTiles] = useState(() => Array(size * size).fill(null));
  const [players, setPlayers] = useState(() => [Player.PLAYER_1, Player.PLAYER_2]);
  const [turnIndex, setTurnIndex] = useState(0);
  // check winner after each move

  const gameContextValue = useMemo(
    () => ({ size, tiles, players, turnIndex, setTiles, setPlayers, setTurnIndex }),
    [size, tiles, players, turnIndex],
  );

  return (
    <TicTacToeContext.Provider value={gameContextValue}>
      <div className="tic-tac-toe">
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    </TicTacToeContext.Provider>
  );
};

export default TicTacToe;

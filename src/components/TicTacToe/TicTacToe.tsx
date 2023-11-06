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
  console.log('Tic tac toe');
  const [tiles, setTiles] = useState(() => Array(size * size).fill(Mark.CROSS));
  const [player, setPlayer] = useState(() => Player.PLAYER_1);
  // check winner after each move

  useEffect(() => {
    setTiles(prev => {
      const newArr = [...prev];
      newArr[2] = Mark.NOUGHT;
      newArr[6] = null;

      return newArr;
    });
  }, []);

  const gameContextValue = useMemo(() => ({ size, tiles, player, setTiles, setPlayer }), [size, tiles, player]);

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

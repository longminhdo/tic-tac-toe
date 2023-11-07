import React, { useCallback, useContext, useMemo, useState } from 'react';
import Board from '@/components/Board/Board';
import { Player, Turn } from '@/constants/game';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './TicTacToe.scss';


const checkWinner = ({ tiles, winLength }) => {

};

const TicTacToe: React.FC = () => {
  const { size, winLength } = useContext(GameSettingsContext);
  const [tiles, setTiles] = useState(() => Array(size * size).fill(null));
  const [players, setPlayers] = useState(() => [Player.PLAYER_1, Player.PLAYER_2]);
  const [turnIndex, setTurnIndex] = useState(0);
  // check winner after each move

  const nextTurn = useCallback(() => {
    setTurnIndex(prev => {
      if (Turn.FIRST === prev) {
        return Turn.SECOND;
      }

      return Turn.FIRST;
    });
  }, []);

  const gameContextValue = useMemo(
    () => ({ size, tiles, players, turnIndex, setTiles, setPlayers, setTurnIndex, nextTurn }),
    [size, tiles, players, turnIndex, nextTurn],
  );

  return (
    <TicTacToeContext.Provider value={gameContextValue}>
      <div className="tic-tac-toe">
        <Board />
      </div>
    </TicTacToeContext.Provider>
  );
};

export default TicTacToe;

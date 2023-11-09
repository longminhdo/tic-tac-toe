/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import Tile from '@/components/Tile/Tile';
import { GameSize } from '@/constants/game';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './Board.scss';

const Board: React.FC = () => {
  const { tiles } = useContext(TicTacToeContext);
  const { size } = useContext(GameSettingsContext);

  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
      {tiles.map((t, i) => <Tile position={i} key={i} tile={t} borderWidth={size > GameSize.MEDIUM ? 1 : undefined} />)}
    </div>
  );
};

export default Board;

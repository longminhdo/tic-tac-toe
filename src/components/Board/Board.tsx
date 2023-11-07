/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import Tile from '@/components/Tile/Tile';
import { GameSettingsContext } from '@/contexts/GameSettingContext';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './Board.scss';

const getGridTemplateColumns = (size) => {
  let template = '';
  for (let i = 0; i < size; i++) {
    template += 'auto ';
  }

  return template.trim();
};

const Board: React.FC = () => {
  const { tiles } = useContext(TicTacToeContext);
  const { size } = useContext(GameSettingsContext);

  return (
    <div className="board" style={{ gridTemplateColumns: getGridTemplateColumns(size) }}>
      {tiles.map((t, i) => <Tile position={i} key={i} tile={t} />)}
    </div>
  );
};

export default Board;

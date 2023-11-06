import { Circle, Cross } from 'akar-icons';
import React, { FunctionComponent, useContext } from 'react';
import { Mark, Player } from '@/constants/game';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './Tile.scss';

export interface ITileProps {
  tile: string | null;
  position: number;
}

const renderTileContent = ({ tile, player }) => {
  if (tile === Mark.CROSS) {
    return (
      <div className="tile-content">
        <Cross strokeWidth={2} size="80%" />
      </div>
    );
  }

  if (tile === Mark.NOUGHT) {
    return (
      <div className="tile-content">
        <Circle strokeWidth={2} size="80%" />
      </div>
    );
  }

  return (
    <div className="tile-content empty">
      {
        [Player.COMPUTER_1, Player.PLAYER_1].includes(player)
          ? <Cross strokeWidth={2} size="80%" />
          : <Circle strokeWidth={2} size="80%" />
      }
    </div>
  );
};

// TODO: render winner strike
const renderWinnerStrikeClass = ({ position }) => {
  const strikeClass = '';

  return strikeClass;
};

const Tile: FunctionComponent<ITileProps> = ({ tile, position }) => {
  const { player } = useContext(TicTacToeContext);

  return (
    <div className={`tile ${renderWinnerStrikeClass({ position })}`}>
      {renderTileContent({ tile, player })}
    </div>
  );
};

export default Tile;

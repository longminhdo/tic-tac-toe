import { Circle, Cross } from 'akar-icons';
import React, { FunctionComponent, useContext } from 'react';
import { Mark, Turn } from '@/constants/game';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './Tile.scss';

export interface ITileProps {
  tile: string | null;
  position: number;
}

const renderTileContent = ({ tile, turnIndex }) => {
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
        turnIndex === Turn.FIRST
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
  const { turnIndex, setTiles, setTurnIndex } = useContext(TicTacToeContext);

  const handleTileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (tile) {
      return;
    }

    setTiles(prev => {
      const newTiles = [...prev];

      if (turnIndex === Turn.FIRST) {
        newTiles[position] = Mark.CROSS;
        setTurnIndex(Turn.SECOND);
      } else {
        newTiles[position] = Mark.NOUGHT;
        setTurnIndex(Turn.FIRST);
      }

      return newTiles;
    });
  };

  return (
    <div className={`tile ${renderWinnerStrikeClass({ position })}`} onClick={handleTileClick}>
      {renderTileContent({ tile, turnIndex })}
    </div>
  );
};

export default Tile;

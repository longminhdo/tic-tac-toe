import { Circle, Cross } from 'akar-icons';
import React, { useContext } from 'react';
import { Mark, Turn } from '@/constants/game';
import { TicTacToeContext } from '@/contexts/TicTacToeContext';
import './Tile.scss';

const WIN_TILE_CLASS = 'win-tile';

export interface ITile {
  tile: string | null;
  position: number;
  borderWidth?: number;
}

const renderTileContent = ({ tile, turnIndex }) => {
  if (tile === Mark.X) {
    return (
      <div className="tile-content">
        <Cross strokeWidth={2} size="80%" />
      </div>
    );
  }

  if (tile === Mark.O) {
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

const renderWinnerStrikeClass = ({ position, result }) => {
  const { winPositions, winType } = result;

  if (winPositions.includes(position)) {
    return `${winType} ${WIN_TILE_CLASS}`;
  }

  return '';
};

const Tile: React.FC<ITile> = ({ tile, position, borderWidth }) => {
  const { result, turnIndex, setTiles, nextTurn, setLastPosition, setLogs } = useContext(TicTacToeContext);

  const handleTileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (tile) {
      return;
    }

    setTiles(prev => {
      const newTiles = [...prev];
      if (turnIndex === Turn.FIRST) {
        newTiles[position] = Mark.X;
      } else {
        newTiles[position] = Mark.O;
      }

      return newTiles;
    });

    setLastPosition(position);

    setLogs(prev => {
      const newLogs = [...prev];
      newLogs.push({ turnIndex, position });

      return newLogs;
    });

    nextTurn();
  };

  return (
    <div style={{ borderWidth }} className={`tile ${renderWinnerStrikeClass({ position, result })}`} onClick={handleTileClick}>
      {renderTileContent({ tile, turnIndex })}
    </div>
  );
};

export default Tile;

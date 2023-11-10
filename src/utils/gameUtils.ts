import { isEqual, isNull } from 'lodash';
import { START_INDEX, WinType } from '@/constants/game';
import { Position, Tiles } from '@/types/ticTacToe';
import { getFromLocalStorage } from '@/utils/utils';

const isOnLeftBorder = ({ position, size }) => {
  const col = position % size;

  if (col === 0) {
    return true;
  }

  return false;
};

const isOnRightBorder = ({ position, size }) => {
  const col = position % size;

  if (col === size - 1) {
    return true;
  }

  return false;
};

const isOnTopBorder = ({ position, size }) => {
  const row = Math.floor(position / size);

  if (row === 0) {
    return true;
  }

  return false;
};

const isOnBottomBorder = ({ position, size }) => {
  const row = Math.floor(position / size);

  if (row === size - 1) {
    return true;
  }

  return false;
};

const checkHorizontal = ({ position, tiles, size, winCondition }) => {
  const currentTile = tiles[position];
  const currentRow = Math.floor(position / size);
  const rightEndPos = currentRow * size + size - 1;
  const leftEndPos = currentRow * size;
  const winPositions: Array<number> = [position];

  for (let i = 1; i < size; i++) {
    const checkingIndex = position - i;
    const checkingTile = tiles[checkingIndex];

    if (leftEndPos > checkingIndex) {
      break;
    }

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }
  }

  for (let i = 1; i < size; i++) {
    const checkingIndex = position + i;
    const checkingTile = tiles[checkingIndex];

    if (rightEndPos < checkingIndex) {
      break;
    }

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }
  }

  return { isWin: winPositions.length === winCondition, winPositions, winner: currentTile };
};

const checkVertical = ({ position, tiles, size, winCondition }) => {
  const currentTile = tiles[position];
  const currentCol = position % size;
  const topEndPos = currentCol;
  const bottomEndPos = (size - 1) * size + currentCol;
  const winPositions: Array<number> = [position];

  for (let i = 1; i < size; i++) {
    const checkingIndex = position - size * i;
    const checkingTile = tiles[checkingIndex];

    if (topEndPos > checkingIndex) {
      break;
    }

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }
  }

  for (let i = 1; i < size; i++) {
    const checkingIndex = position + size * i;
    const checkingTile = tiles[checkingIndex];

    if (bottomEndPos < checkingIndex) {
      break;
    }

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }
  }

  return { isWin: winPositions.length === winCondition, winPositions, winner: currentTile };
};

const checkLeftDiagonal = ({ position, tiles, size, winCondition }) => {
  const currentTile = tiles[position];
  const topLeftEndPos = 0;
  const bottomRightEndPos = size * size - 1;
  const winPositions: Array<number> = [position];

  for (let i = 1; i < size; i++) {
    const checkingIndex = position - (size + 1) * i;
    const checkingTile = tiles[checkingIndex];

    if (topLeftEndPos > checkingIndex) {
      break;
    }

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }
  }

  for (let i = 1; i < size; i++) {
    const checkingIndex = position + (size + 1) * i;
    const checkingTile = tiles[checkingIndex];

    if (bottomRightEndPos < checkingIndex) {
      break;
    }

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }
  }

  return { isWin: winPositions.length === winCondition, winPositions, winner: currentTile };
};

const checkRightDiagonal = ({ position, tiles, size, winCondition }) => {
  const currentTile = tiles[position];
  const winPositions: Array<number> = [];

  for (let i = 0; i < size; i++) {
    const checkingIndex = position - (size - 1) * i;

    const checkingTile = tiles[checkingIndex];

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }

    if (isOnTopBorder({ position: checkingIndex, size }) || isOnRightBorder({ position: checkingIndex, size })) {
      break;
    }
  }

  winPositions.shift();

  for (let i = 0; i < size; i++) {
    const checkingIndex = position + (size - 1) * i;
    const checkingTile = tiles[checkingIndex];

    if (isEqual(currentTile, checkingTile)) {
      winPositions.push(checkingIndex);
    } else {
      break;
    }

    if (isOnLeftBorder({ position: checkingIndex, size }) || isOnBottomBorder({ position: checkingIndex, size })) {
      break;
    }
  }

  return { isWin: winPositions.length === winCondition, winPositions, winner: currentTile };
};

const keepPlayingResult = { gameOver: false, isDraw: false, winPositions: [], winner: '', winType: '' };

export const checkWinner = ({
  tiles,
  size,
  winCondition,
  position,
}: {
  tiles: Tiles;
  size: number;
  winCondition: number;
  position: Position;
}) => {
  if (tiles.every((t) => !t)) {
    return keepPlayingResult;
  }

  if (isNull(position)) {
    return keepPlayingResult;
  }

  const {
    isWin: isHWin,
    winPositions: hWinPositions,
    winner: hWinner,
  } = checkHorizontal({
    position,
    tiles,
    size,
    winCondition,
  });
  if (isHWin) {
    return { gameOver: true, isDraw: false, winPositions: hWinPositions, winner: hWinner, winType: WinType.HORIZONTAL };
  }

  const {
    isWin: isVWin,
    winPositions: vWinPositions,
    winner: vWinner,
  } = checkVertical({
    position,
    tiles,
    size,
    winCondition,
  });
  if (isVWin) {
    return { gameOver: true, isDraw: false, winPositions: vWinPositions, winner: vWinner, winType: WinType.VERTICAL };
  }

  const {
    isWin: isLdWin,
    winPositions: ldWinPositions,
    winner: ldWinner,
  } = checkLeftDiagonal({
    position,
    tiles,
    size,
    winCondition,
  });
  if (isLdWin) {
    return {
      gameOver: true,
      isDraw: false,
      winPositions: ldWinPositions,
      winner: ldWinner,
      winType: WinType.LEFT_DIAGONAL,
    };
  }

  const {
    isWin: isRdWin,
    winPositions: rdWinPositions,
    winner: rdWinner,
  } = checkRightDiagonal({
    position,
    tiles,
    size,
    winCondition,
  });
  if (isRdWin) {
    return {
      gameOver: true,
      isDraw: false,
      winPositions: rdWinPositions,
      winner: rdWinner,
      winType: WinType.RIGHT_DIAGONAL,
    };
  }

  if (tiles.every((t) => t)) {
    return { gameOver: true, isDraw: true, winPositions: [], winner: '', winType: '' };
  }

  return keepPlayingResult;
};

export const getSavedGame = ({ key = '', reset = false }: { key?: string; reset?: boolean }) => {
  const savedTiles = getFromLocalStorage(key);
  if (reset || !key || !savedTiles) {
    return { tiles: undefined, turnIndex: undefined, lastPosition: undefined, logs: undefined };
  }

  return savedTiles;
};

export const getInitialTiles = ({ size, key = '', reset = false }: { size: number; key?: string; reset?: boolean }) => {
  const { tiles } = getSavedGame({ key, reset });
  if (reset || !key || !tiles) {
    return Array(size * size).fill(null);
  }

  return tiles;
};

export const getInitialLogs = ({ key = '', reset = false }: { key?: string; reset?: boolean }) => {
  const { logs } = getSavedGame({ key, reset });
  if (reset || !key || !logs) {
    return [];
  }

  return logs;
};

export const getInitialTurnIndex = ({ key = '', reset = false }: { key?: string; reset?: boolean }) => {
  const { turnIndex } = getSavedGame({ key, reset });
  if (reset || !key || !turnIndex) {
    return START_INDEX;
  }

  return turnIndex;
};

export const getInitialLastPosition = ({ key = '', reset = false }: { key?: string; reset?: boolean }) => {
  const { lastPosition } = getSavedGame({ key, reset });
  if (reset || !key || !lastPosition) {
    return null;
  }

  return lastPosition;
};
export const getGameLocalStorageKey = ({ size, winCondition, players }) => {
  if (!size || !winCondition || !players) {
    return '';
  }

  return `${size}_${winCondition}_${players.join('').replace(/\s/g, '_')}`;
};

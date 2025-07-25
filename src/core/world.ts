import { CellState, create as createCell, isAlive, regenerate } from './cell';

type CellCoordinates = CellState[];
type WorldMatrix = CellState[][];

function create(worldMatrix: WorldMatrix): WorldMatrix {
  return worldMatrix.map((row: CellState[]): CellState[] =>
    row.map((column: CellState): CellState => createCell(column))
  );
}

function cellStateToNumber(state: CellState): 1 | 0 {
  return isAlive(state) ? 1 : 0;
}

function aliveNeighborsByCurrentRow(yIndex: number): (row: CellState[]) => number {
  return function (row: CellState[]): number {
    const previousCell: CellState = row?.[yIndex - 1];
    const nextCell: CellState = row?.[yIndex + 1];
    return cellStateToNumber(previousCell) + cellStateToNumber(nextCell);
  };
}

function aliveNeighborsByDifferentRow(yIndex: number): (roll: CellState[]) => number {
  return function (row: CellState[]): number {
    const previousCellFromDifferentRow: CellState = row?.[yIndex - 1];
    const sameCellFromDifferentRow: CellState = row?.[yIndex];
    const nextCellFromDifferentRow: CellState = row?.[yIndex + 1];
    return (
      cellStateToNumber(previousCellFromDifferentRow) +
      cellStateToNumber(sameCellFromDifferentRow) +
      cellStateToNumber(nextCellFromDifferentRow)
    );
  };
}

function aliveNeighbors(worldMatrix: WorldMatrix): (coordinates: CellCoordinates) => number {
  return function (coordinates: CellCoordinates): number {
    const [xIndex, yIndex] = coordinates;
    const previousRow: CellState[] = worldMatrix[xIndex - 1];
    const currentRow: CellState[] = worldMatrix[xIndex];
    const nextRow: CellState[] = worldMatrix[xIndex + 1];
    return (
      aliveNeighborsByDifferentRow(yIndex)(previousRow) +
      aliveNeighborsByCurrentRow(yIndex)(currentRow) +
      aliveNeighborsByDifferentRow(yIndex)(nextRow)
    );
  };
}

function nextGeneration(worldMatrix: WorldMatrix): WorldMatrix {
  const aliveNeighborsByMatrix: (coordinates: CellCoordinates) => number = aliveNeighbors(worldMatrix);
  return worldMatrix.map((row: CellState[], rowIndex: number): CellState[] =>
    row.map((column: CellState, columnIndex: number): CellState => {
      const neighborsCount: number = aliveNeighborsByMatrix([rowIndex, columnIndex]);
      return regenerate(column)(neighborsCount);
    })
  );
}

export { WorldMatrix, create, aliveNeighbors, nextGeneration };

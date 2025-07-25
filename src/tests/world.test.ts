import { CellState, create as createCell } from '../core/cell';
import { WorldMatrix, create as createWorld, aliveNeighbors, nextGeneration } from '../core/world';

const { DEAD, ALIVE } = CellState;

describe('The World', () => {
  it('creates a cell matrix for a given cell status', () => {
    const initialStatus = [
      [DEAD, DEAD],
      [DEAD, ALIVE],
    ];

    const world: WorldMatrix = createWorld(initialStatus);

    expect(world).toEqual([
      [createCell(DEAD), createCell(DEAD)],
      [createCell(DEAD), createCell(ALIVE)],
    ]);
  });

  it('gets alive neighbors for a given coordinates', () => {
    expect(aliveNeighbors(createWorld([[DEAD]]))([0, 0])).toBe(0);
    expect(aliveNeighbors(createWorld([[DEAD, ALIVE]]))([0, 0])).toBe(1);
    expect(aliveNeighbors(createWorld([[ALIVE, DEAD]]))([0, 1])).toBe(1);
    expect(aliveNeighbors(createWorld([[ALIVE, DEAD, ALIVE]]))([0, 1])).toBe(2);
    expect(
      aliveNeighbors(
        createWorld([
          [ALIVE, DEAD, ALIVE],
          [ALIVE, ALIVE, ALIVE],
        ])
      )([0, 1])
    ).toBe(5);
    expect(
      aliveNeighbors(
        createWorld([
          [ALIVE, DEAD, ALIVE],
          [DEAD, DEAD, DEAD],
        ])
      )([0, 1])
    ).toBe(2);
    expect(
      aliveNeighbors(
        createWorld([
          [ALIVE, ALIVE, ALIVE],
          [ALIVE, DEAD, ALIVE],
          [ALIVE, ALIVE, ALIVE],
        ])
      )([1, 1])
    ).toBe(8);
  });

  it('generates the next state of the world', () => {
    const initialStatus = [
      [DEAD, ALIVE, DEAD],
      [DEAD, ALIVE, DEAD],
      [DEAD, ALIVE, DEAD],
    ];

    const nextWorldGeneration = nextGeneration(createWorld(initialStatus));

    expect(nextWorldGeneration).toEqual([
      [createCell(DEAD), createCell(DEAD), createCell(DEAD)],
      [createCell(ALIVE), createCell(ALIVE), createCell(ALIVE)],
      [createCell(DEAD), createCell(DEAD), createCell(DEAD)],
    ]);
  });

  it('never changes for a given initial block pattern', () => {
    const initialWorld = createWorld([
      [ALIVE, ALIVE, DEAD, DEAD, DEAD],
      [ALIVE, ALIVE, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
    ]);

    const currentWorld = nextGeneration(nextGeneration(nextGeneration(initialWorld)));

    expect(currentWorld).toEqual(initialWorld);
  });

  it('Reestablishes the same state after two generations when a given oscillator pattern is provided', () => {
    const world = createWorld([
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, ALIVE, DEAD, DEAD],
      [DEAD, DEAD, ALIVE, DEAD, DEAD],
      [DEAD, DEAD, ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
    ]);

    const result = nextGeneration(nextGeneration(world));

    expect(result).toEqual(world);
  });
});

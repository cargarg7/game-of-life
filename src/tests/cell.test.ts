/*
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any dead cell with exactly three live neighbors becomes a live cell.
 */

import { CellState, create, regenerate, isAlive } from '../core/cell';

const { DEAD, ALIVE } = CellState;

describe('In the Game of Life', () => {
  it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', () => {
    expect(isAlive(regenerate(create(ALIVE))(1))).toBeFalsy();
    expect(isAlive(regenerate(create(DEAD))(1))).toBeFalsy();
  });

  it('Any live cell with two or three live neighbors lives on to the next generation', () => {
    expect(isAlive(regenerate(create(ALIVE))(2))).toBeTruthy();
    expect(isAlive(regenerate(create(ALIVE))(3))).toBeTruthy();
    expect(isAlive(regenerate(create(DEAD))(4))).toBeFalsy();
  });

  it('Any live cell with more than three live neighbors dies, as if by overcrowding', () => {
    expect(isAlive(regenerate(create(ALIVE))(4))).toBeFalsy();
    expect(isAlive(regenerate(create(DEAD))(4))).toBeFalsy();
  });

  it('Any dead cell with exactly three live neighbors becomes a live cell on the next generation', () => {
    expect(isAlive(regenerate(create(DEAD))(3))).toBeTruthy();
  });

  it('cells with undefined initial state are not allowed', () => {
    // @ts-expect-error - To test pourposefully invalid input
    expect(() => create(undefined)).toThrow();
    // @ts-expect-error - To test pourposefully invalid input
    expect(() => create(null)).toThrow();
  });
});

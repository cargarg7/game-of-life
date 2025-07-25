enum CellState {
  DEAD = 0,
  ALIVE = 1,
}

function isAlive(state: CellState): boolean {
  return state === CellState.ALIVE;
}

function create(state: CellState): CellState {
  if (state === undefined || state === null) {
    throw new Error('Cell state is not defined');
  }

  return state;
}

type RegenerateType = { state: CellState; neighborsCount: number };

function regenerateWhenAlive({ state, neighborsCount }: RegenerateType): CellState {
  if (neighborsCount === 2 || neighborsCount === 3) {
    return create(CellState.ALIVE);
  }

  if (neighborsCount < 2 || neighborsCount > 3) {
    return create(CellState.DEAD);
  }

  return create(state);
}

function regenerateWhenIsNotAlive({ state, neighborsCount }: RegenerateType): CellState {
  if (neighborsCount === 3) {
    return create(CellState.ALIVE);
  }

  return create(state);
}

function regenerate(state: CellState): (neighborsCount: number) => CellState {
  return function (neighborsCount: number): CellState {
    const regenerateByState = {
      [CellState.ALIVE]: regenerateWhenAlive,
      [CellState.DEAD]: regenerateWhenIsNotAlive,
    };
    return regenerateByState[state]({ state, neighborsCount });
  };
}

export { CellState, create, isAlive, regenerate };

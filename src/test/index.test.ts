import { createStore } from "redux-dynamic-modules-core";
import {Action, applyMiddleware } from "redux";
import {savesReducer, TSavesState} from "../reducer";
import { savesReducerWrapper } from "../reducerWrapper";
import { createSavesMiddleware } from "../middleware";
import { getHistories } from "../common";
import {
  createAddSaveAction,
  createClearSavesAction,
  createLoadPrevSaveAction, createLoadNextSaveAction,
  createRemoveLastSavesAction
} from "../definitions";

const R1 = "reducer1";
const R2 = "reducer2";
const R3 = "reducer3";

type TState = {
  savesReducer: TSavesState,
  [R1]?: number,
  [R2]?: number[],
  [R3]?: { n: number },
}

const getHistoryLength = (state: TState) => {
  return state.savesReducer.countSaves;
}

const getHistoryIndex = (state: TState) => {
  return state.savesReducer.currentSaveIndex;
}

enum ActionType {
  Increase = 'Increase',
  Collect = 'Collect',
  Change = 'Change',
  Reset = 'Reset',
}

describe("redux-saves", () => {
  function dispatch(action: Action): void {
    store.dispatch(action);
  }

  function select(selector: any, props?: any) {
    return selector(store.getState(), props);
  }

  const LIMIT = 10;
  const store = createStore<TState>({
    enhancers: [applyMiddleware(createSavesMiddleware({ limit: LIMIT }))]
  });

  store.addModule({
    id: 'savesReducer',
    reducerMap: {
      savesReducer
    }
  });

  function createIncreaseAction(p: number) {
    return {
      type: ActionType.Increase,
      payload: p
    }
  }
  function createCollectAction(p: number) {
    return {
      type: ActionType.Collect,
      payload: p
    }
  }
  function createChangeAction(p: number) {
    return {
      type: ActionType.Change,
      payload: p
    }
  }
  function createResetAction() {
    return {
      type: ActionType.Reset,
    }
  }

  let unregisterReducer1: VoidFunction;
  let unregisterReducer2: VoidFunction;
  let unregisterReducer3: VoidFunction;

  const registerReducer1 = () => {
    unregisterReducer1 = store.addModule({
      id: R1,
      reducerMap: {
        [R1]: savesReducerWrapper((state = 0, action) => {
          if (action.type === ActionType.Increase) {
            return state + action.payload;
          }
          if (action.type === ActionType.Reset) {
            return 0;
          }
          return state;
        })
      }
    }).remove;
  };
  const registerReducer2 = () => {
    unregisterReducer2 = store.addModule({
      id: R2,
      reducerMap: {
        [R2]: savesReducerWrapper((state = [], action) => {
          if (action.type === ActionType.Collect) {
            return state.concat(action.payload);
          }
          if (action.type === ActionType.Reset) {
            return [];
          }
          return state;
        })
      }
    }).remove;
  };
  const registerReducer3 = () => {
    unregisterReducer3 = store.addModule({
      id: R3,
      reducerMap: {
        [R3]: savesReducerWrapper((state: { n: number } = {n: 0}, action) => {
          if (action.type === ActionType.Change) {
            return {n: action.payload};
          }
          if (action.type === ActionType.Reset) {
            return {n: 0};
          }
          return state;
        })
      }
    }).remove;
  };

  beforeEach(() => {
    registerReducer1();
    registerReducer2();
    registerReducer3();
    dispatch(createResetAction());
    dispatch(createClearSavesAction());
  });

  afterEach(() => {
    unregisterReducer1();
    unregisterReducer2();
    unregisterReducer3();
  });

  test("should add saves", () => {
    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    expect(select(getHistoryLength)).toBe(1);

    dispatch(createAddSaveAction());
    dispatch(createCollectAction(1));

    expect(select(getHistoryLength)).toBe(2);
  });

  test("should go back if state changed", () => {
    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    expect(select(getHistoryLength)).toBe(1);

    dispatch(createLoadPrevSaveAction());

    expect(select(getHistoryLength)).toBe(2);
  });

  test("should correct load on few saves if state changed", () => {
    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(0);

    dispatch(createIncreaseAction(1));
    dispatch(createLoadPrevSaveAction(3));

    expect(select((state: TState) => state[R1])).toBe(2);
    expect(select(getHistoryLength)).toBe(5);
    expect(select(getHistoryIndex)).toBe(4);
  });

  test("should correct load at few saves if state don't changed", () => {
    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(0);

    dispatch(createLoadPrevSaveAction(3));

    expect(select((state: TState) => state[R1])).toBe(1);
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(4);
  });

  test("should correct load at few saves with dynamic added reducers", () => {
    unregisterReducer2();
    unregisterReducer3();

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    registerReducer2();

    dispatch(createCollectAction(1));
    dispatch(createAddSaveAction());

    dispatch(createCollectAction(1));
    dispatch(createAddSaveAction());

    registerReducer3();

    dispatch(createChangeAction(3));
    dispatch(createAddSaveAction());

    dispatch(createChangeAction(4));
    dispatch(createAddSaveAction());

    expect(select(getHistoryLength)).toBe(6);
    expect(select(getHistoryIndex)).toBe(0);

    let state: TState;

    dispatch(createLoadPrevSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(6);
    expect(select(getHistoryIndex)).toBe(2);
    expect(state[R1]).toBe(2);
    expect(state[R2]).toEqual([1, 1]);
    expect(state[R3]).toEqual({ n: 3 });

    dispatch(createLoadPrevSaveAction(2));
    state = store.getState();
    expect(select(getHistoryLength)).toBe(6);
    expect(select(getHistoryIndex)).toBe(4);
    expect(state[R1]).toBe(2);
    expect(state[R2]).toEqual([1]);
    expect(state[R3]).toEqual({ n: 3 });

    dispatch(createLoadPrevSaveAction(2));
    state = store.getState();
    expect(select(getHistoryLength)).toBe(6);
    expect(select(getHistoryIndex)).toBe(6);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([1]);
    expect(state[R3]).toEqual({ n: 3 });
  });

  test("shouldn't add duplicate saves", () => {
    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());
    dispatch(createAddSaveAction());
    dispatch(createLoadPrevSaveAction());

    expect(select(getHistoryLength)).toBe(1);
  });

  test("should remove save", () => {
    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());
    dispatch(createRemoveLastSavesAction());

    getHistories().forEach((history) => {
      expect(history.length).toBe(0);
    });

    expect(select(getHistoryLength)).toBe(0);
  });

  test("should remove few saves", () => {
    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    expect(select(getHistoryLength)).toBe(5);

    dispatch(createRemoveLastSavesAction(3));

    getHistories().forEach((history) => {
      expect(history.length).toBe(2);
    });

    expect(select(getHistoryLength)).toBe(2);
  });

  test("try remove more saves than exist", () => {
    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    expect(select(getHistoryLength)).toBe(2);

    dispatch(createRemoveLastSavesAction(5));

    getHistories().forEach((history) => {
      expect(history.length).toBe(0);
    });

    expect(select(getHistoryLength)).toBe(0);
  });

  test("shouldn't remove save after change history index", () => {
    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());
    dispatch(createLoadPrevSaveAction());
    dispatch(createRemoveLastSavesAction());

    expect(select(getHistoryLength)).toBe(1);
  });

  test("should correct walk on history", () => {
    let state: TState;

    dispatch(createAddSaveAction());

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    dispatch(createCollectAction(2));
    dispatch(createAddSaveAction());

    dispatch(createChangeAction(3));
    dispatch(createAddSaveAction());

    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(0);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([2]);
    expect(state[R3]).toEqual({ n: 3 });

    dispatch(createLoadPrevSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(2);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([2]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createLoadPrevSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(3);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createLoadPrevSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(4);
    expect(state[R1]).toBe(0);
    expect(state[R2]).toEqual([]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createLoadNextSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(3);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createLoadNextSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(2);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([2]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createLoadNextSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(1);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([2]);
    expect(state[R3]).toEqual({ n: 3 });

    dispatch(createLoadPrevSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(2);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([2]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createLoadPrevSaveAction());
    state = store.getState();
    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(3);
    expect(state[R1]).toBe(1);
    expect(state[R2]).toEqual([]);
    expect(state[R3]).toEqual({ n: 0 });

    dispatch(createIncreaseAction(1));
    dispatch(createAddSaveAction());

    state = store.getState();
    expect(select(getHistoryLength)).toBe(2);
    expect(select(getHistoryIndex)).toBe(0);
    expect(state[R1]).toBe(2);
    expect(state[R2]).toEqual([]);
    expect(state[R3]).toEqual({ n: 0 });
  });

  test("should correct work with dynamic reducers", () => {
    unregisterReducer2();
    unregisterReducer3();

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    dispatch(createAddSaveAction());
    dispatch(createIncreaseAction(1));

    expect(select(getHistoryLength)).toBe(4);
    expect(select(getHistoryIndex)).toBe(0);

    unregisterReducer1();
    registerReducer2();

    dispatch(createAddSaveAction());

    expect(select(getHistoryLength)).toBe(1);
    expect(select(getHistoryIndex)).toBe(0);
  });

  test("should delete asynchronously saves after the limit is exceeded", (done) => {
    unregisterReducer2();
    unregisterReducer3();

    let i = LIMIT * 2;

    while (i > 0) {
      i -= 1;

      dispatch(createAddSaveAction());
      dispatch(createIncreaseAction(1));

      if (i === 15) registerReducer2();
      if (i <= 15) {
        dispatch(createCollectAction(2));
      }

      if (i === 12) registerReducer3();
      if (i <= 12) {
        dispatch(createChangeAction(3));
      }
    }

    expect(select(getHistoryLength)).toBe(LIMIT);

    expect(
      getHistories().some((history) => {
        return history.length > LIMIT;
      })
    ).toBeTruthy();

    setTimeout(() => {
      expect(
        getHistories().some((history) => {
          return history.length > LIMIT;
        })
      ).toBeFalsy();
      done();
    }, 3333);
  });
});

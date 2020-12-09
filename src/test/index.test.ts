import { createStore } from "redux-dynamic-modules-core";
import { Action, applyMiddleware } from "redux";
import { savesReducer, TSavesState } from "../reducer";
import { savesReducerWrapper } from "../reducerWrapper";
import { createSavesMiddleware } from "../middleware";
import { getSaveStores, getSaveStoreSize } from "../helpers";
import {
  createAddSaveAction,
  createClearSavesAction,
  createLoadPrevSaveAction,
  createLoadNextSaveAction,
  createRemoveSavesAction,
  DEFAULT_GROUP_KEY,
  TGroupKey,
  createLoadSaveAction
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

const enum ActionType {
  Increase = 'Increase',
  Collect = 'Collect',
  Change = 'Change',
  Reset = 'Reset',
}

describe("redux-saves", () => {
  function dispatch(action: Action): void {
    store.dispatch(action);
  }

  function select(selector: (s: TState) => unknown) {
    return selector(store.getState());
  }

  const store = createStore<TState>({
    enhancers: [applyMiddleware(createSavesMiddleware())]
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

  describe('Default group', () => {
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

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });

      dispatch(createAddSaveAction());
      dispatch(createCollectAction(1));

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
    });

    test("should remove save", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      dispatch(createRemoveSavesAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(0);
      });
    });

    test("shouldn't add duplicate saves if name is not specified", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      dispatch(createAddSaveAction());
      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
    });

    test("allow add duplicate saves if name is specified", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ saveKey: 'save-1' }));
      dispatch(createAddSaveAction({ saveKey: 'copy-1' }));
      dispatch(createAddSaveAction({ saveKey: 'copy-2' }));

      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      expect(select((s) => s[R1])).toBe(1);

      dispatch(createLoadNextSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });

      dispatch(createLoadSaveAction({ saveKey: 'save-1' }));
      expect(select((s) => s[R1])).toBe(2);
      dispatch(createLoadSaveAction({ saveKey: 'copy-1' }));
      expect(select((s) => s[R1])).toBe(2);
      dispatch(createLoadSaveAction({ saveKey: 'copy-2' }));
      expect(select((s) => s[R1])).toBe(2);

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      expect(select((s) => s[R1])).toBe(3);
      
      dispatch(createLoadSaveAction({ saveKey: 'save-1' }));
      expect(select((s) => s[R1])).toBe(2);
      
      dispatch(createLoadSaveAction({ saveKey: 'copy-1' }));
      expect(select((s) => s[R1])).toBe(2);
    });

    test("should add save after load prev if state changed", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      dispatch(createIncreaseAction(2));

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });

      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
    });

    test("should correct load on few saves if state changed", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(2));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(3));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(4));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      expect(select((s) => s[R1])).toBe(10);

      dispatch(createIncreaseAction(1));
      dispatch(createLoadPrevSaveAction({ count: 3 }));

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(5);
      });
      expect(select((s) => s[R1])).toBe(3);
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

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      expect(select((s) => s[R1])).toBe(4);

      dispatch(createLoadPrevSaveAction({ count: 3 }));

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      expect(select((s) => s[R1])).toBe(1);
    });

    test("should correct load at few saves with dynamic added reducers", () => {
      unregisterReducer2();
      unregisterReducer3();

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(2));
      dispatch(createAddSaveAction());

      registerReducer2();

      dispatch(createCollectAction(1));
      dispatch(createAddSaveAction());

      dispatch(createCollectAction(2));
      dispatch(createAddSaveAction());

      registerReducer3();

      dispatch(createChangeAction(3));
      dispatch(createAddSaveAction());

      dispatch(createChangeAction(4));
      dispatch(createAddSaveAction());

      let stores = getSaveStores(DEFAULT_GROUP_KEY)
      expect(getSaveStoreSize(stores[0])).toBe(6);
      expect(getSaveStoreSize(stores[1])).toBe(4);
      expect(getSaveStoreSize(stores[2])).toBe(2);

      dispatch(createLoadPrevSaveAction());

      stores = getSaveStores(DEFAULT_GROUP_KEY)
      expect(getSaveStoreSize(stores[0])).toBe(6);
      expect(getSaveStoreSize(stores[1])).toBe(4);
      expect(getSaveStoreSize(stores[2])).toBe(2);

      let state = store.getState();
      expect(state[R1]).toBe(3);
      expect(state[R2]).toEqual([1, 2]);
      expect(state[R3]).toEqual({ n: 3 });

      dispatch(createLoadPrevSaveAction({ count: 2 }));

      stores = getSaveStores(DEFAULT_GROUP_KEY)
      expect(getSaveStoreSize(stores[0])).toBe(6);
      expect(getSaveStoreSize(stores[1])).toBe(4);
      expect(getSaveStoreSize(stores[2])).toBe(2);

      state = store.getState();
      expect(state[R1]).toBe(3);
      expect(state[R2]).toEqual([1]);
      expect(state[R3]).toEqual({ n: 3 });

      dispatch(createLoadPrevSaveAction({ count: 2 }));

      stores = getSaveStores(DEFAULT_GROUP_KEY)
      expect(getSaveStoreSize(stores[0])).toBe(6);
      expect(getSaveStoreSize(stores[1])).toBe(4);
      expect(getSaveStoreSize(stores[2])).toBe(2);

      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([1]);
      expect(state[R3]).toEqual({ n: 3 });
    });

    test("should remove few saves", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ saveKey: 'save-2' }));

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ saveKey: 'save-4' }));

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(5);
      });

      dispatch(createRemoveSavesAction({ saveKeys: ['save-2', 'save-4'] }));
      
      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
    });

    test("try remove more saves more than exist", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });

      dispatch(createRemoveSavesAction());
      dispatch(createRemoveSavesAction());
      dispatch(createRemoveSavesAction());
      dispatch(createRemoveSavesAction());
      dispatch(createRemoveSavesAction());
      
      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(0);
      });
    });

    test("should correct remove saves after change save", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      
      dispatch(createLoadPrevSaveAction());

      expect(select(s => s[R1])).toBe(2);

      dispatch(createRemoveSavesAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
      expect(select(s => s[R1])).toBe(2);
    });

    test("should correct remove saves and load save", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
      
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      
      dispatch(createLoadPrevSaveAction());

      expect(select(s => s[R1])).toBe(2);

      dispatch(createRemoveSavesAction());
      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
      expect(select(s => s[R1])).toBe(1);
    });

    test("should correct walk on history", () => {
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createCollectAction(2));
      dispatch(createAddSaveAction());

      dispatch(createChangeAction(3));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
    
      let state: TState = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([2]);
      expect(state[R3]).toEqual({ n: 3 });
      
      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([2]);
      expect(state[R3]).toEqual({ n: 0 });

      dispatch(createLoadPrevSaveAction());
      
      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([]);
      expect(state[R3]).toEqual({ n: 0 });

      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(0);
      expect(state[R2]).toEqual([]);
      expect(state[R3]).toEqual({ n: 0 });

      dispatch(createLoadNextSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([]);
      expect(state[R3]).toEqual({ n: 0 });

      dispatch(createLoadNextSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([2]);
      expect(state[R3]).toEqual({ n: 0 });

      dispatch(createLoadNextSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([2]);
      expect(state[R3]).toEqual({ n: 3 });

      dispatch(createLoadPrevSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      state = store.getState();
      expect(state[R1]).toBe(1);
      expect(state[R2]).toEqual([2]);
      expect(state[R3]).toEqual({ n: 0 });

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      getSaveStores(DEFAULT_GROUP_KEY).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(5);
      });
      state = store.getState();
      expect(state[R1]).toBe(2);
      expect(state[R2]).toEqual([2]);
      expect(state[R3]).toEqual({ n: 0 });
    });

    test("should correct work with dynamic reducers", () => {
      unregisterReducer2();
      unregisterReducer3();

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());

      expect(getSaveStoreSize(getSaveStores(DEFAULT_GROUP_KEY)[0])).toBe(4);
      expect(select(s => s[R1])).toBe(4);

      unregisterReducer1();
      registerReducer2();

      dispatch(createAddSaveAction());

      expect(getSaveStoreSize(getSaveStores(DEFAULT_GROUP_KEY)[0])).toBe(1);
      expect(select(s => s[R2])).toEqual([]);
    });
  });

  describe('Few groups', () => {
    const G1 = "group1" as TGroupKey;
    const G2 = "group2" as TGroupKey;
    let unregisterReducer1: VoidFunction;
    let unregisterReducer2: VoidFunction;
    let unregisterReducer3: VoidFunction;

    const registerReducer1 = () => {
      unregisterReducer1 = store.addModule({
        id: R1,
        reducerMap: {
          [R1]: savesReducerWrapper(G1, (state = 0, action) => {
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
          [R2]: savesReducerWrapper(G2, (state = [], action) => {
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
          [R3]: savesReducerWrapper(G2, (state: { n: number } = {n: 0}, action) => {
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

    test("should add saves for groups", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));

      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R1])).toBe(1);

      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(0);
      });
      expect(select(s => s[R2])).toEqual([]);
      expect(select(s => s[R3])).toEqual({ n: 0 });

      dispatch(createCollectAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));

      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R1])).toBe(1);

      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R2])).toEqual([1]);
      expect(select(s => s[R3])).toEqual({ n: 0 });

      dispatch(createChangeAction(1));
      dispatch(createAddSaveAction());

      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R1])).toBe(1);

      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
      expect(select(s => s[R2])).toEqual([1]);
      expect(select(s => s[R3])).toEqual({ n: 1 });
    });

    test("shouldn't add duplicate saves", () => {
      dispatch(createIncreaseAction(6));
      dispatch(createCollectAction(6));
      dispatch(createChangeAction(6));
      dispatch(createAddSaveAction());
      dispatch(createAddSaveAction());
      dispatch(createLoadPrevSaveAction());
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(1);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(1);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(1);
    });
    
    test("should remove save", () => {
      dispatch(createIncreaseAction(6));
      dispatch(createCollectAction(6));
      dispatch(createChangeAction(6));
      dispatch(createAddSaveAction());
      dispatch(createAddSaveAction());
      dispatch(createRemoveSavesAction());
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(0);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(0);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(0);
    });

    test("should add save after load prev if state changed for group 1", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
      dispatch(createIncreaseAction(1));

      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(0);
      });
      expect(select(s => s[R1])).toEqual(2);
      expect(select(s => s[R2])).toEqual([]);
      expect(select(s => s[R3])).toEqual({ n: 0 });

      dispatch(createLoadPrevSaveAction({ groupKeys: [G1] }));
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(0);
      });
      expect(select(s => s[R1])).toEqual(1);
      expect(select(s => s[R2])).toEqual([]);
      expect(select(s => s[R3])).toEqual({ n: 0 });
    });

    test("should add save after load prev if state changed for all groups", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));
      dispatch(createAddSaveAction());

      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));

      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R1])).toEqual(2);
      expect(select(s => s[R2])).toEqual([1, 1]);
      expect(select(s => s[R3])).toEqual({ n: 0 });
    
      dispatch(createLoadPrevSaveAction());
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(2);
      });
      expect(select(s => s[R1])).toEqual(1);
      expect(select(s => s[R2])).toEqual([1]);
      expect(select(s => s[R3])).toEqual({ n: 0 });
    });
    
    test("should correct load on few saves if state changed for one group", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R1])).toEqual(4);
      expect(select(s => s[R2])).toEqual([]);
      expect(select(s => s[R3])).toEqual({ n: 0 });
    
      dispatch(createIncreaseAction(1));
      dispatch(createLoadPrevSaveAction({ groupKeys: [G1], count: 3 }));
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(5);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(1);
      });
      expect(select(s => s[R1])).toEqual(2);
      expect(select(s => s[R2])).toEqual([]);
      expect(select(s => s[R3])).toEqual({ n: 0 });
    });

    test("should correct load on few saves if state changed for all groups", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(2));
      dispatch(createChangeAction(2));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(3));
      dispatch(createCollectAction(3));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      dispatch(createIncreaseAction(4));
      dispatch(createChangeAction(4));
      dispatch(createAddSaveAction());
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      expect(select(s => s[R1])).toEqual(10);
      expect(select(s => s[R2])).toEqual([1,3]);
      expect(select(s => s[R3])).toEqual({ n: 4 });
    
      dispatch(createIncreaseAction(5));
      dispatch(createCollectAction(5));
      dispatch(createLoadPrevSaveAction({ count: 3 }));
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(4);
      });
      expect(select(s => s[R1])).toEqual(1);
      expect(select(s => s[R2])).toEqual([1]);
      expect(select(s => s[R3])).toEqual({ n: 2 });
    });
    
    test("should correct load at few groups if state don't changed", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      dispatch(createIncreaseAction(2));
      dispatch(createChangeAction(2));
      dispatch(createAddSaveAction({ groupKeys: [G1, G2] }));
    
      dispatch(createIncreaseAction(3));
      dispatch(createCollectAction(3));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(4));
      dispatch(createChangeAction(4));
      dispatch(createAddSaveAction());
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      expect(select((s) => s[R1])).toBe(10);
      expect(select((s) => s[R2])).toEqual([1,3]);
      expect(select((s) => s[R3])).toEqual({ n: 4 });
    
      dispatch(createLoadPrevSaveAction());
    
      expect(select((s) => s[R1])).toBe(6);
      expect(select((s) => s[R2])).toEqual([1]);
      expect(select((s) => s[R3])).toEqual({ n: 2 });
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      expect(select((s) => s[R1])).toBe(6);
      expect(select((s) => s[R2])).toEqual([1]);
      expect(select((s) => s[R3])).toEqual({ n: 2 });
    
      dispatch(createLoadPrevSaveAction({ count: 2 }));
    
      getSaveStores(G1).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      getSaveStores(G2).forEach((store) => {
        expect(getSaveStoreSize(store)).toBe(3);
      });
      expect(select((s) => s[R1])).toBe(3);
      expect(select((s) => s[R2])).toEqual([1]);
      expect(select((s) => s[R3])).toEqual({ n: 0 });
    });
    
    test("should correct load at few saves with dynamic added reducers", () => {
      unregisterReducer2();
      unregisterReducer3();
    
      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(2));
      dispatch(createChangeAction(2));
      dispatch(createAddSaveAction({ groupKeys: [G2] })); // try saving a group that doesn't exist
    
      registerReducer2();
    
      dispatch(createIncreaseAction(3));
      dispatch(createCollectAction(3));
      dispatch(createAddSaveAction({ groupKeys: [G2] })); // Group 2 exist only 1 reducer from 2 
     
      dispatch(createIncreaseAction(4));
      dispatch(createChangeAction(4)); // also still yet not registered reducer
      dispatch(createAddSaveAction());
    
      registerReducer3();
    
      dispatch(createIncreaseAction(5));
      dispatch(createCollectAction(5));
      dispatch(createChangeAction(5));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(6));
      dispatch(createCollectAction(6));
      dispatch(createChangeAction(6));
      dispatch(createAddSaveAction());

      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(3);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(2);
      expect(select((s) => s[R1])).toBe(21);
      expect(select((s) => s[R2])).toEqual([3,5,6]);
      expect(select((s) => s[R3])).toEqual({ n: 6 });
    
      dispatch(createLoadPrevSaveAction());

      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(3);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(2);
      expect(select((s) => s[R1])).toBe(15);
      expect(select((s) => s[R2])).toEqual([3, 5]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    
      dispatch(createLoadPrevSaveAction({ count: 2 }));
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(3);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(2);
      expect(select((s) => s[R1])).toBe(1);
      expect(select((s) => s[R2])).toEqual([3]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    
      dispatch(createLoadPrevSaveAction({ count: 2 }));
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(3);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(2);
      expect(select((s) => s[R1])).toBe(1);
      expect(select((s) => s[R2])).toEqual([3]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    });
    
    test("should remove few saves", () => {
      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));
      dispatch(createChangeAction(1));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(2));
      dispatch(createCollectAction(2));
      dispatch(createChangeAction(2));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      dispatch(createIncreaseAction(3));
      dispatch(createCollectAction(3));
      dispatch(createChangeAction(3));
      dispatch(createAddSaveAction({ saveKey: 'save-3' }));
    
      dispatch(createIncreaseAction(4));
      dispatch(createCollectAction(4));
      dispatch(createChangeAction(4));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      dispatch(createIncreaseAction(5));
      dispatch(createCollectAction(5));
      dispatch(createChangeAction(5));
      dispatch(createAddSaveAction({ saveKey: 'save-5' }));
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(3);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(4);
      expect(select((s) => s[R1])).toBe(15);
      expect(select((s) => s[R2])).toEqual([1,2,3,4,5]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    
      dispatch(createRemoveSavesAction({ saveKeys: ['save-3'] }));
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(2); // we remoev all saves
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(3);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(3);
      expect(select((s) => s[R1])).toBe(15);
      expect(select((s) => s[R2])).toEqual([1,2,3,4,5]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    });
    
    test("should correct load saves", () => {
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(1));
      dispatch(createCollectAction(1));
      dispatch(createChangeAction(1));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(2));
      dispatch(createCollectAction(2));
      dispatch(createChangeAction(2));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      dispatch(createIncreaseAction(3));
      dispatch(createCollectAction(3));
      dispatch(createChangeAction(3));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      dispatch(createIncreaseAction(4));
      dispatch(createCollectAction(4));
      dispatch(createChangeAction(4));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));
    
      dispatch(createIncreaseAction(5));
      dispatch(createCollectAction(5));
      dispatch(createChangeAction(5));
      dispatch(createAddSaveAction());
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(15);
      expect(select((s) => s[R2])).toEqual([1,2,3,4,5]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    
      dispatch(createLoadPrevSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(10);
      expect(select((s) => s[R2])).toEqual([1,2,3]);
      expect(select((s) => s[R3])).toEqual({ n: 3 });
    
      dispatch(createLoadPrevSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(1);
      expect(select((s) => s[R2])).toEqual([1,2]);
      expect(select((s) => s[R3])).toEqual({ n: 2 });
    
      dispatch(createLoadPrevSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(0);
      expect(select((s) => s[R2])).toEqual([1]);
      expect(select((s) => s[R3])).toEqual({ n: 1 });

      dispatch(createLoadNextSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(1);
      expect(select((s) => s[R2])).toEqual([1,2]);
      expect(select((s) => s[R3])).toEqual({ n: 2 });
    
      dispatch(createLoadNextSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(10);
      expect(select((s) => s[R2])).toEqual([1,2,3]);
      expect(select((s) => s[R3])).toEqual({ n: 3 });
    
      dispatch(createLoadNextSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(15);
      expect(select((s) => s[R2])).toEqual([1,2,3,4,5]);
      expect(select((s) => s[R3])).toEqual({ n: 5 });
    
      dispatch(createLoadPrevSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(10);
      expect(select((s) => s[R2])).toEqual([1,2,3]);
      expect(select((s) => s[R3])).toEqual({ n: 3 });
    
      dispatch(createLoadPrevSaveAction());
      
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(5);
      expect(select((s) => s[R1])).toBe(1);
      expect(select((s) => s[R2])).toEqual([1,2]);
      expect(select((s) => s[R3])).toEqual({ n: 2 });
    
      dispatch(createIncreaseAction(6));
      dispatch(createAddSaveAction({ groupKeys: [G1] }));

      dispatch(createCollectAction(6));
      dispatch(createChangeAction(6));
      dispatch(createAddSaveAction({ groupKeys: [G2] }));
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(5);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(6);
      expect(getSaveStoreSize(getSaveStores(G2)[1])).toBe(6);
      expect(select((s) => s[R1])).toBe(7);
      expect(select((s) => s[R2])).toEqual([1,2, 6]);
      expect(select((s) => s[R3])).toEqual({ n: 6 });
    });
    
    test("should correct work with dynamic reducers", () => {
      unregisterReducer2();
      unregisterReducer3();
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
    
      dispatch(createIncreaseAction(1));
      dispatch(createAddSaveAction());
    
      expect(getSaveStoreSize(getSaveStores(G1)[0])).toBe(4);
      expect(getSaveStores(G2)).toBe(undefined);
      expect(select((s) => s[R1])).toBe(4);
      expect(select((s) => s[R2])).toEqual(undefined);
      expect(select((s) => s[R3])).toEqual(undefined);
    
      unregisterReducer1();
      registerReducer2();
    
      dispatch(createAddSaveAction());
    
      expect(getSaveStores(G1)).toBe(undefined);
      expect(getSaveStoreSize(getSaveStores(G2)[0])).toBe(1);
      expect(getSaveStores(G2)[1]).toBe(undefined);
      expect(select((s) => s[R1])).toBe(undefined);
      expect(select((s) => s[R2])).toEqual([]);
      expect(select((s) => s[R3])).toEqual(undefined);
    });
  });
});

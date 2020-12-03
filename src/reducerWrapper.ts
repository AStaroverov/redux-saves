import { Reducer, AnyAction } from "redux";
import {
  ActionType, TSaveActions, TGroupKey, DEFAULT_GROUP_KEY, isValuableReducerAction, TSave, TGroupSaveKey, TGroupSave,
} from "./definitions";
import {
  getCurrentGroupSaveKey,
  createSaveStore,
  getSaveStoreSize,
  groupSavesIterator,
  getSave,
  createSave,
  addSave,
  deleteSaves,
  TSaveStore,
  registerSaveStore,
  setGroupChangeState,
  getGroupChangeState,
} from "./helpers";


// savesReducerWrapper create for each reducer history and controls the content
function savesReducerWrapper<S>(
  groupKeyOrReducer: (string | symbol | number) | Reducer<S, AnyAction | TSaveActions>,
  optionalReducer?: Reducer<S, AnyAction | TSaveActions>
): Reducer<S, AnyAction | TSaveActions> {
  const groupKey: TGroupKey = optionalReducer
    ? (groupKeyOrReducer as TGroupKey)
    : DEFAULT_GROUP_KEY;
  const reducer: Reducer<S, AnyAction | TSaveActions> = optionalReducer
    ? optionalReducer
    : groupKeyOrReducer as Reducer<S, AnyAction | TSaveActions>;

  const saveStore: TSaveStore = createSaveStore();
  let lastSave: TSave | void;

  return (reducerState: S | undefined, action: AnyAction | TSaveActions): S => {
    if (
      // skip on init state
      reducerState === undefined
      // use init reducer for none redux-saves actions
      || !isValuableReducerAction(action.type)
    ) {
      const nextState = reducer(reducerState, action);

      setGroupChangeState(
        groupKey,
        getGroupChangeState(groupKey)
        || (lastSave === undefined ? true : lastSave.snapshot !== nextState)
      );

      return nextState;
    }

    // add history each history action, it give understanding that this reducer still alive
    registerSaveStore(groupKey, saveStore);

    // if action not for this group
    if (action.payload.groupKeys !== undefined && action.payload.groupKeys.indexOf(groupKey) === -1) {
      return reducer(reducerState, action);
    }

    const storeSize = getSaveStoreSize(saveStore);
    const сurrentGroupSaveKey = getCurrentGroupSaveKey(groupKey);
    const groupWasChanged = getGroupChangeState(groupKey) === true;

    if (action.type === ActionType.LoadPrevSave && сurrentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }
      
      if (groupWasChanged) {
        addSave(saveStore, сurrentGroupSaveKey, createSave(reducerState));
      }

      let steps = action.payload.count || 1;
      const groupSave = groupSavesIterator(
        groupKey,
        сurrentGroupSaveKey,
        (groupSave) => {
          return steps-- === 0 ? undefined : groupSave.prevSaveKey;
        }
      ) as TGroupSave;

      let save = getSave(saveStore, groupSave.key);

      if (save === undefined) {
        addSave(saveStore, groupSave.key, save = createSave(reducerState));
      }

      lastSave = save;

      return save.snapshot as S;
    }

    if (action.type === ActionType.LoadNextSave && сurrentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }
      
      let steps = action.payload.count || 1;
      const groupSave = groupSavesIterator(
        groupKey,
        сurrentGroupSaveKey,
        (groupSave) => {
          return steps-- === 0 ? undefined : groupSave.nextSaveKey;
        }
      ) as TGroupSave;

      let save = getSave(saveStore, groupSave.key);

      if (save === undefined) {
        addSave(saveStore, groupSave.key, save = createSave(reducerState));
      }

      lastSave = save;

      return save.snapshot as S;
    }

    if (action.type === ActionType.AddSave && groupWasChanged) {
      lastSave = createSave(reducerState);
      addSave(saveStore, action.payload.saveKey, lastSave);
    }

    if (action.type === ActionType.ClearSaves) {
      lastSave = undefined;
      deleteSaves(saveStore);
    }

    return reducerState;
  };
}

export { savesReducerWrapper }

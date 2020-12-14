import { Reducer, AnyAction } from "redux";
import {
  ActionType,
  TSaveActions,
  TGroupKey,
  DEFAULT_GROUP_KEY,
  TSave,
  TGroupSave,
  isValuableAction,
  TGroupSaveKey,
  createSetInitStateAction,
} from "./definitions";
import {
  getCurrentGroupSaveKey,
  createSaveStore,
  getSaveStoreSize,
  groupSavesIterator,
  getSave,
  createSave,
  addSave,
  clearSaves,
  TSaveStore,
  registerSaveStore,
  setGroupChangeState,
  getGroupChangeState,
  deleteSave,
  isGeneratedSaveKey,
  getGroupSave,
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
  let currentSave: TSave | void;
  const deleteSaveSafety = (groupSaveKey: TGroupSaveKey) => {
    if (currentSave && currentSave.groupSaveKey === groupSaveKey) {
      const groupSave = getGroupSave(groupKey, groupSaveKey);

      currentSave = groupSave.prevSaveKey !== undefined
        ? getSave(saveStore, groupSave.prevSaveKey)
        : undefined;
    }

    deleteSave(saveStore, groupSaveKey);
  }

  return (reducerState: S | undefined, action: AnyAction | TSaveActions): S => {
    if (
      // skip on init state
      reducerState === undefined
      // use init reducer for none redux-saves actions
      || !isValuableAction(action.type)
    ) {
      const nextState = reducer(reducerState, action);

      setGroupChangeState(
        groupKey,
        getGroupChangeState(groupKey)
        || (currentSave === undefined ? true : currentSave.snapshot !== nextState)
      );

      return nextState;
    }

    // add history each history action, it give understanding that this reducer still alive
    registerSaveStore(groupKey, saveStore);

    // if action not for this group
    if (
      action.payload.groupKeys !== undefined
      && action.payload.groupKeys.indexOf(groupKey) === -1
    ) {
      return reducer(reducerState, action);
    }

    const storeSize = getSaveStoreSize(saveStore);
    const groupWasChanged = getGroupChangeState(groupKey) === true;
    const currentGroupSaveKey = getCurrentGroupSaveKey(groupKey);

    if (
      (action.type === ActionType.LoadSave || action.type === ActionType.LoadPrevSave)
      && currentGroupSaveKey
    ) {
      if (storeSize === 0) {
        return reducerState;
      }
      
      if (groupWasChanged) {
        addSave(saveStore, createSave(currentGroupSaveKey, reducerState));
      }

      if (action.type === ActionType.LoadSave) {
        currentSave = getSave(saveStore, action.payload.saveKey) || currentSave;

        if (currentSave) {
          return currentSave.snapshot as S;
        }
      }

      if (action.type === ActionType.LoadPrevSave) {
        let count = action.payload.count || 1;
        
        groupSavesIterator(
          groupKey,
          currentGroupSaveKey,
          (groupSave) => {
            currentSave = getSave(saveStore, groupSave.key) || currentSave;
            return count-- === 0 ? undefined : groupSave.prevSaveKey;
          }
        ) as TGroupSave;

        if (currentSave) {
          return currentSave.snapshot as S;
        }
      }

      return reducerState;
    }

    if (action.type === ActionType.LoadNextSave && currentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }

      let count = action.payload.count || 1;
      
      groupSavesIterator(
        groupKey,
        currentGroupSaveKey,
        (groupSave) => {
          currentSave = getSave(saveStore, groupSave.key) || currentSave;
          return count-- === 0 ? undefined : groupSave.nextSaveKey;
        }
      ) as TGroupSave;

      return currentSave ? currentSave.snapshot as S : reducerState;
    }

    if (action.type === ActionType.RemoveSaves && currentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }

      const { saveKeys, exceptSaveKeys } = action.payload;

      if (saveKeys === undefined && exceptSaveKeys === undefined) {
        deleteSaveSafety(currentGroupSaveKey);
      }

      if (saveKeys !== undefined) {
        saveKeys.forEach(deleteSaveSafety);
      } else if (exceptSaveKeys !== undefined) {
        saveStore.forEach((_, saveKey) => {
          if (exceptSaveKeys.indexOf(saveKey) !== -1) {
            deleteSaveSafety(saveKey);
          }
        });
      }

      return reducerState;
    }

    if (
      action.type === ActionType.AddSave
      && (groupWasChanged || !isGeneratedSaveKey(action.payload.saveKey))
    ) {
      addSave(saveStore, currentSave = createSave(action.payload.saveKey, reducerState));
    }

    if (action.type === ActionType.ClearSaves) {
      currentSave = undefined;
      clearSaves(saveStore);
    }

    return reducerState;
  };
}

export { savesReducerWrapper }

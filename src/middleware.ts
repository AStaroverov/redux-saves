import { Middleware } from "redux";
import {
  isValuableAction,
  ActionType,
  createLoadPrevSaveDoneAction,
  createLoadNextSaveDoneAction,
  TValuableSaveActions,
  TGroupKey,
  TGroupSave,
  TGroupSaveKey,
  createSaveUpdateReducersAction,
} from "./definitions";
import {
  deleteSaveStores,
  getSaveStores,
  getGroupKeys,
  clearGroupSaveStore,
  addGroupSave,
  createGroupSave,
  getCurrentGroupSaveKey,
  getGroupSave,
  deleteGroupSave,
  getGroupAutoSaveKey,
  updateGroupAutoSaveKey,
  groupSavesIterator,
  setCurrentGroupSaveKey,
  getSave,
  getSaveStoreSize,
  TSaveStore,
  deleteSave,
  getGroupChangeState,
  setGroupChangeState
} from "./helpers";
import { createSetSaveMetadataAction } from "./reducer";

const requestIdleCallback =
  // @ts-ignore
  globalThis.requestIdleCallback ||
  ((cb: VoidFunction) => globalThis.setTimeout(() => cb(), 3000));

// Middleware needs for control duplicate points in history and detect significant change,

export function createSavesMiddleware(options?: { limit: number }): Middleware {
  const limit = options?.limit || 50;

  let scheduled = false;
  // simple scheduler for decrease histories, if they longer than limit
  const setSaveStoresForDecreasing = new Set();
  const scheduleDecreasingSaveStoreByLimit = (saveStore: TSaveStore) => {
    setSaveStoresForDecreasing.add(saveStore);
    if (scheduled) {
      return;
    }
    scheduled = true;
    requestIdleCallback(() => {
      scheduled = false;
      setSaveStoresForDecreasing.clear();
      // TODO: add logic for LIMITS
    });
  };

  return function historyMiddleware(store) {
    return (next) => (action: TValuableSaveActions) => {
      // if action isn't valuable for history we can return default behavior
      if (!isValuableAction(action.type)) {
        return next(action);
      }

      const groupKeys: TGroupKey[] = action.payload.groupKeys || getGroupKeys();

      if (groupKeys.length === 0) {
        return next(action); 
      }

      if (action.type === ActionType.AddSave) {
        groupKeys.forEach((key) => {
          if (getGroupChangeState(key) === true) {
            addGroupSave(
              createGroupSave(
                key,
                action.payload.saveKey,
                getCurrentGroupSaveKey(key),
              )
            );
            setCurrentGroupSaveKey(key, action.payload.saveKey);
          }
        });
      }

      if (action.type === ActionType.LoadPrevSave) {
        updateGroupAutoSaveKey();

        groupKeys.forEach((key) => {
          if (getGroupChangeState(key) === true) {
            const saveKey = getGroupAutoSaveKey();
            
            addGroupSave(
              createGroupSave(
                key,
                saveKey,
                getCurrentGroupSaveKey(key),
              )
            );
            setCurrentGroupSaveKey(key, saveKey);
          }
        });
      }

      // remove all histories for so as not to store dead reducers
      // (if we unregister reducer dynamic modules)
      getGroupKeys().forEach(deleteSaveStores)

      const result = next(action);

      if (action.type === ActionType.ClearSaves) {
        groupKeys.forEach((key) => {
          clearGroupSaveStore(key);
          setCurrentGroupSaveKey(key, undefined);
        });
      }

      if (action.type === ActionType.RemoveLastSaves) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);

          if (currentGroupSaveKey === undefined) {
            return;
          }

          let steps = action.payload.count || 1;
          const nextSaveKey = getGroupSave(
            key,
            currentGroupSaveKey
          ).nextSaveKey;
          const groupSave = groupSavesIterator(
            key,
            currentGroupSaveKey,
            (gs: TGroupSave) => {
              deleteGroupSave(gs.groupKey, gs.key);

              return steps-- !== 0 ? gs.prevSaveKey : undefined;
            }
          );

          (groupSave as TGroupSave).nextSaveKey = nextSaveKey;
        });
      }

      // trigger HistoryWentBack/HistoryWentForward
      // if HistoryGoBack/HistoryGoForward were successful
      const wasUpdatedGroupsKeys = new Set<TGroupKey>();

      if (action.type === ActionType.AddSave) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);

          if (currentGroupSaveKey === undefined) {
            setCurrentGroupSaveKey(key, action.payload.saveKey);
          } else {
            const wasAddSave = getGroupChangeState(key) === true;
           
            if (wasAddSave) {
              setCurrentGroupSaveKey(key, action.payload.saveKey);
            }
          }
        });
      }

      if (action.type === ActionType.LoadPrevSave) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);

          if (currentGroupSaveKey === undefined) {
            return;
          }

          let steps = (action.payload.count || 1);
          const groupSave: TGroupSave = groupSavesIterator(
            key,
            currentGroupSaveKey,
            (groupSave) => {
              return steps-- === 0 ? undefined: groupSave.prevSaveKey;
            }
          ) as TGroupSave;

          if (groupSave.key !== currentGroupSaveKey) {
            wasUpdatedGroupsKeys.add(key);
            setCurrentGroupSaveKey(key, groupSave.key);
          }
        });
      }

      if (action.type === ActionType.LoadNextSave) {
        groupKeys.forEach(key => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);

          if (currentGroupSaveKey === undefined) {
            return;
          }

          let steps = action.payload.count || 1;
          const groupSave: TGroupSave = groupSavesIterator(
            key,
            currentGroupSaveKey,
            (groupSave) => {
              return steps-- === 0 ? undefined :  groupSave.nextSaveKey;
            }
          ) as TGroupSave;

          if (groupSave.key !== currentGroupSaveKey) {
            wasUpdatedGroupsKeys.add(key);
            setCurrentGroupSaveKey(key, groupSave.key);
          }
        });
      }

      groupKeys.forEach((groupKey) => {
        setGroupChangeState(groupKey, false);
      });

      // update public metadata for application
      // store.dispatch(
      //   createSetSaveMetadataAction({
      //     countSaves: groupsMaxCountSaves,
      //     currentSaveIndex: nextSaveIndex,
      //   })
      // );

      if (wasUpdatedGroupsKeys.size > 0) {
        if (action.type === ActionType.LoadPrevSave) {
          store.dispatch(createLoadPrevSaveDoneAction({
            groupKeys: Array.from(wasUpdatedGroupsKeys)
          }));
        }

        if (action.type === ActionType.LoadNextSave) {
          store.dispatch(createLoadNextSaveDoneAction({
            groupKeys: Array.from(wasUpdatedGroupsKeys)
          }));
        }
      }

      return result;
    };
  };
}

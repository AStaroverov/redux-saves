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
} from "./definitions";
import {
  deleteSaveStores,
  getGroupKeys,
  clearGroupSaveStore,
  addGroupSave,
  createGroupSave,
  getCurrentGroupSaveKey,
  getGroupAutoSaveKey,
  updateGroupAutoSaveKey,
  groupSavesIterator,
  setCurrentGroupSaveKey,
  getGroupChangeState,
  setGroupChangeState,
  groupSaveStore,
  deleteGroupSaveSafety,
  isGeneratedSaveKey,
  getGroupSave
} from "./helpers";
import { createSetSaveMetadataAction } from "./reducer";

// Middleware needs for control duplicate points in history and detect significant change,
export function createSavesMiddleware(): Middleware {
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
          const groupChangeState = getGroupChangeState(key);

          if (groupChangeState) {
            addGroupSave(
              createGroupSave(
                key,
                action.payload.saveKey,
                getCurrentGroupSaveKey(key),
              )
            );

            setCurrentGroupSaveKey(key, action.payload.saveKey);
          } else {
            const isUserSaveKey = !isGeneratedSaveKey(action.payload.saveKey);
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);

            // Cant be situation then groupChangeState === false and we try make duplicate save
            if (isUserSaveKey && currentGroupSaveKey) {
              const groupSave = getGroupSave(key, currentGroupSaveKey);
              
              addGroupSave(
                createGroupSave(
                  key,
                  action.payload.saveKey,
                  groupSave.prevSaveKey,
                )
              );

              setCurrentGroupSaveKey(key, action.payload.saveKey);
            }
          }
        });
      }

      if (
        action.type === ActionType.LoadSave
        || action.type === ActionType.LoadPrevSave
      ) {
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
      
      if (action.type === ActionType.RemoveSaves) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);

          if (currentGroupSaveKey === undefined) {
            return;
          }

          const { saveKeys, exceptSaveKeys } = action.payload;

          if (saveKeys === undefined && exceptSaveKeys === undefined) {
            deleteGroupSaveSafety(key, currentGroupSaveKey);
          }

          if (saveKeys !== undefined) {
            saveKeys.forEach((saveKey) => {
              deleteGroupSaveSafety(key, saveKey);
            });
          } else if (exceptSaveKeys !== undefined) {
            groupSaveStore.get(key)!.forEach((groupSave) => {
              if (exceptSaveKeys.indexOf(groupSave.key) !== -1) {
                deleteGroupSaveSafety(key, groupSave.key);
              }
            });
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
          let nextGroupSaveKey: TGroupSaveKey;
          const groupSave: TGroupSave = groupSavesIterator(
            key,
            currentGroupSaveKey,
            (groupSave) => {
              if (nextGroupSaveKey) {
                groupSave.nextSaveKey = nextGroupSaveKey;
              }

              // while we load prev saves, we create chain for load next
              nextGroupSaveKey = groupSave.key;

              return steps-- === 0 ? undefined: groupSave.prevSaveKey;
            }
          ) as TGroupSave;

          if (groupSave.key !== currentGroupSaveKey) {
            wasUpdatedGroupsKeys.add(key);
            setCurrentGroupSaveKey(key, groupSave.key);
          }
        });
      }

      if (
        action.type === ActionType.AddSave
        || action.type === ActionType.LoadPrevSave
      ) {
        groupKeys.forEach((groupKey) => {
          setGroupChangeState(groupKey, false);
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

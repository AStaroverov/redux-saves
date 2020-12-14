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
  getGroupSave,
  getGroupSaveKeys,
  getBranchForSave,
  trySetNextSaveKeyForGroupSave
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
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);
          const currentGroupSave = currentGroupSaveKey
            ? getGroupSave(key, currentGroupSaveKey)
            : undefined;

          if (groupChangeState) {
            addGroupSave(
              createGroupSave(
                key,
                action.payload.saveKey,
                currentGroupSaveKey,
              )
            );

            if (currentGroupSave !== undefined) {
              trySetNextSaveKeyForGroupSave(key, currentGroupSave.key, action.payload.saveKey);
            }

            setCurrentGroupSaveKey(key, action.payload.saveKey);
          } else
            // for duplicate save this condition always will be true
            if (currentGroupSave !== undefined) {
            
            // try create duplicate state
            const isUserSaveKey = !isGeneratedSaveKey(action.payload.saveKey);
            const prevSaveKey = currentGroupSave.prevSaveKey;

            if (isUserSaveKey) {
              addGroupSave(
                createGroupSave(
                  key,
                  action.payload.saveKey,
                  prevSaveKey,
                )
              );
              
              if (prevSaveKey !== undefined) {
                trySetNextSaveKeyForGroupSave(key, prevSaveKey, action.payload.saveKey);
              }

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
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);
            const saveKey = getGroupAutoSaveKey();
            
            addGroupSave(
              createGroupSave(
                key,
                saveKey,
                currentGroupSaveKey,
              )
            );

            if (currentGroupSaveKey !== undefined) {
              trySetNextSaveKeyForGroupSave(key, currentGroupSaveKey, saveKey);
            }

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

      const wasUpdatedGroupsKeys = new Set<TGroupKey>();

      if (action.type === ActionType.AddSave) {
        groupKeys.forEach((key) => {
          setGroupChangeState(key, false);
        });
      }

      if (action.type === ActionType.LoadSave) {
        groupKeys.forEach((key) => {
          setCurrentGroupSaveKey(key, action.payload.saveKey);
          setGroupChangeState(key, false);
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
          setGroupChangeState(key, false);
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

      const groupSaves: Record<TGroupKey, TGroupSaveKey[]> = {};
      const currentBranchSaves: Record<TGroupKey, TGroupSaveKey[]> = {};
      const currentGroupSaves: Record<TGroupKey, TGroupSaveKey | void> = {};

      groupKeys.forEach((key) => {
        groupSaves[key] = getGroupSaveKeys(key);
        currentGroupSaves[key] = getCurrentGroupSaveKey(key);
        currentBranchSaves[key] = currentGroupSaves[key]
          ? getBranchForSave(key, currentGroupSaves[key] as TGroupSaveKey)
          : [];
      });

      store.dispatch(
        createSetSaveMetadataAction({ groupSaves, currentBranchSaves, currentGroupSaves })
      );

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

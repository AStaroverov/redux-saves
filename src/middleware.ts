import { Middleware } from "redux";
import {
  isValuableAction,
  ActionType,
  createSaveSkipAction,
  createSaveUpdateReducersAction,
  createLoadPrevSaveDoneAction,
  createLoadNextSaveDoneAction,
  TSaveActions, TValuableSaveActions, TGroupKey
} from "./definitions";
import {
  deleteHistories,
  decreaseHistories,
  getHistories,
  getHistoryIndex,
  getNextHistoryIndex,
  setHistoryIndex,
  setNextHistoryIndex,
  decreaseHistoryFromHead, getGroupKeys,
} from "./helpers";
import { createSetSaveMetadataAction } from "./reducer";

const requestIdleCallback =
  // @ts-ignore
  globalThis.requestIdleCallback ||
  ((cb: VoidFunction) => globalThis.setTimeout(() => cb(), 3000));

// Middleware needs for control duplicate points in history and detect significant change,

export function createSavesMiddleware(options?: { limit: number }): Middleware {
  const limit = options?.limit || 50;
  const groupsMaxCountSaves = new Map<TGroupKey, number>();

  let scheduled = false;
  // simple scheduler for decrease histories, if they longer than limit
  const scheduleDecreaseHistoriesByLimit = () => {
    if (scheduled) {
      return;
    }
    scheduled = true;
    requestIdleCallback(() => {
      scheduled = false;
      getGroupKeys().map(getHistories).forEach((histories) => {
        histories.forEach((history) => {
          decreaseHistoryFromHead(history, history.length - limit);
        })
      });
    });
  };

  return function historyMiddleware(store) {
    return (next) => (action: TValuableSaveActions) => {
      // if action isn't valuable for history we can return default behavior
      if (!isValuableAction(action.type)) {
        return next(action);
      }

      const prevGroupsMaxCountSaves = new Map(groupsMaxCountSaves);
      const groupKeys: TGroupKey[] = action.payload.groupKeys || getGroupKeys();
      const groupSaveIndexes = groupKeys.map(getHistoryIndex);
      let groupHistories = groupKeys.map(getHistories);

      if (groupHistories.some((histories) => histories.length > 0)) {
        let nextGroupSaveIndexes = [...groupSaveIndexes];

        if (action.type === ActionType.ClearSaves) {
          groupKeys.forEach((key, i) => {
            setNextHistoryIndex(key, 0);
            groupsMaxCountSaves.set(key, 0);
          })
        }

        if (action.type === ActionType.AddSave) {
          // If we is in process historical travel, remove all points after current point
          groupSaveIndexes.forEach((saveIndex, i) => {
            if (saveIndex > 0) {
              decreaseHistories(groupKeys[i], saveIndex);
            }
          });

          nextGroupSaveIndexes.fill(0);
        }

        if (action.type === ActionType.RemoveLastSaves) {
          groupKeys.forEach((key, i) => {
            const saveIndex = groupSaveIndexes[i];
            const maxCountSaves = groupsMaxCountSaves.get(key)!;
            if (
              // We can remove points only not in travel time
              saveIndex === 0 &&
              // and only if we have some history points
              maxCountSaves > 0
            ) {
              const count = Math.min(
                action.payload.count || 1,
                maxCountSaves
              );

              decreaseHistories(key, count);
              groupsMaxCountSaves.set(key, Math.max(maxCountSaves - count, 0));
            }
          });
        }

        if (action.type === ActionType.LoadPrevSave) {
          groupKeys.forEach((key, i) => {
            const maxCountSaves = groupsMaxCountSaves.get(key)!;

            if (maxCountSaves > 0) {
              nextGroupSaveIndexes[i] = Math.min(
                maxCountSaves,
                groupSaveIndexes[i] + (action.payload.count || 1)
              );
            }
          });
        }

        if (action.type === ActionType.LoadNextSave) {
          groupKeys.forEach((key, i) => {
            const maxCountSaves = groupsMaxCountSaves.get(key)!;

            if (maxCountSaves > 0) {
              nextGroupSaveIndexes[i] = Math.max(1, groupSaveIndexes[i] - 1);
            }
          })
        }

        if (
          (action.type === ActionType.LoadPrevSave || action.type === ActionType.LoadNextSave) &&
          !nextGroupSaveIndexes.some((saveIndex, i) => {
            return saveIndex !== groupSaveIndexes[i];
          })
        ) {
          // If after HistoryGoBack\HistoryGoForward
          // nothing changed (nextHistoriesIndex === saveIndex)
          // we should skip call reducers, because reducers can have some changes
          // and we shouldn't rewrite this one
          // It's situations typical for reducers that we don't save on changes.
          return next(createSaveSkipAction());
        } else {
          groupKeys.forEach((key, i) => {
            setNextHistoryIndex(key, nextGroupSaveIndexes[i]);
          })
          // remove all histories for so as not to store dead reducers
          // (if we unregister reducer from dynamic modules)
          getGroupKeys().forEach(deleteHistories)
        }
      }

      const result = next(action);

      // reassign, couse we could add dynamical reducer
      groupHistories = groupKeys.map(getHistories);

      if (groupHistories.some((histories) => histories.length > 0)) {
        const nextGroupSaveIndexes = groupKeys.map(getNextHistoryIndex);
        const shouldUpdateGroupsReducers = groupKeys.map(() => false);

        if (action.type === ActionType.AddSave || action.type === ActionType.LoadPrevSave) {
          groupKeys.forEach((key, i) => {
            // Example - HistoryAddPoint()
            //                                         ↓ - histories index == 0
            // [0] [1] [2] [3] ...some changes... [new state]
            // Go back to one point
            // 1) Create new point from last reducers states
            //                      ↓ - histories index == 0
            // [0] [1] [2] [3] [4] ...
            // 3) Check that new points(index == 1) don't duplicate prev points(index == 2)
            // 4.1) if it's true, it's mean that created new Histories points
            // exactly same as last Histories points
            // Then we should remove last duplicate point
            //                  ↓ - histories index == 0
            // [0] [1] [2] [3] ...
            // 4.2) if it's false, it's mean that created new Histories points has changes
            // We dont do anything
            //                      ↓ - histories index == 0
            // [0] [1] [2] [3] [4] ...

            // Example - HistoryGoBack(1)
            //                                         ↓ - histories index == 0
            // [0] [1] [2] [3] ...some changes... [new state]
            // Go back to one point
            // 1) Create new point from last reducers states and go to this point
            //                  ↓ - new point
            // [0] [1] [2] [3] [4]
            // 2) Go back at 1 history point
            //              ↓ - history point
            // [0] [1] [2] [3] [4]
            // 3) Check that new points(index == 1) don't duplicate prev points(index == 2)
            // 4.1) if it's true, it's mean that created new Histories points
            // exactly same as last Histories points
            // Then we should remove last duplicate point and update reducers,
            // because now nextSaveIndex not coincides with reducers states
            // after this action it will be look as
            //          ↓ - history point
            // [0] [1] [2] [3]
            // 4.2) if it's false, it's mean that created new Histories points has changes
            // We dont do anything
            //              ↓ - history point
            // [0] [1] [2] [3] [4]
            const saveIndex = groupSaveIndexes[i];

            if (action.type === ActionType.LoadPrevSave && saveIndex !== 0) {
              return;
            }

            let duplicatedSaves = 0;
            let groupMaxCountSaves = 0;
            const histories = groupHistories[i];

            histories.forEach((history) => {
              groupMaxCountSaves = Math.max(groupMaxCountSaves, history.length);

              // start decrease histories by limit with delay
              if (groupMaxCountSaves > limit) {
                groupMaxCountSaves = limit;
                scheduleDecreaseHistoriesByLimit();
              }

              // Detect that reducer has changes
              if (history[history.length - 1] === history[history.length - 2]) {
                duplicatedSaves += 1;
              }
            });

            const allHistoriesHaveDuplicateSaves = duplicatedSaves === histories.length;

            if (allHistoriesHaveDuplicateSaves) {
              // If all reducers adds only state duplicates we can drop it
              decreaseHistories(key, 1);
              groupMaxCountSaves -= 1;
            }

            if (action.type === ActionType.LoadPrevSave) {
              // when we load prev we add history point and our index should shift at one
              nextGroupSaveIndexes[i] += 1;

              // if added point exactly same as prev history point it mean that we should update
              // our reducers, because now nextSaveIndex not coincides with reducers states
              if (allHistoriesHaveDuplicateSaves) {
                shouldUpdateGroupsReducers[i] = true;
              }
            }

            groupsMaxCountSaves.set(key, groupMaxCountSaves);
          });
        }

        // update indexes
        groupKeys.forEach((key, i) => {
          setHistoryIndex(key, nextGroupSaveIndexes[i]);
          setNextHistoryIndex(key, nextGroupSaveIndexes[i]);
        });

        // update reducers if after execution reducers
        // nextSaveIndex increased and maxHistoryLength decreased
        store.dispatch(
          createSaveUpdateReducersAction(
            {
              groupKeys: groupKeys.filter((k, i) => {
                return shouldUpdateGroupsReducers[i];
              })
            }
          )
        );

        // update public metadata for application
        // store.dispatch(
        //   createSetSaveMetadataAction({
        //     countSaves: groupsMaxCountSaves,
        //     currentSaveIndex: nextSaveIndex,
        //   })
        // );

        // trigger HistoryWentBack/HistoryWentForward
        // if HistoryGoBack/HistoryGoForward were successful
        const wasUpdatedGroupsKeys = new Set<TGroupKey>();

        prevGroupsMaxCountSaves.forEach((v, key) => {
          if (groupsMaxCountSaves.get(key) !== v) {
            wasUpdatedGroupsKeys.add(key);
          }
        })

        groupSaveIndexes.forEach((v, i) => {
          if (nextGroupSaveIndexes[i] !== v) {
            wasUpdatedGroupsKeys.add(groupKeys[i]);
          }
        })

        if (wasUpdatedGroupsKeys.size > 0) {
          if (action.type === ActionType.LoadPrevSave) {
            store.dispatch(createLoadPrevSaveDoneAction({ groupKeys: Array.from(wasUpdatedGroupsKeys) }));
          }

          if (action.type === ActionType.LoadNextSave) {
            store.dispatch(createLoadNextSaveDoneAction({ groupKeys: Array.from(wasUpdatedGroupsKeys) }));
          }
        }
      }

      return result;
    };
  };
}

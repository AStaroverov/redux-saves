import { Middleware } from "redux";
import {
  isValuableAction,
  ActionType,
  createSaveSkipAction,
  createSaveUpdateReducersAction,
  createLoadPrevSaveDoneAction,
  createLoadNextSaveDoneAction,
  TSaveActions
} from "./definitions";
import {
  removeHistories,
  decreaseHistories,
  getHistories,
  getHistoriesIndex,
  getNextHistoriesIndex,
  setHistoriesIndex,
  setNextHistoriesIndex,
  decreaseHistoryFromHead,
} from "./common";
import { createSetSaveMetadataAction } from "./reducer";

const requestIdleCallback =
  // @ts-ignore
  globalThis.requestIdleCallback ||
  ((cb: VoidFunction) => globalThis.setTimeout(() => cb(), 3000));

// Middleware needs for control duplicate points in history and detect significant change,

export function createSavesMiddleware(options?: { limit: number }): Middleware {
  const limit = options?.limit || 50;
  const histories = getHistories();
  let maxCountSaves = 0;

  let scheduled = false;
  // simple scheduler for decrease histories, if they longer than limit
  const scheduleDecreaseHistoriesByLimit = () => {
    if (scheduled) {
      return;
    }
    scheduled = true;
    requestIdleCallback(() => {
      scheduled = false;
      getHistories().forEach((history) => {
        decreaseHistoryFromHead(history, history.length - limit);
      });
    });
  };

  return function historyMiddleware(store) {
    return (next) => (action: TSaveActions) => {
      // if action isn't valuable for history we can return default behavior
      if (!isValuableAction(action.type)) {
        return next(action);
      }

      const saveIndex = getHistoriesIndex();
      const prevMaxCountSaves = maxCountSaves;

      if (histories.length > 0) {
        let nextHistoriesIndex = saveIndex;

        if (action.type === ActionType.ClearSaves) {
          setNextHistoriesIndex(0);
          maxCountSaves = 0;
        }

        if (action.type === ActionType.AddSave) {
          // If we is in process historical travel, remove all points after current point
          if (saveIndex > 0) {
            decreaseHistories(saveIndex);
          }

          nextHistoriesIndex = 0;
        }

        if (
          action.type === ActionType.RemoveLastSaves &&
          // We can remove points only not in travel time
          saveIndex === 0 &&
          // and only if we have some history points
          maxCountSaves > 0
        ) {
          const count = Math.min(
            action.payload || 1,
            maxCountSaves
          );

          decreaseHistories(count);
          maxCountSaves = Math.max(maxCountSaves - count, 0);
        }

        if (action.type === ActionType.LoadPrevSave && maxCountSaves > 0) {
          nextHistoriesIndex = Math.min(
            maxCountSaves,
            saveIndex + (action.payload || 1)
          );
        }

        if (action.type === ActionType.LoadNextSave && maxCountSaves > 0) {
          nextHistoriesIndex = Math.max(1, saveIndex - 1);
        }

        if (
          (action.type === ActionType.LoadPrevSave || action.type === ActionType.LoadNextSave) &&
          nextHistoriesIndex === saveIndex
        ) {
          // If after HistoryGoBack\HistoryGoForward
          // nothing changed (nextHistoriesIndex === saveIndex)
          // we should skip call reducers, because reducers can have some changes
          // and we shouldn't rewrite this one
          // It's situations typical for reducers that we don't save on changes.
          return next(createSaveSkipAction());
        } else {
          setNextHistoriesIndex(nextHistoriesIndex);
          // remove all histories for so as not to store dead reducers
          // (if we unregister reducer from dynamic modules)
          removeHistories();
        }
      }

      const result = next(action);

      if (histories.length > 0) {
        let nextSaveIndex = getNextHistoriesIndex();
        let shouldUpdateReducers = false;

        if (
          action.type === ActionType.AddSave ||
          (action.type === ActionType.LoadPrevSave && saveIndex === 0)
        ) {
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

          let duplicatedPoints = 0;
          maxCountSaves = 0;

          histories.forEach((history) => {
            maxCountSaves = Math.max(maxCountSaves, history.length);

            // start decrease histories by limit with delay
            if (maxCountSaves > limit) {
              maxCountSaves = limit;
              scheduleDecreaseHistoriesByLimit();
            }

            // Detect that reducer has changes
            if (history[history.length - 1] === history[history.length - 2]) {
              duplicatedPoints += 1;
            }
          });

          const allHistoriesHaveDuplicatePoints = duplicatedPoints === histories.length;

          if (allHistoriesHaveDuplicatePoints) {
            // If all reducers adds only state duplicates we can drop it
            decreaseHistories(1);
            maxCountSaves -= 1;
          }

          if (action.type === ActionType.LoadPrevSave) {
            // when we do "go back" we add history point and our index should shift at one
            nextSaveIndex += 1;

            // if added point exactly same as prev history point it mean that we should update
            // our reducers, because now nextSaveIndex not coincides with reducers states
            if (allHistoriesHaveDuplicatePoints) {
              shouldUpdateReducers = true;
            }
          }
        }

        // update indexes
        setHistoriesIndex(nextSaveIndex);
        setNextHistoriesIndex(nextSaveIndex);

        // update reducers if after execution reducers
        // nextSaveIndex increased and maxHistoryLength decreased
        if (shouldUpdateReducers) {
          store.dispatch(createSaveUpdateReducersAction());
        }

        // update public metadata for application
        store.dispatch(
          createSetSaveMetadataAction({
            countSaves: maxCountSaves,
            currentSaveIndex: nextSaveIndex,
          })
        );

        // trigger HistoryWentBack/HistoryWentForward
        // if HistoryGoBack/HistoryGoForward were successful
        if (prevMaxCountSaves !== maxCountSaves || saveIndex !== nextSaveIndex) {
          if (action.type === ActionType.LoadPrevSave) {
            store.dispatch(createLoadPrevSaveDoneAction());
          }

          if (action.type === ActionType.LoadNextSave) {
            store.dispatch(createLoadNextSaveDoneAction());
          }
        }
      }

      return result;
    };
  };
}

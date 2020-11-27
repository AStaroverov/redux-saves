import { Middleware } from "redux";
import {
  isValuableHistoryAction,
  ActionType,
  createHistorySkipAction,
  createHistoryUpdateReducersAction,
  createHistoryGoBackDoneAction,
  createHistoryGoForwardDoneAction,
  THistoryActions
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
import { createSetHistoryMetadataAction } from "./reducer";

const requestIdleCallback =
  // @ts-ignore
  globalThis.requestIdleCallback ||
  ((cb: VoidFunction) => globalThis.setTimeout(() => cb(), 3000));

// Middleware needs for control duplicate points in history and detect significant change,

export function createHistoryMiddleware(options?: { limit: number }): Middleware {
  const limit = options?.limit || 50;
  const histories = getHistories();
  let maxLengthHistories = 0;

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
    return (next) => (action: THistoryActions) => {
      // if action isn't valuable for history we can return default behavior
      if (!isValuableHistoryAction(action.type)) {
        return next(action);
      }

      const historiesIndex = getHistoriesIndex();
      const prevMaxLengthHistories = maxLengthHistories;

      if (histories.length > 0) {
        let nextHistoriesIndex = historiesIndex;

        if (action.type === ActionType.HistoryClear) {
          setNextHistoriesIndex(0);
          maxLengthHistories = 0;
        }

        if (action.type === ActionType.HistoryAddPoint) {
          // If we is in process historical travel, remove all points after current point
          if (historiesIndex > 0) {
            decreaseHistories(historiesIndex);
          }

          nextHistoriesIndex = 0;
        }

        if (
          action.type === ActionType.HistoryRemovePoint &&
          // We can remove points only not in travel time
          historiesIndex === 0 &&
          // and only if we have some history points
          maxLengthHistories > 0
        ) {
          const count = Math.min(
            action.payload || 1,
            maxLengthHistories
          );

          decreaseHistories(count);
          maxLengthHistories = Math.max(maxLengthHistories - count, 0);
        }

        if (action.type === ActionType.HistoryGoBack && maxLengthHistories > 0) {
          nextHistoriesIndex = Math.min(
            maxLengthHistories,
            historiesIndex + (action.payload || 1)
          );
        }

        if (action.type === ActionType.HistoryGoForward && maxLengthHistories > 0) {
          nextHistoriesIndex = Math.max(1, historiesIndex - 1);
        }

        if (
          (action.type === ActionType.HistoryGoBack || action.type === ActionType.HistoryGoForward) &&
          nextHistoriesIndex === historiesIndex
        ) {
          // If after HistoryGoBack\HistoryGoForward
          // nothing changed (nextHistoriesIndex === historiesIndex)
          // we should skip call reducers, because reducers can have some changes
          // and we shouldn't rewrite this one
          // It's situations typical for reducers that we don't save on changes.
          return next(createHistorySkipAction());
        } else {
          setNextHistoriesIndex(nextHistoriesIndex);
          // remove all histories for so as not to store dead reducers
          // (if we unregister reducer from dynamic modules)
          removeHistories();
        }
      }

      const result = next(action);

      if (histories.length > 0) {
        let nextHistoriesIndex = getNextHistoriesIndex();
        let shouldUpdateReducers = false;

        if (
          action.type === ActionType.HistoryAddPoint ||
          (action.type === ActionType.HistoryGoBack && historiesIndex === 0)
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
          // because now nextHistoriesIndex not coincides with reducers states
          // after this action it will be look as
          //          ↓ - history point
          // [0] [1] [2] [3]
          // 4.2) if it's false, it's mean that created new Histories points has changes
          // We dont do anything
          //              ↓ - history point
          // [0] [1] [2] [3] [4]

          let duplicatedPoints = 0;
          maxLengthHistories = 0;

          histories.forEach((history) => {
            maxLengthHistories = Math.max(maxLengthHistories, history.length);

            // start decrease histories by limit with delay
            if (maxLengthHistories > limit) {
              maxLengthHistories = limit;
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
            maxLengthHistories -= 1;
          }

          if (action.type === ActionType.HistoryGoBack) {
            // when we do "go back" we add history point and our index should shift at one
            nextHistoriesIndex += 1;

            // if added point exactly same as prev history point it mean that we should update
            // our reducers, because now nextHistoriesIndex not coincides with reducers states
            if (allHistoriesHaveDuplicatePoints) {
              shouldUpdateReducers = true;
            }
          }
        }

        // update indexes
        setHistoriesIndex(nextHistoriesIndex);
        setNextHistoriesIndex(nextHistoriesIndex);

        // update reducers if after execution reducers
        // nextHistoriesIndex increased and maxHistoryLength decreased
        if (shouldUpdateReducers) {
          store.dispatch(createHistoryUpdateReducersAction());
        }

        // update public metadata for application
        store.dispatch(
          createSetHistoryMetadataAction({
            historyLength: maxLengthHistories,
            historyIndex: nextHistoriesIndex,
          })
        );

        // trigger HistoryWentBack/HistoryWentForward
        // if HistoryGoBack/HistoryGoForward were successful
        if (prevMaxLengthHistories !== maxLengthHistories || historiesIndex !== nextHistoriesIndex) {
          if (action.type === ActionType.HistoryGoBack) {
            store.dispatch(createHistoryGoBackDoneAction());
          }

          if (action.type === ActionType.HistoryGoForward) {
            store.dispatch(createHistoryGoForwardDoneAction());
          }
        }
      }

      return result;
    };
  };
}

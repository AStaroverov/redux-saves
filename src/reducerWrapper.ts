import { Reducer, AnyAction } from "redux";
import {
  isValuableHistoryAction, ActionType, THistoryActions,
} from "./definitions";
import {
  addHistory,
  THistory,
  pushToHistory,
  createHistory,
  clearHistory,
  getHistoriesIndex,
  getNextHistoriesIndex,
} from "./common";

// undoRedoReducerWrapper create for each reducer history and controls the content
export function historyReducerWrapper<S>(
  reducer: Reducer<S, AnyAction | THistoryActions>
): Reducer<S, AnyAction | THistoryActions> {
  const history: THistory = createHistory();

  return (reducerState: S | undefined, action: AnyAction | THistoryActions): S => {
    // HistoryUpdateReducers for sync redux-history states and reducers
    if (action.type === ActionType.HistoryUpdateReducers) {
      return (history[history.length - Math.min(getHistoriesIndex(), history.length)] ||
        reducerState) as S;
    }

    // use default logic for none history actions
    if (reducerState === undefined || !isValuableHistoryAction(action.type)) {
      return reducer(reducerState, action);
    }

    // add history each history action, it give understanding that this reducer still alive
    addHistory(history);

    const nextHistoriesIndex = getNextHistoriesIndex();

    if (action.type === ActionType.HistoryGoBack) {
      if (history.length === 0) {
        return reducerState;
      }

      const nextState = history[history.length - Math.min(nextHistoriesIndex, history.length)] as S;

      // Add history point if we not in travel
      if (getHistoriesIndex() === 0) {
        pushToHistory(history, reducerState);
      }

      return nextState;
    }

    if (action.type === ActionType.HistoryGoForward) {
      if (history.length === 0) {
        return reducerState;
      }

      return history[history.length - Math.min(nextHistoriesIndex, history.length)] as S;
    }

    if (action.type === ActionType.HistoryAddPoint) {
      pushToHistory(history, reducerState);
    }

    if (action.type === ActionType.HistoryClear) {
      clearHistory(history);
    }

    return reducerState;
  };
}

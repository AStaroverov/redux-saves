import { Reducer, AnyAction } from "redux";
import {
  isValuableAction, ActionType, TSaveActions, TGroupKey, DEFAULT_GROUP_KEY, isValuableReducerAction,
} from "./definitions";
import {
  addHistory,
  THistory,
  pushToHistory,
  createHistory,
  clearHistory,
  getHistoryIndex,
  getNextHistoryIndex,
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

  const history: THistory = createHistory();

  return (reducerState: S | undefined, action: AnyAction | TSaveActions): S => {
    // skip on init state
    if (reducerState === undefined) {
      return reducer(reducerState, action);
    }

    // use default logic for none redux-saves actions
    if (!isValuableReducerAction(action.type)) {
      return reducer(reducerState, action);
    }

    // add history each history action, it give understanding that this reducer still alive
    addHistory(groupKey, history);

    // if action not for this group
    if (action.payload.groupKeys !== undefined && action.payload.groupKeys.indexOf(groupKey) === -1) {
      return reducer(reducerState, action);
    }

    // SavesUpdateReducers for sync redux-history states and reducers
    if (action.type === ActionType.SavesUpdateReducers) {
      return (history[history.length - Math.min(getHistoryIndex(groupKey), history.length)] ||
        reducerState) as S;
    }

    const nextHistoryIndex = getNextHistoryIndex(groupKey);

    if (action.type === ActionType.LoadPrevSave) {
      if (history.length === 0) {
        return reducerState;
      }

      const nextState = history[history.length - Math.min(nextHistoryIndex, history.length)] as S;

      // Add history point if we not in travel
      if (getHistoryIndex(groupKey) === 0) {
        pushToHistory(history, reducerState);
      }

      return nextState;
    }

    if (action.type === ActionType.LoadNextSave) {
      if (history.length === 0) {
        return reducerState;
      }

      return history[history.length - Math.min(nextHistoryIndex, history.length)] as S;
    }

    if (action.type === ActionType.AddSave) {
      pushToHistory(history, reducerState);
    }

    if (action.type === ActionType.ClearSaves) {
      clearHistory(history);
    }

    return reducerState;
  };
}

export { savesReducerWrapper }

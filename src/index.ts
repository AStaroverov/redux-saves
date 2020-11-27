import { historyReducer } from "./reducer";
import { historyReducerWrapper } from "./reducerWrapper";
import { createHistoryMiddleware } from "./middleware";
import { ActionType,
  createHistoryAddPointAction,
  createHistoryClearAction,
  createHistoryGoBackAction,
  createHistoryGoForwardAction,
  createHistoryRemovePointAction,
} from "./definitions";

export const historyActionType = ActionType;

export {
  createHistoryMiddleware,
  historyReducerWrapper,
  historyReducer,
  createHistoryAddPointAction,
  createHistoryRemovePointAction,
  createHistoryClearAction,
  createHistoryGoBackAction,
  createHistoryGoForwardAction,
}

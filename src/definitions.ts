import { Action } from "redux";

export type TBaseHistoryAction<T = ActionType, P = void> = Action<T> & {
  payload: P;
}

export type THistoryActions =
  | THistoryUpdateReducersAction
  | THistoryAddPointAction
  | THistoryRemovePointAction
  | THistoryClearAction
  | THistoryGoBackAction
  | THistoryGoForwardAction
  | THistoryGoBackDoneAction
  | THistoryGoForwardDoneAction
  | THistorySkipAction

export enum ActionType {
  HistoryUpdateReducers = '@@HISTORY@@/HistoryUpdateReducers',

  HistoryClear = '@@HISTORY@@/HistoryClear',
  HistoryAddPoint = '@@HISTORY@@/HistoryAddPoint',
  HistoryRemovePoint = '@@HISTORY@@/HistoryRemovePoint',
  HistoryGoBack = '@@HISTORY@@/HistoryGoBack',
  HistoryGoForward = '@@HISTORY@@/HistoryGoForward',

  HistoryGoBackDone = '@@HISTORY@@/HistoryGoBackDone',
  HistoryGoForwardDone = '@@HISTORY@@/HistoryGoForwardDone',
  HistorySkip = '@@HISTORY@@/HistorySkip',
}

export const isValuableHistoryAction = (actionType: string) => {
  switch (actionType) {
    case ActionType.HistoryClear:
    case ActionType.HistoryAddPoint:
    case ActionType.HistoryRemovePoint:
    case ActionType.HistoryGoBack:
    case ActionType.HistoryGoForward: {
      return true;
    }
    default:
      return false;
  }
};

export type THistoryUpdateReducersAction = TBaseHistoryAction<ActionType.HistoryUpdateReducers>;
export function createHistoryUpdateReducersAction(): THistoryUpdateReducersAction {
  return {
    type: ActionType.HistoryUpdateReducers,
    payload: undefined,
  }
}

export type THistoryAddPointAction = TBaseHistoryAction<ActionType.HistoryAddPoint>;
export function createHistoryAddPointAction(): THistoryAddPointAction {
  return {
    type: ActionType.HistoryAddPoint,
    payload: undefined,
  }
}

export type THistoryRemovePointAction = TBaseHistoryAction<ActionType.HistoryRemovePoint, number | void>;
export function createHistoryRemovePointAction(count?: number): THistoryRemovePointAction {
  return {
    type: ActionType.HistoryRemovePoint,
    payload: count
  }
}

export type THistoryClearAction = TBaseHistoryAction<ActionType.HistoryClear>;
export function createHistoryClearAction(): THistoryClearAction {
  return {
    type: ActionType.HistoryClear,
    payload: undefined
  }
}

export type THistoryGoBackAction = TBaseHistoryAction<ActionType.HistoryGoBack, number | void>;
export function createHistoryGoBackAction(count?: number): THistoryGoBackAction {
  return {
    type: ActionType.HistoryGoBack,
    payload: count
  }
}

export type THistoryGoForwardAction = TBaseHistoryAction<ActionType.HistoryGoForward, number | void>;
export function createHistoryGoForwardAction(count?: number): THistoryGoForwardAction {
  return {
    type: ActionType.HistoryGoForward,
    payload: count
  }
}

// Just for trigger business logic
export type THistoryGoBackDoneAction = TBaseHistoryAction<ActionType.HistoryGoBackDone>;
export function createHistoryGoBackDoneAction(): THistoryGoBackDoneAction {
  return {
    type: ActionType.HistoryGoBackDone,
    payload: undefined
  }
}

export type THistoryGoForwardDoneAction = TBaseHistoryAction<ActionType.HistoryGoForwardDone>;
export function createHistoryGoForwardDoneAction(): THistoryGoForwardDoneAction {
  return {
    type: ActionType.HistoryGoForwardDone,
    payload: undefined
  }
}

// Action for skip some valuable action
export type THistorySkipAction = TBaseHistoryAction<ActionType.HistorySkip>;
export function createHistorySkipAction(): THistorySkipAction {
  return {
    type: ActionType.HistorySkip,
    payload: undefined
  }
}

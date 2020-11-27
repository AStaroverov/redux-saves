import { Action } from 'redux';

export const setHistoryMetadataActionType: '@@HISTORY@@/SetHistoryMetadataActionType'
  = '@@HISTORY@@/SetHistoryMetadataActionType';

export type THistoryState = {
  historyLength: number;
  historyIndex: number;
};

export function getInitialState(): THistoryState {
  return {
    historyLength: 0,
    historyIndex: 0,
  };
}

export type TSetHistoryMetadataAction = Action<typeof setHistoryMetadataActionType> & { payload: THistoryState };
export function createSetHistoryMetadataAction(payload: THistoryState): TSetHistoryMetadataAction {
  return {
    type: setHistoryMetadataActionType,
    payload
  };
}

export function historyReducer(
  state: THistoryState = getInitialState(),
  action: Action | TSetHistoryMetadataAction
): THistoryState {
  switch (action.type) {
    case setHistoryMetadataActionType: {
      return {
        ...state,
        ...(action as TSetHistoryMetadataAction).payload,
      }
    }

    default: return state
  }
}

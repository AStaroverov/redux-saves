import { Action } from 'redux';

export const setSavesMetadataActionType: '@@REDUX_SAVES@@/setSavesMetadataActionType'
  = '@@REDUX_SAVES@@/setSavesMetadataActionType';

export type TSavesState = {
  countSaves: number;
  currentSaveIndex: number;
};

export function getInitialState(): TSavesState {
  return {
    countSaves: 0,
    currentSaveIndex: 0,
  };
}

export type TSetSavesMetadataAction = Action<typeof setSavesMetadataActionType> & { payload: TSavesState };
export function createSetSaveMetadataAction(payload: TSavesState): TSetSavesMetadataAction {
  return {
    type: setSavesMetadataActionType,
    payload
  };
}

export function savesReducer(
  state: TSavesState = getInitialState(),
  action: Action | TSetSavesMetadataAction
): TSavesState {
  switch (action.type) {
    case setSavesMetadataActionType: {
      return {
        ...state,
        ...(action as TSetSavesMetadataAction).payload,
      }
    }

    default: return state
  }
}

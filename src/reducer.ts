import { Action } from 'redux';
import { TGroupKey, TGroupSaveKey } from './definitions';

export const setSavesMetadataActionType: '@@REDUX_SAVES@@/setSavesMetadataActionType'
  = '@@REDUX_SAVES@@/setSavesMetadataActionType';

export type TSavesState = {
  groupSaves: Record<TGroupKey, TGroupSaveKey[] | void>;
  currentBranchSaves: Record<TGroupKey, TGroupSaveKey[] | void>;
  currentGroupSaves: Record<TGroupKey, TGroupSaveKey | void>;
};

export function getInitialState(): TSavesState {
  return {
    groupSaves: {},
    currentBranchSaves: {},
    currentGroupSaves: {},
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
      const { groupSaves, currentBranchSaves, currentGroupSaves } =
        (action as TSetSavesMetadataAction).payload;


      return {
        ...state,
        groupSaves: {
          ...state.groupSaves,
          ...groupSaves
        },
        currentBranchSaves: {
          ...state.currentBranchSaves,
          ...currentBranchSaves
        },
        currentGroupSaves: {
          ...state.currentGroupSaves,
          ...currentGroupSaves
        },
      }
    }

    default: return state
  }
}

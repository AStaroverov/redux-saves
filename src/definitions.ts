import { Action } from "redux";

export type TBaseSaveAction<T = ActionType, P = void> = Action<T> & {
  payload: P;
}

export type TSaveActions =
  | TSaveUpdateReducersAction
  | TAddSaveAction
  | TRemoveLastSavesAction
  | TClearSavesAction
  | TLoadPrevSaveAction
  | TLoadNextSaveAction
  | TLoadPrevSaveDoneAction
  | TLoadNextSaveDoneAction
  | TSaveSkipAction

export enum ActionType {
  SaveSkip = '@@REDUX_SAVE@@/SaveSkip',
  SavesUpdateReducers = '@@REDUX_SAVE@@/SavesUpdateReducers',
  ClearSaves = '@@REDUX_SAVE@@/ClearSaves',
  AddSave = '@@REDUX_SAVE@@/AddSave',
  RemoveLastSaves = '@@REDUX_SAVE@@/RemoveLastsSaves',
  LoadPrevSave = '@@REDUX_SAVE@@/LoadPrevSave',
  LoadNextSave = '@@REDUX_SAVE@@/LoadNextSave',
  LoadPrevSaveDone = '@@REDUX_SAVE@@/LoadPrevSaveDone',
  LoadNextSaveDone = '@@REDUX_SAVE@@/LoadNextSaveDone',
}

export const isValuableAction = (actionType: string) => {
  switch (actionType) {
    case ActionType.ClearSaves:
    case ActionType.AddSave:
    case ActionType.RemoveLastSaves:
    case ActionType.LoadPrevSave:
    case ActionType.LoadNextSave: {
      return true;
    }
    default:
      return false;
  }
};

export type TSaveUpdateReducersAction = TBaseSaveAction<ActionType.SavesUpdateReducers>;
export function createSaveUpdateReducersAction(): TSaveUpdateReducersAction {
  return {
    type: ActionType.SavesUpdateReducers,
    payload: undefined,
  }
}

export type TAddSaveAction = TBaseSaveAction<ActionType.AddSave>;
export function createAddSaveAction(): TAddSaveAction {
  return {
    type: ActionType.AddSave,
    payload: undefined,
  }
}

export type TRemoveLastSavesAction = TBaseSaveAction<ActionType.RemoveLastSaves, number | void>;
export function createRemoveLastSavesAction(count?: number): TRemoveLastSavesAction {
  return {
    type: ActionType.RemoveLastSaves,
    payload: count
  }
}

export type TClearSavesAction = TBaseSaveAction<ActionType.ClearSaves>;
export function createClearSavesAction(): TClearSavesAction {
  return {
    type: ActionType.ClearSaves,
    payload: undefined
  }
}

export type TLoadPrevSaveAction = TBaseSaveAction<ActionType.LoadPrevSave, number | void>;
export function createLoadPrevSaveAction(count?: number): TLoadPrevSaveAction {
  return {
    type: ActionType.LoadPrevSave,
    payload: count
  }
}

export type TLoadNextSaveAction = TBaseSaveAction<ActionType.LoadNextSave, number | void>;
export function createLoadNextSaveAction(count?: number): TLoadNextSaveAction {
  return {
    type: ActionType.LoadNextSave,
    payload: count
  }
}

// Just for trigger business logic
export type TLoadPrevSaveDoneAction = TBaseSaveAction<ActionType.LoadPrevSaveDone>;
export function createLoadPrevSaveDoneAction(): TLoadPrevSaveDoneAction {
  return {
    type: ActionType.LoadPrevSaveDone,
    payload: undefined
  }
}

export type TLoadNextSaveDoneAction = TBaseSaveAction<ActionType.LoadNextSaveDone>;
export function createLoadNextSaveDoneAction(): TLoadNextSaveDoneAction {
  return {
    type: ActionType.LoadNextSaveDone,
    payload: undefined
  }
}

// Action for skip some valuable action
export type TSaveSkipAction = TBaseSaveAction<ActionType.SaveSkip>;
export function createSaveSkipAction(): TSaveSkipAction {
  return {
    type: ActionType.SaveSkip,
    payload: undefined
  }
}

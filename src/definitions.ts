import { Action } from "redux";
import { createGroupSaveKey } from "./helpers";

export const EMPTY_OBJECT = Object.freeze({});

export type TGroupKey = string | number;
export type TGroupSaveKey = string | number;
export type TSnapshot = unknown;

export type TGroupSave = {
  key: TGroupSaveKey
  groupKey: TGroupKey
  prevSaveKey: TGroupSaveKey | void
  nextSaveKey: TGroupSaveKey | void
}

export type TSave = {
  groupSaveKey: TGroupSaveKey
  snapshot: TSnapshot
}

export const DEFAULT_GROUP_KEY: TGroupKey = '__DEFAULT_GROUP_KEY__' as TGroupKey;

export type TBaseSaveAction<T = ActionType, P = void> = Action<T> & {
  payload: P;
}

export type TSaveActions =
  | TAddSaveAction
  | TRemoveSavesAction
  | TClearSavesAction
  | TLoadSaveAction
  | TLoadPrevSaveAction
  | TLoadNextSaveAction
  | TLoadPrevSaveDoneAction
  | TLoadNextSaveDoneAction

export type TValuableSaveActions =
  | TClearSavesAction
  | TAddSaveAction
  | TRemoveSavesAction
  | TLoadSaveAction
  | TLoadPrevSaveAction
  | TLoadNextSaveAction

export const enum ActionType {
  SetInitState = '@@REDUX_SAVE@@/SetInitState',
  ClearSaves = '@@REDUX_SAVE@@/ClearSaves',
  AddSave = '@@REDUX_SAVE@@/AddSave',
  RemoveSaves = '@@REDUX_SAVE@@/RemoveLastsSaves',
  LoadSave = '@@REDUX_SAVE@@/LoadSave',
  LoadPrevSave = '@@REDUX_SAVE@@/LoadPrevSave',
  LoadNextSave = '@@REDUX_SAVE@@/LoadNextSave',
  LoadPrevSaveDone = '@@REDUX_SAVE@@/LoadPrevSaveDone',
  LoadNextSaveDone = '@@REDUX_SAVE@@/LoadNextSaveDone',
}

export const isValuableAction = (actionType: ActionType) => {
  switch (actionType) {
    case ActionType.ClearSaves:
    case ActionType.AddSave:
    case ActionType.LoadSave:
    case ActionType.RemoveSaves:
    case ActionType.LoadPrevSave:
    case ActionType.LoadNextSave: {
      return true;
    }
    default:
      return false;
  }
};

export type TSetInitStateAction = Action<ActionType.SetInitState>;
export function createSetInitStateAction(): TSetInitStateAction {
  return {
    type: ActionType.SetInitState,
  }
}

export type TAddSaveAction = TBaseSaveAction<ActionType.AddSave, {
  saveKey: TGroupSaveKey
  groupKeys?: TGroupKey[],
}>;
export function createAddSaveAction(
  payload?: {
    groupKeys?: TGroupKey[]
    saveKey?: TGroupSaveKey,
  }
): TAddSaveAction {
  return {
    type: ActionType.AddSave,
    payload: {
      groupKeys: payload?.groupKeys as TGroupKey[],
      saveKey: (payload?.saveKey || createGroupSaveKey()) as TGroupSaveKey,
    },
  }
}

export type TRemoveSavesAction = TBaseSaveAction<ActionType.RemoveSaves, {
  groupKeys?: TGroupKey[],
  saveKeys?: TGroupSaveKey[],
  exceptSaveKeys?: TGroupSaveKey[],
}>;
export function createRemoveSavesAction(
  payload?: {
    groupKeys?: TGroupKey[],
    saveKeys?: TGroupSaveKey[],
    exceptSaveKeys?: TGroupSaveKey[],
  }
): TRemoveSavesAction {
  return {
    type: ActionType.RemoveSaves,
    payload: payload || EMPTY_OBJECT,
  }
}

export type TClearSavesAction = TBaseSaveAction<ActionType.ClearSaves, {
  groupKeys?: TGroupKey[] | void
}>;
export function createClearSavesAction(payload?: { groupKeys?: TGroupKey[] }): TClearSavesAction {
  return {
    type: ActionType.ClearSaves,
    payload: payload || EMPTY_OBJECT,
  }
}

export type TLoadSaveAction = TBaseSaveAction<ActionType.LoadSave, {
  groupKeys?: TGroupKey[] | void,
  saveKey: TGroupSaveKey
}>;
export function createLoadSaveAction(payload: {
  groupKeys?: TGroupKey[],
  saveKey: TGroupSaveKey
}): TLoadSaveAction {
  return {
    type: ActionType.LoadSave,
    payload: payload as TLoadSaveAction['payload']
  }
}

export type TLoadPrevSaveAction = TBaseSaveAction<ActionType.LoadPrevSave, { groupKeys?: TGroupKey[] | void, count?: number }>;
export function createLoadPrevSaveAction(payload?: { groupKeys?: TGroupKey[], count?: number }): TLoadPrevSaveAction {
  return {
    type: ActionType.LoadPrevSave,
    payload: payload || EMPTY_OBJECT
  }
}

export type TLoadNextSaveAction = TBaseSaveAction<ActionType.LoadNextSave, { groupKeys?: TGroupKey[] | void, count?: number }>;
export function createLoadNextSaveAction(payload?: { groupKeys?: TGroupKey[], count?: number }): TLoadNextSaveAction {
  return {
    type: ActionType.LoadNextSave,
    payload: payload || EMPTY_OBJECT
  }
}

// Just for trigger business logic
export type TLoadPrevSaveDoneAction = TBaseSaveAction<ActionType.LoadPrevSaveDone, { groupKeys?: TGroupKey[] }>;
export function createLoadPrevSaveDoneAction(payload: { groupKeys: TGroupKey[] }): TLoadPrevSaveDoneAction {
  return {
    type: ActionType.LoadPrevSaveDone,
    payload
  }
}

export type TLoadNextSaveDoneAction = TBaseSaveAction<ActionType.LoadNextSaveDone, { groupKeys?: TGroupKey[] }>;
export function createLoadNextSaveDoneAction(payload: { groupKeys: TGroupKey[] }): TLoadNextSaveDoneAction {
  return {
    type: ActionType.LoadNextSaveDone,
    payload
  }
}

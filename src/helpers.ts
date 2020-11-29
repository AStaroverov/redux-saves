import {TGroupKey} from "./definitions";

// GroupKeys
let isDirty: boolean = true;
let groupKeysArray: TGroupKey[];
const groupKeysSet = new Set<TGroupKey>();

export function addGroupKey(key: TGroupKey): void {
  groupKeysSet.add(key);
  isDirty = true;
}

export function deleteGroupKey(key: TGroupKey): void {
  groupKeysSet.delete(key);
  isDirty = true;
}

export function getGroupKeys(): TGroupKey[] {
  if (isDirty) {
    isDirty = false;
    groupKeysArray = Array.from(groupKeysSet);
  }

  return groupKeysArray;
}

// History
export type THistory = unknown[];

export function createHistory(): THistory {
  return [];
}

export function pushToHistory(history: THistory, snapshot: unknown): void {
  history.push(snapshot);
}

export function decreaseHistoryFromTail(history: THistory, length: number): void {
  history.length = Math.max(history.length - length, 0);
}

export function decreaseHistoryFromHead(history: THistory, length: number): void {
  history.splice(0, Math.min(length, history.length));
}

export function clearHistory(history: THistory): void {
  history.length = 0;
}

// Histories
const mapGroupKeyToHistories = new Map<TGroupKey, THistory[]>();

export const getHistories = (groupKey: TGroupKey): THistory[] => mapGroupKeyToHistories.get(groupKey)!;

export const decreaseHistories = (groupKey: TGroupKey, length: number): void => {
  getHistories(groupKey).forEach((history) => decreaseHistoryFromTail(history, length));
};

export const deleteHistories = (groupKey: TGroupKey): void => {
  deleteGroupKey(groupKey);
  mapGroupKeyToHistories.delete(groupKey);
};

export const addHistory = (groupKey: TGroupKey, history: THistory): void => {
  if (!mapGroupKeyToHistories.has(groupKey)) {
    addGroupKey(groupKey);
    mapGroupKeyToHistories.set(groupKey, []);
  }

  mapGroupKeyToHistories.get(groupKey)!.push(history);
};

// Histories index - it's shift for get history point
// Example we have 5 points in history and histories index == 2
// maxHistoryLength(5) - 2(histories index) = 3(history point for each reducer);
//              ↓ - history point
// [0] [1] [2] [3] [4]

const mapGroupToHistoryIndex = new Map<TGroupKey, number>();

export const getHistoryIndex = (groupKey: TGroupKey): number => mapGroupToHistoryIndex.get(groupKey)!;

export const setHistoryIndex = (groupKey: TGroupKey, index: number): void => {
  mapGroupToHistoryIndex.set(groupKey, index);
};

// Next Histories index
const nextMapGroupToHistoryIndex = new Map<TGroupKey, number>();

export const getNextHistoryIndex = (groupKey: TGroupKey): number => nextMapGroupToHistoryIndex.get(groupKey)!;

export const setNextHistoryIndex = (groupKey: TGroupKey, index: number): void => {
  nextMapGroupToHistoryIndex.set(groupKey, index);
};

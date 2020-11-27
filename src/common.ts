// History
export type THistory = unknown[];

export function createHistory(): THistory {
  return [];
}

export function pushToHistory(history: THistory, point: unknown): void {
  history.push(point);
}

export function decreaseHistoryFromTail(history: THistory, length: number): void {
  history.length = Math.max(history.length - length, 0);
}

export function decreaseHistoryFromHead(history: THistory, length: number): void {
  history.splice(0, Math.max(length, history.length));
}

export function clearHistory(history: THistory): void {
  history.length = 0;
}

// Histories
const histories: THistory[] = [];

export const getHistories = (): THistory[] => histories;

export const decreaseHistories = (length: number): void => {
  histories.forEach((history) => decreaseHistoryFromTail(history, length));
};

export const removeHistories = (): void => {
  histories.length = 0;
};

export const addHistory = (history: THistory): void => {
  histories.push(history);
};

// Histories index - it's shift for get history point
// Example we have 5 points in history and histories index == 2
// maxHistoryLength(5) - 2(histories index) = 3(history point for each reducer);
//              ↓ - history point
// [0] [1] [2] [3] [4]

let historiesIndex = 0;

export const getHistoriesIndex = (): number => historiesIndex;

export const setHistoriesIndex = (value: number): void => {
  historiesIndex = value;
};

// Next Histories index
let nextHistoriesIndex = 0;

export const getNextHistoriesIndex = (): number => nextHistoriesIndex;

export const setNextHistoriesIndex = (value: number): number => {
  return (nextHistoriesIndex = value);
};

import { TGroupKey, TGroupSave, TGroupSaveKey, TSave, TSnapshot } from "./definitions";

export function createGroupSave(
  groupKey: TGroupKey,
  saveKey: TGroupSaveKey,
  prevSaveKey?: TGroupSaveKey | void,
  nextSaveKey?: TGroupSaveKey | void,
): TGroupSave { 
  return { groupKey, key: saveKey, prevSaveKey, nextSaveKey };
}

// create Group Save key
let groupSaveIndex = 0;
export function createGroupSaveKey(): TGroupSaveKey {
  return `save-${groupSaveIndex++}` as TGroupSaveKey;
}

// Autosave
let groupAutoSaveIndex = 0;
export function updateGroupAutoSaveKey(): void {
  groupAutoSaveIndex += 1;
}

export function getGroupAutoSaveKey(): TGroupSaveKey {
  return `autosave-${groupAutoSaveIndex}` as TGroupSaveKey;
}

export const mapGroupKeyToNeedAutoSave = new Map<TGroupKey, boolean>();
export function setGroupChangeState(groupKey: TGroupKey, state: boolean): void {
  mapGroupKeyToNeedAutoSave.set(groupKey, state);
}

export function getGroupChangeState(groupKey: TGroupKey): boolean | void {
  return mapGroupKeyToNeedAutoSave.get(groupKey);
}

// create Save
export function createSave(
  snapshot: TSnapshot,
): TSave { 
  return { snapshot };
}

let currentSaveIndex = 0;

export function getCurrentSaveIndex(): number {
  return currentSaveIndex;
}

export function increaseSaveIndex(): number {
  return ++currentSaveIndex;
}

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

// Reducer Saves
export type TSaveStore = Map<TGroupSaveKey, TSave>;

export function createSaveStore(): TSaveStore {
  return new Map();
}

export function getSave(store: TSaveStore, key: TGroupSaveKey): TSave {
  return store.get(key)!;
}

export const getSaveStoreSize = (store: TSaveStore): number => store.size;

export function addSave(store: TSaveStore, key: TGroupSaveKey, save: TSave): void {
  store.set(key, save);
}

export function deleteSave(store: TSaveStore, key: TGroupSaveKey): void {
  store.delete(key);
}

export function deleteSaves(store: TSaveStore): void {
  store.clear();
}

// Group Saves Store
export const groupSaveStore = new Map<TGroupKey, Map<TGroupSaveKey, TGroupSave>>()

export function getGroupSaveStoreSize (): number { return groupSaveStore.size; }

export function getGroupSave(groupKey: TGroupKey, saveKey: TGroupSaveKey): TGroupSave {
  return groupSaveStore.get(groupKey)!.get(saveKey)!;
}

export function addGroupSave(save: TGroupSave): void {
  if (!groupSaveStore.has(save.groupKey)) {
    groupSaveStore.set(save.groupKey, new Map());
  }

  groupSaveStore.get(save.groupKey)!.set(save.key, save);
}

export function deleteGroupSave(groupKey: TGroupKey, saveKey: TGroupSaveKey): void {
  groupSaveStore.get(groupKey)!.delete(saveKey);
}

export function clearGroupSaveStore(key: TGroupKey): void {
  groupSaveStore.get(key)?.clear();
}

// last group save
const mapGroupKeyToCurrentGroupSaveKey = new Map<TGroupKey, TGroupSaveKey | void>();

export function setCurrentGroupSaveKey(key: TGroupKey, saveKey: TGroupSaveKey | void): void {
  mapGroupKeyToCurrentGroupSaveKey.set(key, saveKey);
}
export function getCurrentGroupSaveKey(key: TGroupKey): TGroupSaveKey | void {
  return mapGroupKeyToCurrentGroupSaveKey.get(key);
}

// groupSave iterator
export function groupSavesIterator(
  groupKey: TGroupKey,
  groupSaveKey: TGroupSaveKey,
  cb: (groupSave: TGroupSave) => TGroupSaveKey | void,
): TGroupSave | void {
  let groupSave: TGroupSave | void = getGroupSave(groupKey, groupSaveKey);
  let tmpGroupSave: TGroupSave | void;
  
  while (groupSave !== undefined) {
    tmpGroupSave = groupSave;

    const key = cb(groupSave);

    groupSave = key ? getGroupSave(groupKey, key) : undefined;
  }

  return tmpGroupSave;
}

// Save stores
export const mapGroupKeyToSaveStores = new Map<TGroupKey, TSaveStore[]>();

export const getSaveStores = (groupKey: TGroupKey): TSaveStore[] => mapGroupKeyToSaveStores.get(groupKey)!;

export const deleteSaveStores = (groupKey: TGroupKey): void => {
  deleteGroupKey(groupKey);
  mapGroupKeyToSaveStores.delete(groupKey);
};

export const registerSaveStore = (groupKey: TGroupKey, store: TSaveStore): void => {
  if (!mapGroupKeyToSaveStores.has(groupKey)) {
    addGroupKey(groupKey);
    mapGroupKeyToSaveStores.set(groupKey, []);
  }

  mapGroupKeyToSaveStores.get(groupKey)!.push(store);
};

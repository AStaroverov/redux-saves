import { TGroupKey, TGroupSave, TGroupSaveKey, TSave, TSnapshot } from "./definitions";

// saves prefix
const SAVE_PREFIX = '@@REDUX-SAVE@@';

export function isGeneratedSaveKey(key: TGroupSaveKey): boolean {
  return typeof key === 'string' && key.startsWith(SAVE_PREFIX);
}

// create Group Save key
let groupSaveIndex = 0;
export function createGroupSaveKey(): TGroupSaveKey {
  return `${SAVE_PREFIX}/save-${groupSaveIndex++}` as TGroupSaveKey;
}

// Autosave
let groupAutoSaveIndex = 0;
export function updateGroupAutoSaveKey(): void {
  groupAutoSaveIndex += 1;
}

export function getGroupAutoSaveKey(): TGroupSaveKey {
  return `${SAVE_PREFIX}/autosave-${groupAutoSaveIndex}` as TGroupSaveKey;
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
  groupSaveKey: TGroupSaveKey,
  snapshot: TSnapshot,
): TSave { 
  return { groupSaveKey, snapshot };
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

export function addSave(store: TSaveStore, save: TSave): void {
  store.set(save.groupSaveKey, save);
}

export function deleteSave(store: TSaveStore, key: TGroupSaveKey): void {
  store.delete(key);
}

export function clearSaves(store: TSaveStore): void {
  store.clear();
}

// Group Saves
export function createGroupSave(
  groupKey: TGroupKey,
  saveKey: TGroupSaveKey,
  prevSaveKey?: TGroupSaveKey | void,
  nextSaveKey?: TGroupSaveKey | void,
): TGroupSave { 
  return { groupKey, key: saveKey, prevSaveKey, nextSaveKey };
}

export function trySetNextSaveKeyForGroupSave(
  groupKey: TGroupKey,
  saveKey: TGroupSaveKey,
  nextSaveKey: TGroupSaveKey
): void {
  const groupSave =
    getGroupSave(groupKey, saveKey);

  if (groupSave !== undefined) {
    groupSave.nextSaveKey = nextSaveKey;
  }
}

// Group Saves Store
export const groupSaveStore = new Map<TGroupKey, Map<TGroupSaveKey, TGroupSave>>()

export function getGroupSaveStoreSize (): number { return groupSaveStore.size; }

export function getGroupSave(groupKey: TGroupKey, saveKey: TGroupSaveKey): TGroupSave {
  return groupSaveStore.get(groupKey)!.get(saveKey)!;
}

export function getGroupSaveKeys(groupKey: TGroupKey): TGroupSaveKey[] {
  return Array.from(groupSaveStore.get(groupKey)?.keys() || []);
}

export function getBranchForSave(groupKey: TGroupKey, saveKey: TGroupSaveKey): TGroupSaveKey[] {
  const branch: TGroupSaveKey[] = [];
  const groupSave = getGroupSave(groupKey, saveKey);

  if (groupSave === undefined) {
    return branch;
  }

  branch.push(groupSave.key);

  if (groupSave.nextSaveKey !== undefined) {
    groupSavesIterator(
      groupKey,
      groupSave.nextSaveKey,
      (groupSave) => {
        branch.push(groupSave.key);
        return groupSave.nextSaveKey;
      }
    );
  }
  if (groupSave.prevSaveKey !== undefined) {
    groupSavesIterator(
      groupKey,
      groupSave.prevSaveKey,
      (groupSave) => {
        branch.unshift(groupSave.key);
        return groupSave.prevSaveKey;
      }
    );
  }

  return branch;
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

export function deleteGroupSaveSafety(
  groupKey: TGroupKey,
  groupSaveKey: TGroupSaveKey
): void {
  const groupSave = getGroupSave(groupKey, groupSaveKey);

  if (groupSave.prevSaveKey && groupSave.nextSaveKey) {
    const prevGroupSave = getGroupSave(groupKey, groupSave.prevSaveKey);
    const nextGroupSave = getGroupSave(groupKey, groupSave.nextSaveKey);
  
    nextGroupSave.prevSaveKey = prevGroupSave.key;
    prevGroupSave.nextSaveKey = nextGroupSave.key;
  }

  deleteGroupSave(groupKey, groupSave.key);

  if (getCurrentGroupSaveKey(groupKey) === groupSaveKey) {
    setCurrentGroupSaveKey(groupKey, groupSave.prevSaveKey);
  }
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

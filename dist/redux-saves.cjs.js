var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/index.ts
__export(exports, {
  SavesActionType: () => ActionType,
  createAddSaveAction: () => createAddSaveAction,
  createClearSavesAction: () => createClearSavesAction,
  createLoadNextSaveAction: () => createLoadNextSaveAction,
  createLoadPrevSaveAction: () => createLoadPrevSaveAction,
  createLoadSaveAction: () => createLoadSaveAction,
  createRemoveSavesAction: () => createRemoveSavesAction,
  createSavesMiddleware: () => createSavesMiddleware,
  savesReducer: () => savesReducer,
  savesReducerWrapper: () => savesReducerWrapper
});

// src/reducer.ts
var setSavesMetadataActionType = "@@REDUX_SAVES@@/setSavesMetadataActionType";
function getInitialState() {
  return {
    groupSaves: {},
    currentBranchSaves: {},
    currentGroupSaves: {}
  };
}
function createSetSaveMetadataAction(payload) {
  return {
    type: setSavesMetadataActionType,
    payload
  };
}
function savesReducer(state = getInitialState(), action) {
  switch (action.type) {
    case setSavesMetadataActionType: {
      const {groupSaves, currentBranchSaves, currentGroupSaves} = action.payload;
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
        }
      };
    }
    default:
      return state;
  }
}

// src/helpers.ts
var SAVE_PREFIX = "@@REDUX-SAVE@@";
function isGeneratedSaveKey(key) {
  return typeof key === "string" && key.startsWith(SAVE_PREFIX);
}
var groupSaveIndex = 0;
function createGroupSaveKey() {
  return `${SAVE_PREFIX}/save-${groupSaveIndex++}`;
}
var groupAutoSaveIndex = 0;
function updateGroupAutoSaveKey() {
  groupAutoSaveIndex += 1;
}
function getGroupAutoSaveKey() {
  return `${SAVE_PREFIX}/autosave-${groupAutoSaveIndex}`;
}
var mapGroupKeyToNeedAutoSave = new Map();
function setGroupChangeState(groupKey, state) {
  mapGroupKeyToNeedAutoSave.set(groupKey, state);
}
function getGroupChangeState(groupKey) {
  return mapGroupKeyToNeedAutoSave.get(groupKey);
}
function createSave(groupSaveKey, snapshot) {
  return {groupSaveKey, snapshot};
}
var isDirty = true;
var groupKeysArray;
var groupKeysSet = new Set();
function addGroupKey(key) {
  groupKeysSet.add(key);
  isDirty = true;
}
function deleteGroupKey(key) {
  groupKeysSet.delete(key);
  isDirty = true;
}
function getGroupKeys() {
  if (isDirty) {
    isDirty = false;
    groupKeysArray = Array.from(groupKeysSet);
  }
  return groupKeysArray;
}
function createSaveStore() {
  return new Map();
}
function getSave(store, key) {
  return store.get(key);
}
var getSaveStoreSize = (store) => store.size;
function addSave(store, save) {
  store.set(save.groupSaveKey, save);
}
function deleteSave(store, key) {
  store.delete(key);
}
function clearSaves(store) {
  store.clear();
}
function createGroupSave(groupKey, saveKey, prevSaveKey, nextSaveKey) {
  return {groupKey, key: saveKey, prevSaveKey, nextSaveKey};
}
function trySetNextSaveKeyForGroupSave(groupKey, saveKey, nextSaveKey) {
  const groupSave = getGroupSave(groupKey, saveKey);
  if (groupSave !== void 0) {
    groupSave.nextSaveKey = nextSaveKey;
  }
}
var groupSaveStore = new Map();
function getGroupSave(groupKey, saveKey) {
  return groupSaveStore.get(groupKey).get(saveKey);
}
function getGroupSaveKeys(groupKey) {
  return Array.from(groupSaveStore.get(groupKey)?.keys() || []);
}
function getBranchForSave(groupKey, saveKey) {
  const branch = [];
  const groupSave = getGroupSave(groupKey, saveKey);
  if (groupSave === void 0) {
    return branch;
  }
  branch.push(groupSave.key);
  if (groupSave.nextSaveKey !== void 0) {
    groupSavesIterator(groupKey, groupSave.nextSaveKey, (groupSave2) => {
      branch.push(groupSave2.key);
      return groupSave2.nextSaveKey;
    });
  }
  if (groupSave.prevSaveKey !== void 0) {
    groupSavesIterator(groupKey, groupSave.prevSaveKey, (groupSave2) => {
      branch.unshift(groupSave2.key);
      return groupSave2.prevSaveKey;
    });
  }
  return branch;
}
function addGroupSave(save) {
  if (!groupSaveStore.has(save.groupKey)) {
    groupSaveStore.set(save.groupKey, new Map());
  }
  groupSaveStore.get(save.groupKey).set(save.key, save);
}
function deleteGroupSave(groupKey, saveKey) {
  groupSaveStore.get(groupKey).delete(saveKey);
}
function deleteGroupSaveSafety(groupKey, groupSaveKey) {
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
function clearGroupSaveStore(key) {
  groupSaveStore.get(key)?.clear();
}
var mapGroupKeyToCurrentGroupSaveKey = new Map();
function setCurrentGroupSaveKey(key, saveKey) {
  mapGroupKeyToCurrentGroupSaveKey.set(key, saveKey);
}
function getCurrentGroupSaveKey(key) {
  return mapGroupKeyToCurrentGroupSaveKey.get(key);
}
function groupSavesIterator(groupKey, groupSaveKey, cb) {
  let groupSave = getGroupSave(groupKey, groupSaveKey);
  let tmpGroupSave;
  while (groupSave !== void 0) {
    tmpGroupSave = groupSave;
    const key = cb(groupSave);
    groupSave = key ? getGroupSave(groupKey, key) : void 0;
  }
  return tmpGroupSave;
}
var mapGroupKeyToSaveStores = new Map();
var deleteSaveStores = (groupKey) => {
  deleteGroupKey(groupKey);
  mapGroupKeyToSaveStores.delete(groupKey);
};
var registerSaveStore = (groupKey, store) => {
  if (!mapGroupKeyToSaveStores.has(groupKey)) {
    addGroupKey(groupKey);
    mapGroupKeyToSaveStores.set(groupKey, []);
  }
  mapGroupKeyToSaveStores.get(groupKey).push(store);
};

// src/definitions.ts
var EMPTY_OBJECT = Object.freeze({});
var DEFAULT_GROUP_KEY = "__DEFAULT_GROUP_KEY__";
var ActionType;
(function(ActionType2) {
  ActionType2["SetInitState"] = "@@REDUX_SAVE@@/SetInitState";
  ActionType2["ClearSaves"] = "@@REDUX_SAVE@@/ClearSaves";
  ActionType2["AddSave"] = "@@REDUX_SAVE@@/AddSave";
  ActionType2["RemoveSaves"] = "@@REDUX_SAVE@@/RemoveLastsSaves";
  ActionType2["LoadSave"] = "@@REDUX_SAVE@@/LoadSave";
  ActionType2["LoadPrevSave"] = "@@REDUX_SAVE@@/LoadPrevSave";
  ActionType2["LoadNextSave"] = "@@REDUX_SAVE@@/LoadNextSave";
  ActionType2["LoadPrevSaveDone"] = "@@REDUX_SAVE@@/LoadPrevSaveDone";
  ActionType2["LoadNextSaveDone"] = "@@REDUX_SAVE@@/LoadNextSaveDone";
})(ActionType || (ActionType = {}));
var isValuableAction = (actionType) => {
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
function createAddSaveAction(payload) {
  return {
    type: ActionType.AddSave,
    payload: {
      groupKeys: payload?.groupKeys,
      saveKey: payload?.saveKey || createGroupSaveKey()
    }
  };
}
function createRemoveSavesAction(payload) {
  return {
    type: ActionType.RemoveSaves,
    payload: payload || EMPTY_OBJECT
  };
}
function createClearSavesAction(payload) {
  return {
    type: ActionType.ClearSaves,
    payload: payload || EMPTY_OBJECT
  };
}
function createLoadSaveAction(payload) {
  return {
    type: ActionType.LoadSave,
    payload
  };
}
function createLoadPrevSaveAction(payload) {
  return {
    type: ActionType.LoadPrevSave,
    payload: payload || EMPTY_OBJECT
  };
}
function createLoadNextSaveAction(payload) {
  return {
    type: ActionType.LoadNextSave,
    payload: payload || EMPTY_OBJECT
  };
}
function createLoadPrevSaveDoneAction(payload) {
  return {
    type: ActionType.LoadPrevSaveDone,
    payload
  };
}
function createLoadNextSaveDoneAction(payload) {
  return {
    type: ActionType.LoadNextSaveDone,
    payload
  };
}

// src/reducerWrapper.ts
function savesReducerWrapper(groupKeyOrReducer, optionalReducer) {
  const groupKey = optionalReducer ? groupKeyOrReducer : DEFAULT_GROUP_KEY;
  const reducer3 = optionalReducer ? optionalReducer : groupKeyOrReducer;
  const saveStore = createSaveStore();
  let currentSave;
  const deleteSaveSafety = (groupSaveKey) => {
    if (currentSave && currentSave.groupSaveKey === groupSaveKey) {
      const groupSave = getGroupSave(groupKey, groupSaveKey);
      currentSave = groupSave.prevSaveKey !== void 0 ? getSave(saveStore, groupSave.prevSaveKey) : void 0;
    }
    deleteSave(saveStore, groupSaveKey);
  };
  return (reducerState, action) => {
    if (reducerState === void 0 || !isValuableAction(action.type)) {
      const nextState = reducer3(reducerState, action);
      setGroupChangeState(groupKey, getGroupChangeState(groupKey) || (currentSave === void 0 ? true : currentSave.snapshot !== nextState));
      return nextState;
    }
    registerSaveStore(groupKey, saveStore);
    if (action.payload.groupKeys !== void 0 && action.payload.groupKeys.indexOf(groupKey) === -1) {
      return reducer3(reducerState, action);
    }
    const storeSize = getSaveStoreSize(saveStore);
    const groupWasChanged = getGroupChangeState(groupKey) === true;
    const currentGroupSaveKey = getCurrentGroupSaveKey(groupKey);
    if ((action.type === ActionType.LoadSave || action.type === ActionType.LoadPrevSave) && currentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }
      if (groupWasChanged) {
        addSave(saveStore, createSave(currentGroupSaveKey, reducerState));
      }
      if (action.type === ActionType.LoadSave) {
        currentSave = getSave(saveStore, action.payload.saveKey) || currentSave;
        if (currentSave) {
          return currentSave.snapshot;
        }
      }
      if (action.type === ActionType.LoadPrevSave) {
        let count = action.payload.count || 1;
        groupSavesIterator(groupKey, currentGroupSaveKey, (groupSave) => {
          currentSave = getSave(saveStore, groupSave.key) || currentSave;
          return count-- === 0 ? void 0 : groupSave.prevSaveKey;
        });
        if (currentSave) {
          return currentSave.snapshot;
        }
      }
      return reducerState;
    }
    if (action.type === ActionType.LoadNextSave && currentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }
      let count = action.payload.count || 1;
      groupSavesIterator(groupKey, currentGroupSaveKey, (groupSave) => {
        currentSave = getSave(saveStore, groupSave.key) || currentSave;
        return count-- === 0 ? void 0 : groupSave.nextSaveKey;
      });
      return currentSave ? currentSave.snapshot : reducerState;
    }
    if (action.type === ActionType.RemoveSaves && currentGroupSaveKey) {
      if (storeSize === 0) {
        return reducerState;
      }
      const {saveKeys, exceptSaveKeys} = action.payload;
      if (saveKeys === void 0 && exceptSaveKeys === void 0) {
        deleteSaveSafety(currentGroupSaveKey);
      }
      if (saveKeys !== void 0) {
        saveKeys.forEach(deleteSaveSafety);
      } else if (exceptSaveKeys !== void 0) {
        saveStore.forEach((_, saveKey) => {
          if (exceptSaveKeys.indexOf(saveKey) !== -1) {
            deleteSaveSafety(saveKey);
          }
        });
      }
      return reducerState;
    }
    if (action.type === ActionType.AddSave && (groupWasChanged || !isGeneratedSaveKey(action.payload.saveKey))) {
      addSave(saveStore, currentSave = createSave(action.payload.saveKey, reducerState));
    }
    if (action.type === ActionType.ClearSaves) {
      currentSave = void 0;
      clearSaves(saveStore);
    }
    return reducerState;
  };
}

// src/middleware.ts
function createSavesMiddleware() {
  return function historyMiddleware(store) {
    return (next) => (action) => {
      if (!isValuableAction(action.type)) {
        return next(action);
      }
      const groupKeys = action.payload.groupKeys || getGroupKeys();
      if (groupKeys.length === 0) {
        return next(action);
      }
      if (action.type === ActionType.AddSave) {
        groupKeys.forEach((key) => {
          const groupChangeState = getGroupChangeState(key);
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);
          const currentGroupSave = currentGroupSaveKey ? getGroupSave(key, currentGroupSaveKey) : void 0;
          if (groupChangeState) {
            addGroupSave(createGroupSave(key, action.payload.saveKey, currentGroupSaveKey));
            if (currentGroupSave !== void 0) {
              trySetNextSaveKeyForGroupSave(key, currentGroupSave.key, action.payload.saveKey);
            }
            setCurrentGroupSaveKey(key, action.payload.saveKey);
          } else if (currentGroupSave !== void 0) {
            const isUserSaveKey = !isGeneratedSaveKey(action.payload.saveKey);
            const prevSaveKey = currentGroupSave.prevSaveKey;
            if (isUserSaveKey) {
              addGroupSave(createGroupSave(key, action.payload.saveKey, prevSaveKey));
              if (prevSaveKey !== void 0) {
                trySetNextSaveKeyForGroupSave(key, prevSaveKey, action.payload.saveKey);
              }
              setCurrentGroupSaveKey(key, action.payload.saveKey);
            }
          }
        });
      }
      if (action.type === ActionType.LoadSave || action.type === ActionType.LoadPrevSave) {
        updateGroupAutoSaveKey();
        groupKeys.forEach((key) => {
          if (getGroupChangeState(key) === true) {
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);
            const saveKey = getGroupAutoSaveKey();
            addGroupSave(createGroupSave(key, saveKey, currentGroupSaveKey));
            if (currentGroupSaveKey !== void 0) {
              trySetNextSaveKeyForGroupSave(key, currentGroupSaveKey, saveKey);
            }
            setCurrentGroupSaveKey(key, saveKey);
          }
        });
      }
      getGroupKeys().forEach(deleteSaveStores);
      const result = next(action);
      if (action.type === ActionType.ClearSaves) {
        groupKeys.forEach((key) => {
          clearGroupSaveStore(key);
          setCurrentGroupSaveKey(key, void 0);
        });
      }
      const wasUpdatedGroupsKeys = new Set();
      if (action.type === ActionType.AddSave) {
        groupKeys.forEach((key) => {
          setGroupChangeState(key, false);
        });
      }
      if (action.type === ActionType.RemoveSaves) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);
          if (currentGroupSaveKey === void 0) {
            return;
          }
          const {saveKeys, exceptSaveKeys} = action.payload;
          if (saveKeys === void 0 && exceptSaveKeys === void 0) {
            deleteGroupSaveSafety(key, currentGroupSaveKey);
          }
          if (saveKeys !== void 0) {
            saveKeys.forEach((saveKey) => {
              deleteGroupSaveSafety(key, saveKey);
            });
          } else if (exceptSaveKeys !== void 0) {
            groupSaveStore.get(key).forEach((groupSave) => {
              if (exceptSaveKeys.indexOf(groupSave.key) !== -1) {
                deleteGroupSaveSafety(key, groupSave.key);
              }
            });
          }
        });
      }
      if (action.type === ActionType.LoadSave) {
        groupKeys.forEach((key) => {
          setCurrentGroupSaveKey(key, action.payload.saveKey);
          setGroupChangeState(key, false);
        });
      }
      if (action.type === ActionType.LoadPrevSave) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);
          if (currentGroupSaveKey === void 0) {
            return;
          }
          let steps = action.payload.count || 1;
          let nextGroupSaveKey;
          const groupSave = groupSavesIterator(key, currentGroupSaveKey, (groupSave2) => {
            if (nextGroupSaveKey) {
              groupSave2.nextSaveKey = nextGroupSaveKey;
            }
            nextGroupSaveKey = groupSave2.key;
            return steps-- === 0 ? void 0 : groupSave2.prevSaveKey;
          });
          if (groupSave.key !== currentGroupSaveKey) {
            wasUpdatedGroupsKeys.add(key);
            setCurrentGroupSaveKey(key, groupSave.key);
          }
          setGroupChangeState(key, false);
        });
      }
      if (action.type === ActionType.LoadNextSave) {
        groupKeys.forEach((key) => {
          const currentGroupSaveKey = getCurrentGroupSaveKey(key);
          if (currentGroupSaveKey === void 0) {
            return;
          }
          let steps = action.payload.count || 1;
          const groupSave = groupSavesIterator(key, currentGroupSaveKey, (groupSave2) => {
            return steps-- === 0 ? void 0 : groupSave2.nextSaveKey;
          });
          if (groupSave.key !== currentGroupSaveKey) {
            wasUpdatedGroupsKeys.add(key);
            setCurrentGroupSaveKey(key, groupSave.key);
          }
        });
      }
      const groupSaves = {};
      const currentBranchSaves = {};
      const currentGroupSaves = {};
      groupKeys.forEach((key) => {
        groupSaves[key] = getGroupSaveKeys(key);
        currentGroupSaves[key] = getCurrentGroupSaveKey(key);
        currentBranchSaves[key] = currentGroupSaves[key] ? getBranchForSave(key, currentGroupSaves[key]) : [];
      });
      store.dispatch(createSetSaveMetadataAction({groupSaves, currentBranchSaves, currentGroupSaves}));
      if (wasUpdatedGroupsKeys.size > 0) {
        if (action.type === ActionType.LoadPrevSave) {
          store.dispatch(createLoadPrevSaveDoneAction({
            groupKeys: Array.from(wasUpdatedGroupsKeys)
          }));
        }
        if (action.type === ActionType.LoadNextSave) {
          store.dispatch(createLoadNextSaveDoneAction({
            groupKeys: Array.from(wasUpdatedGroupsKeys)
          }));
        }
      }
      return result;
    };
  };
}
//# sourceMappingURL=redux-saves.cjs.js.map

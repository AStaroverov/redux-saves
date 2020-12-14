# redux-saves
Undo/Redo on steroids 💊 for real applications.

### ([DEMO]())

### Install
```
npm install redux-saves
```
```
yarn add redux-saves
```

### Usage

##### Add middleware 
```
import { createStore, applyMiddleware } from 'redux'
import { createSavesMiddleware } from 'redux-saves';

export const store = createStore(
  rootReducer,
  applyMiddleware(createSavesMiddleware())
)
```

##### Wrap Reducers
Wrap each reducer that you want control with redux-saves
```
import { savesReducerWrapper } from 'redux-saves';

export const reducer = savesReducerWrapper((state, action) => {
    switch (action) {
        ...
    }

    return state;
});
```
Also you can pin reducer to some group for joint control
```
import { savesReducerWrapper } from 'redux-saves';

export const reducer = savesReducerWrapper('Group 1', (state, action) => {
    switch (action) {
        ...
    }

    return state;
});
```

> NOTICE: Group key can be number or string;
> NOTICE: If Group key don't specified, reducer will be added to default group;

##### Add Reducer with meta information from redux-saves (optional step)
```
import { createStore, applyMiddleware } from 'redux'
import { createSavesMiddleware } from 'redux-saves';

export const store = createStore(
  combineReducers({
      ...
      savesMetadata: savesReducer   
      ...
  }),
  applyMiddleware(createSavesMiddleware())
)

```

##### Actions

###### Add Save
```
store.dispatch(createAddSaveAction());
// or
type Payload = {
    groupKeys?: Array<string | number>
    saveKey?: string | number,
}

store.dispatch(createAddSaveAction(payload as Payload));
```
If payload === undefined || groupKeys === undefined
    groupKeys will equal for all existed groups

If payload === undefined || saveKey === undefined
    saveKey will generated automatically


###### Clear saves
```
store.dispatch(createClearSavesAction());
```

###### Remove saves
```
type Payload = {
    groupKeys?: TGroupKey[],
    saveKeys?: TGroupSaveKey[],
    exceptSaveKeys?: TGroupSaveKey[],
}
store.dispatch(createRemoveSavesAction(payload as Payload));
```
If groupKeys === undefined
    groupKeys will equal for all existed groups

If isArray(saveKeys)
    redux-saves remove only this saves

If isArray(exceptSaveKeys)
    redux-saves all saves except this saves

> Notice: Don't use saveKeys and exceptSaveKeys at the same time

##### Load

This implementation create AutoSaves if you try to load some save and at the same time
you have unsaved changes in reducers;

###### Load save
```
type Payload = {
  groupKeys?: TGroupKey[],
  saveKey: TGroupSaveKey
}
store.dispatch(createLoadSaveAction(payload as Payload));
```
If groupKeys === undefined
    groupKeys will equal for all existed groups
    
###### Load previous save
```
type Payload = {
    groupKeys?: TGroupKey[],
    count?: number // Count of back steps 
}
store.dispatch(createLoadPrevSaveAction(payload as Payload));
```
If groupKeys === undefined
    groupKeys will equal for all existed groups

if count === undefined
    count will equal 1
    
###### Load next save
```
type Payload = {
    groupKeys?: TGroupKey[],
    count?: number // Count of forward steps 
}
store.dispatch(createLoadNextSaveAction(payload as Payload));
```
If groupKeys === undefined
    groupKeys will equal for all existed groups

if count === undefined
    count will equal 1


Few words how work Load prev and next:
Underhood saves it's two-linked list, every save have link to prev and next save,
that give possibilities to implemet logic like undo/redo.


#### Actions that generate redux-saves
If load previous or next save will change state in some groups
You can catch actions like:

* On success load previous saves
```
type LoadPrevSaveDoneAction = {
    type: ActionType.LoadPrevSaveDone,
    payload: { groupKeys: Array<string | number> }
}
```
* On success load next saves
```
type LoadNextSaveDoneAction = {
    type: ActionType.LoadPrevSaveDone,
    payload: { groupKeys: Array<string | number> }
}
```
> NOtice: groupKeys will include all group that was changed

#### State for redux-saves reducer
```
type TGroupKey = string | number;
type TGroupSaveKey = string | number;

type SavesReducerState = {
    groupSaves: Record<TGroupKey, TGroupSaveKey[] | void>;
    currentBranchSaves: Record<TGroupKey, TGroupSaveKey[] | void>; // Look description bellow
    currentGroupSaves: Record<TGroupKey, TGroupSaveKey | void>;
}
```


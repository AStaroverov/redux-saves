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
```typescript
import { createStore, applyMiddleware } from 'redux'
import { createSavesMiddleware } from 'redux-saves';

export const store = createStore(
  rootReducer,
  applyMiddleware(createSavesMiddleware())
)
```

##### Wrap Reducers
Wrap each reducer that you want control with redux-saves
```typescript
import { savesReducerWrapper } from 'redux-saves';

export const reducer = savesReducerWrapper((state, action) => {
    switch (action) {
        ...
    }

    return state;
});
```
Also you can pin reducer to some group for joint control
```typescript
import { savesReducerWrapper } from 'redux-saves';

export const reducer = savesReducerWrapper('Group 1', (state, action) => {
    switch (action) {
        ...
    }

    return state;
});
```

> Group key can be number or string;

> If Group key don't specified, reducer will be added to default group;

##### Add Reducer with meta information from redux-saves (optional step)
```typescript
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

#### Actions

##### Add Save
```typescript
store.dispatch(createAddSaveAction());
// or
type Payload = {
    groupKeys?: Array<string | number>
    saveKey?: string | number,
}

store.dispatch(createAddSaveAction(payload as Payload));
```
If payload === undefined || groupKeys === undefined

&nbsp;&nbsp;groupKeys will equal for all existed groups

If payload === undefined || saveKey === undefined

&nbsp;&nbsp;saveKey will generated automatically


##### Clear saves
```
store.dispatch(createClearSavesAction());
```

##### Remove saves
```typescript
type Payload = {
    groupKeys?: TGroupKey[],
    saveKeys?: TGroupSaveKey[],
    exceptSaveKeys?: TGroupSaveKey[],
}
store.dispatch(createRemoveSavesAction(payload as Payload));
```
If groupKeys === undefined

&nbsp;&nbsp;groupKeys will equal for all existed groups

If isArray(saveKeys)

&nbsp;&nbsp;redux-saves remove only this saves

If isArray(exceptSaveKeys)

&nbsp;&nbsp;redux-saves all saves except this saves

> Don't use saveKeys and exceptSaveKeys at the same time

##### Load

> Redux-saves create AutoSaves if you try to load some save and at the same time you have unsaved changes in reducers;

##### Load save
```typescript
type Payload = {
  groupKeys?: TGroupKey[],
  saveKey: TGroupSaveKey
}
store.dispatch(createLoadSaveAction(payload as Payload));
```
If groupKeys === undefined

&nbsp;&nbsp;groupKeys will equal for all existed groups
    
##### Load previous save
```typescript
type Payload = {
    groupKeys?: TGroupKey[],
    count?: number // Count of back steps 
}
store.dispatch(createLoadPrevSaveAction(payload as Payload));
```
If groupKeys === undefined

&nbsp;&nbsp;groupKeys will equal for all existed groups

if count === undefined

&nbsp;&nbsp;count will equal 1
    
##### Load next save
```typescript
type Payload = {
    groupKeys?: TGroupKey[],
    count?: number // Count of forward steps 
}
store.dispatch(createLoadNextSaveAction(payload as Payload));
```
If groupKeys === undefined

&nbsp;&nbsp;groupKeys will equal for all existed groups

if count === undefined

&nbsp;&nbsp;count will equal 1

*Few words how work Load prev and next:*
*Underhood saves it's two-linked list, every save have link to prev and next save,*
*that give possibilities to implemet logic like undo/redo.*

#### Actions that generate redux-saves
If load previous or next save will change state in some groups
You can catch actions like:

* On success load previous saves
```typescript
type LoadPrevSaveDoneAction = {
    type: ActionType.LoadPrevSaveDone,
    payload: { groupKeys: Array<string | number> }
}
```
* On success load next saves
```typescript
type LoadNextSaveDoneAction = {
    type: ActionType.LoadPrevSaveDone,
    payload: { groupKeys: Array<string | number> }
}
```
> groupKeys will include all group that was changed

#### State for redux-saves reducer
```typescript
type TGroupKey = string | number;
type TGroupSaveKey = string | number;

type SavesReducerState = {
    groupSaves: Record<TGroupKey, TGroupSaveKey[] | void>;
    currentBranchSaves: Record<TGroupKey, TGroupSaveKey[] | void>; // Look description bellow
    currentGroupSaves: Record<TGroupKey, TGroupSaveKey | void>;
}
```


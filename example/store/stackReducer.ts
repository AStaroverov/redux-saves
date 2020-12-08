import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

export type TStackItem = { value: string };

export const enum StackNames {
    stack1 = 'stack1',
    stack2 = 'stack2',
    stack3 = 'stack3',
    stack4 = 'stack4',
}
export type TStacksState = Record<StackNames, TStackItem[]>;

const initialState: TStacksState = {
    [StackNames.stack1]: [],
    [StackNames.stack2]: [],
    [StackNames.stack3]: [],
    [StackNames.stack4]: [],
}

const createStacksSlice = createSlice({
  name: 'stacks',
  initialState,
  reducers: {
    add(state: TStacksState, action: PayloadAction<{ stack: StackNames, value: string }>) {
        state[action.payload.stack].push({ value: action.payload.value })
    },
    delete(state: TStacksState,  action: PayloadAction<{ stack: StackNames, value: string }>) {
        const index = state[action.payload.stack]
            .findIndex((item) => item.value === action.payload.value);
        
        if (index > -1) {
            state[action.payload.stack].splice(index, 1);
        }
    },
  },
})

export const stackActions = createStacksSlice.actions;
export const stacksReducer = createStacksSlice.reducer;
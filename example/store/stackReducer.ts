import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TStackState = { value: string }[];

export const createStacksSlice = (name: string) => createSlice({
  name,
  initialState: [] as TStackState,
  reducers: {
    add(state: TStackState, action: PayloadAction<{ value: string }>) {
        state.push({ ...action.payload })
    },
    delete(state: TStackState,  action: PayloadAction<{ value: string }>) {
        const index = state.findIndex((item) => item.value === action.payload.value);
        
        if (index > -1) {
            state.splice(index, 1);
        }
    },
  },
});

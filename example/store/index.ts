import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { createSavesMiddleware, savesReducer, savesReducerWrapper } from "../../src";
import { TSavesState } from "../../src/reducer";
import { createStacksSlice, TStackState } from "./stackReducer";

export const enum ReducerNames {
    stack1 = 'stack1',
    stack2 = 'stack2',
    stack3 = 'stack3',
    stack4 = 'stack4',
}
export const enum ReduceGroups {
    group1 = 'group1',
    group2 = 'group2',
    group3 = 'group3',
}
export type TState = {
    [ReducerNames.stack1]: TStackState,
    [ReducerNames.stack2]: TStackState,
    [ReducerNames.stack3]: TStackState,
    [ReducerNames.stack4]: TStackState,
    saves: TSavesState,
};

const stackSlice1 = createStacksSlice(ReducerNames.stack1);
const stackSlice2 = createStacksSlice(ReducerNames.stack2);
const stackSlice3 = createStacksSlice(ReducerNames.stack3);
const stackSlice4 = createStacksSlice(ReducerNames.stack4);

export const store = configureStore<TState>({
    reducer: {
        [ReducerNames.stack1]: savesReducerWrapper(ReduceGroups.group1, stackSlice1.reducer),
        [ReducerNames.stack2]: savesReducerWrapper(ReduceGroups.group2, stackSlice2.reducer),
        [ReducerNames.stack3]: savesReducerWrapper(ReduceGroups.group3, stackSlice3.reducer),
        [ReducerNames.stack4]: savesReducerWrapper(ReduceGroups.group3, stackSlice4.reducer),
        saves: savesReducer,
    },
    enhancers: [applyMiddleware(createSavesMiddleware())],
});

export const actions = {
    [ReducerNames.stack1]: stackSlice1.actions,
    [ReducerNames.stack2]: stackSlice2.actions,
    [ReducerNames.stack3]: stackSlice3.actions,
    [ReducerNames.stack4]: stackSlice4.actions,
}

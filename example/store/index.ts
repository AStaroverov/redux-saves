import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { createSavesMiddleware } from "../../src";
import { stacksReducer, TStacksState } from "./stackReducer";

export type TState = {
    stacks: TStacksState,
};
export const store = configureStore<TState>({
    reducer: { stacks: stacksReducer },
    enhancers: [applyMiddleware(createSavesMiddleware())],
});

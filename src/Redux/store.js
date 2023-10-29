// Importing relevant dependecies
import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "./habitSlice";

// Create a Redux store with 'habitReducer' as the root reducer
export const store = configureStore({
    reducer: {
        habit: habitReducer,
    },
});
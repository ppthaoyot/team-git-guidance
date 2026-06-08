import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import layoutSlice, { persistConfig } from "../app/layout/layoutSlice";

export const rootReducer = combineReducers({
    layout: persistReducer(persistConfig, layoutSlice),
});

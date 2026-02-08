import { configureStore } from "@reduxjs/toolkit";
import filtreReducer from "./filtreSlice";

export const store = configureStore({
  reducer: {
    filtre: filtreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

"use client";
import smartAccountReducer from "./Features/smartAccountslice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import balanceReducer from "./Features/balanceSlice";
export const store = configureStore({
  reducer: {
    smartAccountSlice: smartAccountReducer,
    AccountBalanceSlice: balanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

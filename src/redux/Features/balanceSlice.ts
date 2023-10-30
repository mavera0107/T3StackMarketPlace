// balanceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  balance: string;
};

const initialState: InitialState = {
  balance: "",
};

const balanceSlice = createSlice({
  name: "Balance",
  initialState,
  reducers: {
    setFetchedBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    resetBalance: (state) => {
      state.balance = "";
    },
  },
});

export const { setFetchedBalance, resetBalance } = balanceSlice.actions;

export default balanceSlice.reducer;

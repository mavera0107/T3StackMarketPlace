import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BiconomySmartAccount } from "@biconomy/account";
interface smartAccountWeb3 {
  smartAccount: BiconomySmartAccount | undefined;
}

export const initialState: smartAccountWeb3 = {
  smartAccount: undefined,
};

export const web3SmartAccount = createSlice({
  name: "AccountAddress",
  initialState,
  reducers: {
    setSmartAccount: (state, action) => {
      state.smartAccount = action.payload;
    },
  },
});
export const { setSmartAccount } = web3SmartAccount.actions;

export default web3SmartAccount.reducer;

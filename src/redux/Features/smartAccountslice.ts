import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";
import SocialLogin from "@biconomy/web3-auth";

interface smartAccountWeb3 {
  smartAccount: BiconomySmartAccount | undefined;
  sdkRef: SocialLogin | null;
}

export const initialState: smartAccountWeb3 = {
  smartAccount: undefined,
  sdkRef: null,
};

export const web3SmartAccount = createSlice({
  name: "AccountAddress",
  initialState,
  reducers: {
    setSmartAccount: (state, action) => {
      state.smartAccount = action.payload;
    },
    setSdkRef: (state, action) => {
      state.sdkRef = action.payload;
    },
  },
});
export const { setSmartAccount, setSdkRef } = web3SmartAccount.actions;

export default web3SmartAccount.reducer;
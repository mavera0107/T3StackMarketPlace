import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface smartAccountAddress {
  AccountAddress: string;
}

export const initialState: smartAccountAddress = {
  AccountAddress: "",
};

export const smartAccountAddress = createSlice({
  name: "AccountAddress",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.AccountAddress = action.payload;
    },
  },
});
export const { setAddress } = smartAccountAddress.actions;

export default smartAccountAddress.reducer;

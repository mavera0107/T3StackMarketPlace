import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface balancebool {
  balancetrigger: Boolean;
}

export const initialState: balancebool = {
  balancetrigger: false,
};

export const trigger = createSlice({
  name: "balanceget",
  initialState,
  reducers: {
    setbalancetrigger: (state, action) => {
      state.balancetrigger = action.payload;
    },
  },
});
export const { setbalancetrigger } = trigger.actions;

export default trigger.reducer;

import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    amount:0
  },
  reducers: {
    paymentOk: (state, action) => {
      state.amount = action.payload.amount;
    },
    paymentSuccess:(state, action) => {
        state.amount = action.payload.amount;
    },
    paymentFailure:(state, action) => {
        state.amount = action.payload.amount;
    }
  },
});

export const { paymentOk,paymentFailure,paymentSuccess} = paymentSlice.actions;
export default paymentSlice.reducer;

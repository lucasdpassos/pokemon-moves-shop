// src/features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    powers: [],
  },
  reducers: {
    add: (state, action) => {
      const { name, url } = action.payload;
      state.powers.push({ name, url });
    },
    remove: (state, action) => {
      const itemToRemove = action.payload;
      state.powers = state.powers.filter(
        (power) => power.name !== itemToRemove
      );
    },
    setNewItemAdded: (state, action) => {
        state.newItemAdded = action.payload;
      },
  },
});

export const { add, remove,  setNewItemAdded } = cartSlice.actions;

export const selectPowers = (state) => state.powers.value;

export default cartSlice.reducer;

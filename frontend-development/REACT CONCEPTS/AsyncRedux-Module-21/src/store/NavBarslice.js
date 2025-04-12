import { createSlice } from "@reduxjs/toolkit";

const instialNavState = true;

const NavSlice = createSlice({
  name: "navBar",
  initialState: instialNavState,
  reducers: {
    toggleCart(state) {
      return (state = !state);
    },
  },
});

export const { toggleCart } = NavSlice.actions; //exporting the action methods inside NavSlice for use in the dispatch function

export default NavSlice.reducer; //sending NavSlice as reducer function

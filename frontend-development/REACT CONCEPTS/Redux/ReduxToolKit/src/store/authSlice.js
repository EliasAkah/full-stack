import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { userAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.userAuthenticated = true;
    },
    logout(state) {
      state.userAuthenticated = false;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;

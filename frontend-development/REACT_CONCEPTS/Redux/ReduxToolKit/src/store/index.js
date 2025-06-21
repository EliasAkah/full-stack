import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice.js";
import authReducer from "./authSlice.js";

//creating state store and informing it of the reducer function that can alter or mutate its state
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;

// Note: configureStore takes an object which has reducer as it property. the reducer property can take an object containing several reducer functions as its value
// or it can it a single reducer function as its value

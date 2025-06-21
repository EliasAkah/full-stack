import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice.js";
import shopCartReducer from "./shoppingSlice.js";
import navReducer from "./NavBarslice.js";

const store = configureStore({
  reducer: {
    shopCart: shopCartReducer,
    product: productReducer,
    nav: navReducer,
  },
});

export default store;

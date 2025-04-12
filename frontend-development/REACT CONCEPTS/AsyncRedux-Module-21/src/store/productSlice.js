import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  items: [
    {
      id: 1,
      title: "Clothes",
      price: 20,
      quantity: 1,
      total: 20,
    },
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    addMultipleProducts(state, action) {
      const productsToAdd = action.payload.map((item) => ({
        id: Date.now() + Math.random(), // Ensure unique ID
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
        total: item.price * (item.quantity || 1),
      }));
      state.items = state.items.concat(productsToAdd);
    },
  },
});

export const {addMultipleProducts } = productSlice.actions;
export default productSlice.reducer;

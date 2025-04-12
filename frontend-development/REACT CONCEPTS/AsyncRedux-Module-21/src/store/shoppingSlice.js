import { createSlice } from "@reduxjs/toolkit"; //importing createSlice API

const shopCartInitialState = { items: [] };

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState: shopCartInitialState,
  reducers: {
    initializeCartFromProducts(state, action) {
      state.items = action.payload.map((product) => ({
        ...product,
        quantity: product.quantity || 1,
        total: product.price * (product.quantity || 1),
      }));
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingIndex > -1) {
        const existingItem = state.items[existingIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          total: existingItem.price * (existingItem.quantity + 1),
        };
        state.items[existingIndex] = updatedItem;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
      }
    },
    increaseItemQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const selectedItem = state.items[itemIndex];

      if (itemIndex > -1) {
        const updatedItem = {
          ...selectedItem,
          quantity: selectedItem.quantity + 1,
        };
        updatedItem.total = updatedItem.price * updatedItem.quantity;
        state.items[itemIndex] = updatedItem;
      }
    },
    decreaseItemQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const selectedItem = state.items[itemIndex];

      if (itemIndex > -1) {
        if (selectedItem.quantity > 1) {
          const updatedItem = {
            ...selectedItem,
            quantity: selectedItem.quantity - 1,
          };
          updatedItem.total = updatedItem.price * updatedItem.quantity;
          state.items[itemIndex] = updatedItem;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const {
  decreaseItemQuantity,
  increaseItemQuantity,
  initializeCartFromProducts,
  addItemToCart,
} = shopCartSlice.actions;

export default shopCartSlice.reducer;

import { createContext, useReducer } from "react";

export const cartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

//writing a reducer function
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemindex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items]; // a copy of the original array. allows immutable updating of state

    if (existingItemindex > -1) {
      const existingItem = state.items[existingItemindex]; //retrieves the item object at particular index of the state.items array
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemindex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemindex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemindex];

    const updatedItems = [...state.items];

    if (existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemindex] = updatedItem; //replace old object at existingItemIndex with updatedItem
    } else {
      updatedItems.splice(existingItemindex, 1); //removes item object with index number equal to "existingItemindex"
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR-ITEM") {
    return { ...state, items: [] };
  }

  return state; //return current state if no state is updated;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchcartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchcartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchcartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchcartAction({ type: "CLEAR-ITEM" });
  }

  const cartValue = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartValue);

  return (
    <cartContext.Provider value={cartValue}>{children}</cartContext.Provider>
  );
}

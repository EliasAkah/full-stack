//Creating and providing the Context
import {createContext, useState, useReducer} from 'react'
import { DUMMY_PRODUCTS } from '../dummy-products';

export const CartContext =  createContext({
    items: [],
    addItems: () => {},
    updateItems: () => {}
}); // the variable CartCOntext starts with a capital because the createContext() returns a value which is React component.

function shoppigCartReducer(state, action){
    if(action.type === 'ADD_ITEMS'){
        const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
              id: action.payload,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            ...state,//not needful here but is used when u have multiple values in the state u want to keep intact one modifying a part of it.
            items: updatedItems,
          };
    }
    if(action.type === 'UPDATE_ITEMS'){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
  
        updatedItem.quantity += action.payload.amount;
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
  
        return {
            ...state,
          items: updatedItems,
        };
      
    }
    return state
}

export default function CartContextProvider({children}){

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppigCartReducer, {
        items: [],
      });

      function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEMS',
            payload: id
        })
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEMS",
            payload:{
                productId,
                amount
            }
        }  )      
      }
    
      const contxtValue = {
        items: shoppingCartState.items,
        addItems: handleAddItemToCart,
        updateItems: handleUpdateCartItemQuantity,
      }

      return <CartContext.Provider value = {contxtValue}>
        {children}
      </CartContext.Provider>
}
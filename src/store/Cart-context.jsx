import {DUMMY_PRODUCTS} from '../dummy-products.js';
import {createContext, useReducer, useState} from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemCart: () => {}
});

function changeCartActions(state, action) {
    if (action.method === 'add') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.id);
            updatedItems.push(
                {id: action.id, name: product.title, price: product.price, quantity: 1}
            );
        }

        return {
          ...state,  //Para este no es necesario, pero siempre es bueno considerar que debe pasarse la copia del objeto
          items: updatedItems
        };
    }
    else if (action.method === 'update') {
      const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex]
            };

            updatedItem.quantity += action.amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
              ...state,
              items: updatedItems
            };
    }
}

export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatcher] = useReducer(changeCartActions,
      {items: []}
    );

    function handleAddItemToCart(id) {
      shoppingCartDispatcher({
        method: 'add',
        id: id
      });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
      shoppingCartDispatcher({
        method: 'update',
        productId, 
        amount
      });
    }
    const Ctxvl = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemCart: handleUpdateCartItemQuantity
    }

    return (
        <CartContext.Provider value={Ctxvl}>
            {children}
        </CartContext.Provider>
    )
}
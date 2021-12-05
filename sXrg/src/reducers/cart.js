import { addToCart, removeFromCart, clearCart } from "./actionNames";

const initialState = {};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case addToCart:
      return {
        ...state,
        [action.payload.data.id]: 1 /*attributes*/,
      };
    // case removeFromCart:
    //   return {
    //     ...state,
    //     selectedCurrency: action.payload.currency,
    //   };
    // case clearCart:
    //   return {
    //     ...state,
    //     selectedCurrency: action.payload.currency,
    //   };
    default:
      return {
        ...state,
      };
  }
};

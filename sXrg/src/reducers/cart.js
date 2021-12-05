import { addToCart, removeFromCart, clearCart } from "./actionNames";

const initialState = { products: [] };

const cart = (state = initialState, action) => {
	switch (action.type) {
		case addToCart:
			return {
				...state,
				products: [...state.products, action.payload.name],
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

export default cart;

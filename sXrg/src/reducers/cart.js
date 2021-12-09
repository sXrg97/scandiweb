import { addToCart, removeFromCart, clearCart } from "./actionNames";

const initialState = {
	list: { variants: [] },
};

const cart = (state = initialState, action) => {
	switch (action.type) {
		case addToCart:
			let found = false;
			//Check if the product to be added to the cart is already existing in the cart with the same attributes
			state.list.variants.map((variant) => {
				console.log(
					"DEBUG",
					variant.name,
					action.payload.name,
					variant.attributes,
					action.payload.attributes,
					JSON.stringify(variant.attributes) ===
						JSON.stringify(action.payload.attributes)
				);
				if (
					variant.name === action.payload.name &&
					variant.attributes === action.payload.attributes
				) {
					variant.amount++; //if found increase the amount
					found = true;
				}
			});
			//
			//As we already increased the amount we just return the state
			if (found) {
				return {
					list: {
						variants: [...state.list.variants],
					},
				};
			}
			//If we didn't find the product, return the state and add the product to the state
			else {
				return {
					list: {
						variants: [
							...state.list.variants,
							{
								name: action.payload.name,
								attributes: action.payload.attributes,
								amount: 1,
							},
						],
					},
				};
			}
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

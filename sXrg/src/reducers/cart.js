import {
	addToCart,
	removeFromCart,
	clearCart,
	toggleCart,
	closeCart,
} from "./actionNames";
import { isEqual } from "lodash";

const cart = (
	state = {
		isCartModalOpen: false,
		list: { variants: [] },
	},
	action
) => {
	switch (action.type) {
		case addToCart:
			let found = false;
			//Check if the product to be added to the cart is already existing in the cart with the same attributes
			state.list.variants.map((variant) => {
				if (variant) {
					if (
						isEqual(variant.name, action.payload.name) &&
						isEqual(variant.attributes, action.payload.attributes)
					) {
						variant.amount++; //if found increase the amount
						found = true;
					}
				}
			});
			//
			//As we already increased the amount we just return the state
			if (found) {
				return {
					...state,
					list: {
						variants: [...state.list.variants],
					},
				};
			}
			//If we didn't find the product, return the state and add the product to the state
			else {
				return {
					...state,
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
		case removeFromCart:
			//Check if the product to be added to the cart is already existing in the cart with the same attributes
			state.list.variants.map((variant, idx) => {
				if (variant) {
					if (
						isEqual(variant.name, action.payload.name) &&
						isEqual(variant.attributes, action.payload.attributes)
					) {
						variant.amount--; //if found decrease the amount
						if (variant.amount <= 0) {
							console.error("delete", idx);
							delete state.list.variants[idx];
						}
					}
				}
			});
			return state;
		case closeCart:
			return {
				...state,
				isCartModalOpen: false,
			};
		case toggleCart:
			return {
				...state,
				isCartModalOpen: !state.isCartModalOpen,
			};
		//
		//As we already increased the amount we just return the state
		//If we didn't find the product, return the state and add the product to the state
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

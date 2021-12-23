import {
	addToCart,
	removeFromCart,
	toggleCart,
	closeCart,
	updateImage,
} from "./actionNames";
import { isEqual } from "lodash";

const cart = (
	state = {
		isCartModalOpen: false,
		list: {
			variants: [
				// {
				// 	name: "Jacket",
				// 	attributes: [
				// 		{
				// 			id: "Size",
				// 			attribs: {
				// 				id: "Small",
				// 				type: "text",
				// 				displayValue: "Small",
				// 				value: "S",
				// 			},
				// 		},
				// 	],
				// 	prices: [
				// 		{
				// 			currency: "USD",
				// 			amount: 518.47,
				// 		},
				// 		{
				// 			currency: "GBP",
				// 			amount: 372.67,
				// 		},
				// 		{
				// 			currency: "AUD",
				// 			amount: 668.83,
				// 		},
				// 		{
				// 			currency: "JPY",
				// 			amount: 55990.46,
				// 		},
				// 		{
				// 			currency: "RUB",
				// 			amount: 39207.96,
				// 		},
				// 	],
				// 	brand: "Canada Goose",
				// 	images: [
				// 		"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_.jpg",
				// 		"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L__a.jpg",
				// 		"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L__b.jpg",
				// 		"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L__c.jpg",
				// 		"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L__d.jpg",
				// 		"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016111/product-image/2409L__e.jpg",
				// 	],
				// 	allAttributes: [
				// 		{
				// 			id: "Size",
				// 			name: "Size",
				// 			type: "text",
				// 			items: [
				// 				{
				// 					displayValue: "Small",
				// 					value: "S",
				// 					id: "Small",
				// 				},
				// 				{
				// 					displayValue: "Medium",
				// 					value: "M",
				// 					id: "Medium",
				// 				},
				// 				{
				// 					displayValue: "Large",
				// 					value: "L",
				// 					id: "Large",
				// 				},
				// 				{
				// 					displayValue: "Extra Large",
				// 					value: "XL",
				// 					id: "Extra Large",
				// 				},
				// 			],
				// 		},
				// 	],
				// 	amount: 1,
				// 	selectedImage: 1,
				// },
			],
		},
	},
	action
) => {
	switch (action.type) {
		case addToCart:
			let found = false;
			let addResult = [...state.list.variants];
			//Check if the product to be added to the cart is already existing in the cart with the same attributes
			state.list.variants.map((variant, idx) => {
				if (variant) {
					if (
						isEqual(variant.name, action.payload.name) &&
						isEqual(variant.attributes, action.payload.attributes)
					) {
						let idx = state.list.variants.findIndex((oldVariant) =>
							isEqual(oldVariant.attributes, variant.attributes)
						);
						let newVariant = { ...variant };
						newVariant.amount += 1;
						addResult.splice(idx, 1, newVariant);
						found = true;
					}
				}
			});
			//
			//As we already increased the amount we just return the state
			if (found) {
				return {
					...state,
					list: { variants: addResult },
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
								prices: action.payload.prices,
								brand: action.payload.brand,
								images: action.payload.images,
								allAttributes: action.payload.allAttributes,
								amount: 1,
								selectedImage: 0,
							},
						],
					},
				};
			}
		case removeFromCart:
			let newVariant;
			let removeResult = [...state.list.variants];
			//Check if the product to be added to the cart is already existing in the cart with the same attributes
			state.list.variants.map((variant) => {
				if (variant) {
					if (
						isEqual(variant.name, action.payload.name) &&
						isEqual(variant.attributes, action.payload.attributes)
						//  && variant.attributes[0].attribs.id ===
						// 	action.payload.attributes[0].attribs.id
					) {
						newVariant = { ...variant };
						newVariant.amount -= 1;
						if (newVariant.amount < 1) {
							removeResult = removeResult.filter(
								(remVar) => !isEqual(remVar, variant)
							);
						} else {
							let idx = state.list.variants.findIndex((eachVar) =>
								isEqual(eachVar, variant)
							);
							removeResult.splice(idx, 1, newVariant);
						}
					}
				}
			});
			return {
				...state,
				list: { variants: removeResult },
			};
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
		case updateImage:
			switch (action.payload.increase) {
				case false: {
					let id = null;
					let newVariant = null;
					state.list.variants.map((stateElem, idx) => {
						if (isEqual(stateElem, action.payload.variant)) id = idx;
					});
					if (id !== null) newVariant = { ...state.list.variants[id] };
					newVariant.selectedImage--;
					if (newVariant.selectedImage < 0) {
						newVariant.selectedImage = newVariant.images.length - 1;
					}
					if (newVariant !== null) {
						let newVariants = [...state.list.variants];
						newVariants.splice(id, 1, newVariant);
						return {
							...state,
							list: { variants: newVariants },
						};
					}
					return { ...state };
				}
				case true: {
					let id = null;
					let newVariant = null;
					state.list.variants.map((stateElem, idx) => {
						if (isEqual(stateElem, action.payload.variant)) id = idx;
					});
					if (id !== null) newVariant = { ...state.list.variants[id] };
					newVariant.selectedImage++;
					if (newVariant.selectedImage > newVariant.images.length - 1) {
						newVariant.selectedImage = 0;
					}
					if (newVariant !== null) {
						let newVariants = [...state.list.variants];
						newVariants.splice(id, 1, newVariant);
						return {
							...state,
							list: { variants: newVariants },
						};
					}
					return { ...state };
				}
				default:
					return {
						...state,
					};
			}
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

import {
	setProducts,
	setProduct,
	toggleCurrencyModal,
	setCurrency,
	addToCart,
	removeFromCart,
	toggleCart,
	closeCart,
	closeCurrencyModal,
	updateImage,
} from "./actionNames";

export const set = (data) => {
	return {
		type: setProducts,
		payload: data,
	};
};

export const setProd = (data) => {
	return {
		type: setProduct,
		payload: data,
	};
};

export const toggleCurrency = () => {
	return {
		type: toggleCurrencyModal,
	};
};

export const setCurr = (data) => {
	return {
		type: setCurrency,
		payload: data,
	};
};

export const addCart = (data) => {
	return {
		type: addToCart,
		payload: data,
	};
};

export const removeCart = (data) => {
	return {
		type: removeFromCart,
		payload: data,
	};
};

export const toggleCartModal = () => {
	return {
		type: toggleCart,
	};
};
export const closeCartModal = () => {
	return {
		type: closeCart,
	};
};
export const closeCurrModal = () => {
	return {
		type: closeCurrencyModal,
	};
};
export const updateIMG = (data) => {
	return {
		type: updateImage,
		payload: data,
	};
};

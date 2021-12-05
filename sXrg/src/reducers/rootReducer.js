import products from "./products";
import product from "./product";
import currency from "./currency";
import cart from "./cart";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	products,
	product,
	currency,
	cart,
});

export default rootReducer;

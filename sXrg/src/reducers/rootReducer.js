import products from "./products";
import product from "./product";
import currency from "./currency";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products,
  product,
  currency,
});

export default rootReducer;

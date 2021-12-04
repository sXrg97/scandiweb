import { setProduct } from "./actionNames";

const initialState = {
  gotProductData: false,
  productData: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case setProduct:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default product;

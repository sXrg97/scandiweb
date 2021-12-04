import { setProducts } from "./actionNames";

const initialState = {
  gotData: false,
  data: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case setProducts:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default products;

import {
  setProducts,
  setProduct,
  toggleCurrencyModal,
  setCurrency,
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

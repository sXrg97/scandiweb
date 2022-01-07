import {
  toggleCurrencyModal,
  setCurrency,
  closeCurrencyModal,
} from "./actionNames";

const initialState = {
  isCurrencyModalOpen: false,
  selectedCurrency: window.localStorage.getItem("scandiwebCurrency") || "USD",
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case toggleCurrencyModal:
      return {
        ...state,
        isCurrencyModalOpen: !state.isCurrencyModalOpen,
      };
    case setCurrency:
      window.localStorage.setItem("scandiwebCurrency", action.payload.currency);
      return {
        ...state,
        selectedCurrency: action.payload.currency,
      };
    case closeCurrencyModal:
      return {
        ...state,
        isCurrencyModalOpen: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default products;

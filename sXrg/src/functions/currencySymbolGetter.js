const currencySymbolGetter = (currencies) => {
  switch (currencies) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "AUD":
      return "$";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return "";
  }
};

export default currencySymbolGetter;

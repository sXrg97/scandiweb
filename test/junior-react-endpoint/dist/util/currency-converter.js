"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rates = {
    USD: 1.205736,
    GBP: 0.866671,
    AUD: 1.555409,
    JPY: 130.210363,
    RUB: 91.181299
};
var currencyConverter = {
    availableCurrencies: Object.keys(rates),
    convertFromEUR: function (amount, targetCurrency) {
        return rates[targetCurrency] * amount;
    }
};
exports.default = currencyConverter;

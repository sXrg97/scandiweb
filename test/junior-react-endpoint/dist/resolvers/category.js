"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../data");
var categoryResolver = function (_parent, args) {
    var _a = args.input, _b = _a === void 0 ? {} : _a, title = _b.title;
    var result = title
        ? data_1.products.filter(function (product) { return product.getCategory() === title; })
        : data_1.products;
    if (!result.length) {
        return null;
    }
    return {
        name: title ? title : 'all',
        products: result
    };
};
exports.default = categoryResolver;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../data");
var categoriesResolver = function () {
    var result = data_1.products.reduce(function (categories, product) {
        var category = product.getCategory();
        if (!categories[category]) {
            categories[category] = {
                name: category,
                products: []
            };
        }
        var _a = categories, _b = category, products = _a[_b].products;
        products.push(product);
        return categories;
    }, {});
    return Object.values(result);
};
exports.default = categoriesResolver;

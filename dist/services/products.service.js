"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/rest.manager");
const fs = require("fs");
class ProductService extends rest_manager_1.RestManager {
    getProducts() {
        if (this.isMock) {
            const data = fs.readFileSync('mock/products/get-products.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        }
        else {
            // return this.get();
            const data = fs.readFileSync('mock/products/get-products.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const fs = require("fs");
const https = require("https");
class ProductService extends rest_manager_1.RestManager {
    getProducts() {
        if (this.isMock) {
            const data = fs.readFileSync('mock/products/get-products.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        }
        else {
            // const data = fs.readFileSync('mock/products/get-products.json');
            // const jsonData = JSON.parse(data.toString());
            // return jsonData;
            let options = {
                host: 'https://oauth.bancsabadell.com',
                path: '/ResourcesServerBS/oauthservices/v1.0.0/productos',
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer ef87983a-ee9e-435e-8380-e482993b06342434ca7d-5d95-488b-a8ef-fc0b88bf3860f7cea5da-adf6-4dfd-a6a6-cafb3223c755',
                }
            };
            https.request(options, (data) => {
                const jsonData = JSON.parse(data.toString());
                return jsonData;
            });
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map
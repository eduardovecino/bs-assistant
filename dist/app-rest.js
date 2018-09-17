"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const products_1 = require("./rest/routes/products");
const cards_1 = require("./rest/routes/cards");
class AppRest {
    constructor() {
        this.productRoutes = new products_1.ProductRoutes();
        this.cardRoutes = new cards_1.CardRoutes();
        console.log('AppRest Constructor');
        this.app = express();
        this.config();
        this.productRoutes.routes(this.app);
        this.cardRoutes.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new AppRest().app;
//# sourceMappingURL=app-rest.js.map
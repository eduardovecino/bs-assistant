"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const products_1 = require("./rest/routes/products");
const cards_1 = require("./rest/routes/cards");
const accounts_1 = require("./rest/routes/accounts");
const information_1 = require("./rest/routes/information");
const translate_manager_1 = require("./managers/translate.manager");
class AppRest {
    constructor() {
        this.productRoutes = new products_1.ProductRoutes();
        this.cardRoutes = new cards_1.CardRoutes();
        this.accountRoutes = new accounts_1.AccountRoutes();
        this.informationRoutes = new information_1.InformationRoutes();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
        this.app = express();
        this.config();
        this.productRoutes.routes(this.app);
        this.cardRoutes.routes(this.app);
        this.accountRoutes.routes(this.app);
        this.informationRoutes.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.translateManager.config = {
            lang: 'es'
        };
    }
}
exports.default = new AppRest().app;
//# sourceMappingURL=app-rest.js.map
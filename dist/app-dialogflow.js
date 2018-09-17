"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const products_1 = require("./dialogflow/intents/products");
const actions_on_google_1 = require("actions-on-google");
class AppDialogFlow {
    constructor() {
        this.productIntents = new products_1.ProductIntents();
        console.log('AppDialogFlow constructor');
        this.expressApp = express();
        this.app = actions_on_google_1.dialogflow({ debug: true });
        this.config();
        this.expressApp.post('', this.app);
        this.productIntents.intents(this.app);
    }
    config() {
        // support application/json type post data
        this.expressApp.use(bodyParser.json());
    }
    initialize() {
        console.log('initialize');
    }
}
exports.default = new AppDialogFlow().expressApp;
//# sourceMappingURL=app-dialogflow.js.map
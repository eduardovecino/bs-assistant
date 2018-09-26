"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const products_1 = require("./dialogflow/intents/products");
const accounts_1 = require("./dialogflow/intents/accounts");
const cards_1 = require("./dialogflow/intents/cards");
const info_1 = require("./dialogflow/intents/info");
const i18n_1 = require("i18n");
const actions_on_google_1 = require("actions-on-google");
class AppDialogFlow {
    constructor() {
        this.productIntents = new products_1.ProductIntents();
        this.accountIntents = new accounts_1.AccountIntents();
        this.cardIntents = new cards_1.CardIntents();
        this.infoIntents = new info_1.InfoIntents();
        console.log('AppDialogFlow constructor');
        this.expressApp = express();
        this.app = actions_on_google_1.dialogflow({ debug: true });
        this.config();
        this.expressApp.post('', this.app);
        this.productIntents.intents(this.app);
        this.accountIntents.intents(this.app);
        this.cardIntents.intents(this.app);
        this.infoIntents.intents(this.app);
        i18n_1.i18n.configure({
            directory: "../src/locales",
            defaultLocale: "es-ES",
            objectNotatio: true,
            fallbacks: {
                'es-ES': 'es'
            }
        });
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
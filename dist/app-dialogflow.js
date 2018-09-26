"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const products_1 = require("./dialogflow/intents/products");
const accounts_1 = require("./dialogflow/intents/accounts");
const cards_1 = require("./dialogflow/intents/cards");
const info_1 = require("./dialogflow/intents/info");
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("./managers/translate.manager");
class AppDialogFlow {
    constructor() {
        this.productIntents = new products_1.ProductIntents();
        this.accountIntents = new accounts_1.AccountIntents();
        this.cardIntents = new cards_1.CardIntents();
        this.infoIntents = new info_1.InfoIntents();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
        console.log('AppDialogFlow constructor');
        this.expressApp = express();
        this.expressApp.use();
        this.app = actions_on_google_1.dialogflow({ debug: true });
        this.config();
        this.expressApp.post('', this.app);
        this.productIntents.intents(this.app);
        this.accountIntents.intents(this.app);
        this.cardIntents.intents(this.app);
        this.infoIntents.intents(this.app);
    }
    config() {
        // support application/json type post data
        this.expressApp.use(bodyParser.json());
        this.translateManager.config = {
            lang: 'es'
        };
    }
    initialize() {
        console.log('initialize');
    }
}
exports.default = new AppDialogFlow().expressApp;
//# sourceMappingURL=app-dialogflow.js.map
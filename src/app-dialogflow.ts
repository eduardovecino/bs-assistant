import * as express from "express";
import * as bodyParser from "body-parser";
import { ProductIntents } from "./dialogflow/intents/products";
import { AccountIntents } from "./dialogflow/intents/accounts";
import { CardIntents } from "./dialogflow/intents/cards";
import { InfoIntents } from "./dialogflow/intents/info";

import { dialogflow } from "actions-on-google";
import { TranslateManager } from "./managers/translate.manager";

class AppDialogFlow {

    public expressApp: express.Application;
    public app;
    public productIntents: ProductIntents = new ProductIntents();
    public accountIntents: AccountIntents = new AccountIntents();
    public cardIntents: CardIntents = new CardIntents();
    public infoIntents: InfoIntents = new InfoIntents();

    public translateManager: TranslateManager = TranslateManager.getInstance();

    constructor() {
        console.log('AppDialogFlow constructor');
        this.expressApp = express();
        this.app = dialogflow({ debug: true });
        this.config();
        this.expressApp.post('', this.app);

        this.productIntents.intents(this.app);
        this.accountIntents.intents(this.app);
        this.cardIntents.intents(this.app);
        this.infoIntents.intents(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.expressApp.use(bodyParser.json());

        this.translateManager.config = {
            lang: 'en',
            translations: {
                'es': {
                    'foo': 'Soy español'
                },
                'en': {
                    'foo': 'I\'m English'
                }
            }
        };
    }

    public initialize(): void {
        console.log('initialize');
    }
}

export default new AppDialogFlow().expressApp;

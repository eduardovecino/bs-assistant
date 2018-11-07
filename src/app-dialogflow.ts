import * as express from "express";
import * as bodyParser from "body-parser";
import { StartIntents } from "./dialogflow/intents/start";
import { AccountIntents } from "./dialogflow/intents/accounts";
import { CardIntents } from "./dialogflow/intents/cards";
import { InfoIntents } from "./dialogflow/intents/info";

import { dialogflow } from "actions-on-google";
import { TranslateManager } from "./managers/translate.manager";
import { SPANISH_TRANSLATIONS } from "./locales/es-ES";
import { ENGLISH_TRANSLATIONS } from "./locales/en-US";

class AppDialogFlow {

    public expressApp: express.Application;
    public app;
    public startIntents: StartIntents = new StartIntents();
    public accountIntents: AccountIntents = new AccountIntents();
    public cardIntents: CardIntents = new CardIntents();
    public infoIntents: InfoIntents = new InfoIntents();

    public translateManager: TranslateManager = TranslateManager.getInstance();

    constructor() {
        this.expressApp = express();
        this.app = dialogflow({ debug: true });
        this.config();
        this.expressApp.post('', this.app);

        this.app.middleware(conv => {
            this.translateManager.config = {
                lang: conv.user.locale,
                translations: {
                    'es-ES': SPANISH_TRANSLATIONS,
                    'en-US': ENGLISH_TRANSLATIONS
                }
            };
        })

        this.startIntents.intents(this.app);
        this.accountIntents.intents(this.app);
        this.cardIntents.intents(this.app);
        this.infoIntents.intents(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.expressApp.use(bodyParser.json());

        
    }

    public initialize(): void {
    }
}

export default new AppDialogFlow().expressApp;

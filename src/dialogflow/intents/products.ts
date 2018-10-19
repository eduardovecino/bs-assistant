import { Permission, SignIn } from "actions-on-google";
import { BaseIntent } from "./base-intent";
import { TranslateManager } from "../../managers/translate.manager";
import { Ssml } from 'ssml-gib';
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager"


export class ProductIntents /*extends BaseIntent*/ {

    public translateManager: TranslateManager = TranslateManager.getInstance();

    constructor() {
    }

    public intents(app): void {

        app.intent('Default Welcome Intent', conv => {
            conv.ask(new Permission({ 
                context: this.translateManager.translate('intent.product.welcome.permission'),
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });

        // Create a Dialogflow intent with the `actions_intent_PERMISSION` event
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const name = conv.user.name.given;
            if (confirmationGranted) {
                if (name) {
                    conv.ask(Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.product.get_permission.answer_%name%', [name])]));
                }
            } else {
                conv.ask(this.translateManager.translate('intent.product.get_permission.failure'));
            }
        });

        //Iniciar Sesión
        app.intent('Iniciar Sesion', (conv) => {
            conv.ask(this.translateManager.translate('intent.product.login'));
            conv.ask(new SignIn());
        });

        app.intent('Get Signin', (conv, params, signin) => {
            const access = conv.user.access.token;  //possibly do something with access token
            if (signin.status === 'OK') {
                conv.ask(this.translateManager.translate('intent.product.get_signin.ok'));

            } else {
                conv.ask(this.translateManager.translate('intent.product.get_signin.failure'));
            }
        });

        app.intent('Cancel', (conv) => {
            conv.close(this.translateManager.translate('intent.product.cancel'));
        });

        app.intent('Ayuda', (conv) => {
            conv.ask(this.translateManager.translate('intent.product.help'));
            conv.ask(SuggestionDFManager.generateSuggestions());
        });
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("../../managers/translate.manager");
const ssml_gib_1 = require("ssml-gib");
const suggestion_manager_1 = require("../../managers/dialog-flow/suggestion.manager");
class StartIntents /*extends BaseIntent*/ {
    constructor() {
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        //PERMISSIONS
        app.intent('Default Welcome Intent', conv => {
            conv.ask(new actions_on_google_1.Permission({
                context: this.translateManager.translate('intent.product.welcome.permission'),
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const name = conv.user.name.given;
            if (confirmationGranted) {
                if (name) {
                    conv.ask(ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.product.get_permission.answer_%name%', [name])]));
                }
            }
            else {
                conv.ask(this.translateManager.translate('intent.product.get_permission.failure'));
            }
        });
        //INICIAR SESIÓN
        app.intent('Iniciar Sesion', (conv) => {
            conv.ask(this.translateManager.translate('intent.product.login'));
            conv.ask(new actions_on_google_1.SignIn());
        });
        app.intent('Get Signin', (conv, params, signin) => {
            const access = conv.user.access.token; //possibly do something with access token
            if (signin.status === 'OK') {
                conv.ask(this.translateManager.translate('intent.product.get_signin.ok'));
            }
            else {
                conv.ask(this.translateManager.translate('intent.product.get_signin.failure'));
            }
        });
        //CANCEL
        app.intent('Cancel', (conv) => {
            conv.close(this.translateManager.translate('intent.product.cancel'));
        });
        //HELP
        app.intent('Ayuda', (conv) => {
            conv.ask(this.translateManager.translate('intent.product.help'));
            conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
        });
    }
}
exports.StartIntents = StartIntents;
//# sourceMappingURL=start.js.map
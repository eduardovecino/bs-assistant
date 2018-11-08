"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("../../managers/translate.manager");
const suggestion_manager_1 = require("../../managers/dialog-flow/suggestion.manager");
const start_manager_1 = require("../../managers/dialog-flow/start.manager");
class StartIntents /*extends BaseIntent*/ {
    constructor() {
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        let token;
        //PERMISSIONS
        app.intent('Default Welcome Intent', conv => {
            conv.ask(new actions_on_google_1.Permission({
                context: this.translateManager.translate('intent.start.welcome.permission'),
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const name = conv.user.name.given;
            const permissionSimpleResponse = start_manager_1.StartDFManager.generatePermissionSimpleResponse(confirmationGranted, name);
            conv.ask(permissionSimpleResponse);
            conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
        });
        //INICIAR SESIÓN
        app.intent('Iniciar Sesion', (conv) => {
            const loginResponse = start_manager_1.StartDFManager.generateLoginSimpleResponse();
            conv.ask(loginResponse);
            conv.ask(new actions_on_google_1.SignIn());
        });
        app.intent('Get Signin', (conv, params, signin) => {
            if (signin.status === 'OK') {
                const access = conv.user.access.token; //possibly do something with access token
                console.log("TOOKEN: ", access);
                token = access;
                const signinSimpleResponse = start_manager_1.StartDFManager.generateSigninSimpleResponse(signin);
                conv.ask(signinSimpleResponse);
            }
            else {
                conv.ask(`No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`);
            }
        });
        //CANCEL
        app.intent('Cancel', (conv) => {
            const cancelSimpleResponse = start_manager_1.StartDFManager.generateCancelSimpleResponse();
            conv.close(cancelSimpleResponse);
        });
        //HELP
        app.intent('Ayuda', (conv) => {
            if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                const helpSimpleResponseScreen = start_manager_1.StartDFManager.generateHelpSimpleResponseScreen();
                conv.ask(helpSimpleResponseScreen);
                conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
            }
            else {
                const helpSimpleResponseNoScreen = start_manager_1.StartDFManager.generateHelpSimpleResponseNoScreen();
                conv.ask(helpSimpleResponseNoScreen);
            }
        });
    }
}
exports.StartIntents = StartIntents;
//# sourceMappingURL=start.js.map
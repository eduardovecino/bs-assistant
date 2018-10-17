"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const products_service_1 = require("../../services/products.service");
const translate_manager_1 = require("../../managers/translate.manager");
const ssml_gib_1 = require("ssml-gib");
const suggestion_manager_1 = require("../../managers/dialog-flow/suggestion.manager");
class ProductIntents /*extends BaseIntent*/ {
    constructor() {
        this.productsService = new products_service_1.ProductService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        const AppContexts = {
            TUNUMBER: 'number',
        };
        app.intent('Default Welcome Intent', conv => {
            // conv.contexts.set(AppContexts.TUNUMBER, 1)
            // conv.ask('¿Qué edad tienes?')
            conv.ask(new actions_on_google_1.Permission({
                context: this.translateManager.translate('intent.product.welcome.answer'),
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });
        // Create a Dialogflow intent with the `actions_intent_PERMISSION` event
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const name = conv.user.name.given;
            // conv.ask(JSON.stringify(name))
            let ssml = [this.translateManager.translate('intent.product.welcome.answer_%name%', name)];
            if (confirmationGranted) {
                if (name) {
                    conv.ask(ssml_gib_1.Ssml.wrapSsmlSpeak(ssml));
                    // this.suggestions(conv);
                }
            }
            else {
                conv.ask(`I can't read your mind right now! My mystical powers have failed!`);
            }
        });
        //Iniciar Sesión
        app.intent('Iniciar Sesion', (conv) => {
            conv.ask(`Vamos a iniciar sesión`);
            conv.ask(new actions_on_google_1.SignIn());
        });
        app.intent('Get Signin', (conv, params, signin) => {
            const access = conv.user.access.token; //possibly do something with access token
            if (signin.status === 'OK') {
                conv.ask(`¡Genial, gracias por iniciar sesión! ${access}`);
            }
            else {
                //${signin.status}
                conv.ask(`No podré guardar tus datos, pero ¿qué quieres hacer a continuación? ${access}`);
            }
        });
        app.intent('Cancel', (conv) => {
            conv.close('Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!');
        });
        app.intent('Ayuda', (conv) => {
            conv.ask('Puedes ver preguntar sobre tus tarjetas, tus cuentas o las oficinas más cercanas. ¿Qué deseas hacer?');
            conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
        });
    }
}
exports.ProductIntents = ProductIntents;
//# sourceMappingURL=products.js.map
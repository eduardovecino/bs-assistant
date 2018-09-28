"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_1 = require("../../services/products.service");
const translate_manager_1 = require("../../managers/translate.manager");
const ssml_gib_1 = require("ssml-gib");
class ProductIntents /*extends BaseIntent*/ {
    constructor() {
        this.productsService = new products_service_1.ProductService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        app.intent('Default Welcome Intent', conv => {
            // let ssml1 = Ssml.sayAs({ text: this.translateManager.translate('intent.product.welcome.answer'), interpret: As.expletive });
            // let ssml =  Ssml.break({ s: 3 });
            // conv.ask(ssml1, ssml);
            let ssml = ['You have three seconds to think about it...' + ssml_gib_1.Ssml.break({ s: 3 }) + this.translateManager.translate('intent.product.welcome.answer')];
            conv.ask(ssml_gib_1.Ssml.wrapSsmlSpeak(ssml));
            // new Permission({ 
            // context: this.translateManager.translate('intent.product.welcome.answer'),
            // permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            // }));
        });
        // Create a Dialogflow intent with the `actions_intent_PERMISSION` event
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const { name } = conv.user;
            if (confirmationGranted) {
                if (name) {
                    conv.ask(this.translateManager.translate('intent.product.welcome.answer_%name%', { name: name.display }));
                    // this.suggestions(conv);
                }
            }
            else {
                conv.ask(`I can't read your mind right now! My mystical powers have failed!`);
            }
        });
        /*
                //Iniciar Sesión
                app.intent('Iniciar Sesion', (conv) => {
                    conv.ask(`Vamos a iniciar sesión`);
                    conv.ask(new SignIn());
                });
        
                app.intent('Get Signin', (conv, params, signin) => {
                    this.logged = '1'; //TEST
                    if (signin.status === 'OK') {
                        const access = conv.user.access.token;  //possibly do something with access token
                        conv.ask(`¡Genial, gracias por iniciar sesión! ${access}`);
                        this.suggestions(conv);
                    } else {
                        //${signin.status}
                        conv.ask(`No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`);
                        this.suggestions(conv);
                    }
                });*/
        app.intent('Cancel', (conv) => {
            conv.close('Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!');
        });
    }
}
exports.ProductIntents = ProductIntents;
//# sourceMappingURL=products.js.map
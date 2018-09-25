"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const products_service_1 = require("../../services/products.service");
class ProductIntents /*extends BaseIntent*/ {
    constructor() {
        this.productsService = new products_service_1.ProductService();
        // super();
    }
    intents(app) {
        console.log('Registering Products Intents Hola');
        // app.intent('Default Welcome Intent', conv => {
        //     conv.ask(`Bienvenido a Banco Sabadell`); 
        //     this.uggestions(conv);       
        // });
        app.intent('Default Welcome Intent', conv => {
            conv.ask(new actions_on_google_1.Permission({
                context: `Para dirigirme a usted por su nombre y conocer su ubicación,`,
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });
        // Create a Dialogflow intent with the `actions_intent_PERMISSION` event
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const { name } = conv.user;
            if (confirmationGranted) {
                if (name) {
                    conv.ask(`Bienvenido a Banco Sabadell, ${name.display}`);
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
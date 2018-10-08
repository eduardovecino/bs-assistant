import { Permission, SignIn } from "actions-on-google";
import { ProductService } from "../../services/products.service";
import { BaseIntent } from "./base-intent";
import { TranslateManager } from "../../managers/translate.manager";
import { Ssml } from 'ssml-gib';

export class ProductIntents /*extends BaseIntent*/ {

    private productsService: ProductService = new ProductService();
    public translateManager: TranslateManager = TranslateManager.getInstance();


    constructor() {
    }

    

    public intents(app): void {

        const AppContexts = {
            TUNUMBER: 'number',
        }
        app.intent('Default Welcome Intent', conv => {
            conv.contexts.set(AppContexts.TUNUMBER, 1)
            conv.ask('¿Qué edad tienes?')
            // conv.ask(new Permission({ 
            //     context: this.translateManager.translate('intent.product.welcome.answer'),
            //     permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            // }));
        });

        // Create a Dialogflow intent with the `actions_intent_PERMISSION` event
        // app.intent('Get Permission', (conv, params, confirmationGranted) => {
        //     const name  = conv.user;
        //     let ssml = [this.translateManager.translate('intent.product.welcome.answer_%name%')];
        //     if (confirmationGranted) {
        //         if (name) {
        //             conv.ask(Ssml.wrapSsmlSpeak(ssml));
        //             // this.suggestions(conv);
        //         }
        //     } else {
        //         conv.ask(`I can't read your mind right now! My mystical powers have failed!`);
        //     }
        // });

        app.intent('Number Input', conv => {
            const context = conv.contexts.get(AppContexts[0].TUNUMBER)
            conv.ask('Tu edad es' + context);
        })

        //Iniciar Sesión
        app.intent('Iniciar Sesion', (conv) => {
            conv.ask(`Vamos a iniciar sesión`);
            conv.ask(new SignIn());
        });

        app.intent('Get Signin', (conv, params, signin) => {
            // this.logged = '1'; //TEST
            if (signin.status === 'OK') {
                const access = conv.user.access.token;  //possibly do something with access token
                conv.ask(`¡Genial, gracias por iniciar sesión! ${access}`);
                // this.suggestions(conv);
            } else {
                //${signin.status}
                conv.ask(`No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`);
                // this.suggestions(conv);
            }
        });

        app.intent('Cancel', (conv) => {
            conv.close('Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!');
        });
    }
}
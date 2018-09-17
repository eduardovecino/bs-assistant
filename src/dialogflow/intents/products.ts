import { Permission, SignIn } from "actions-on-google";
import { ProductService } from "../../services/products.service";
import { BaseIntent } from "./base-intent";

export class ProductIntents /*extends BaseIntent*/ {

    private productsService: ProductService = new ProductService();

    constructor() {
        // super();
    }

    public intents(app): void {
        console.log('Registering Products Intents Hola');

        // app.intent('Default Welcome Intent', conv => {
        //     conv.ask(`Bienvenido a Banco Sabadell`); 
        //     this.uggestions(conv);       
        // });

        app.intent('Default Welcome Intent', conv => {
            conv.ask(new Permission({
                context: 'Para dirigirme a usted por su nombre y conocer su ubicación,',
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });

        // Create a Dialogflow intent with the `actions_intent_PERMISSION` event
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            conv.ask(`Bienvenido a Banco Sabadell`);
            const { name } = conv.user;
            if (confirmationGranted) {
                if (name) {
                    conv.ask(`Bienvenido a Banco Sabadell, ${name.display}`);
                    // this.suggestions(conv);
                }
            } else {
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
        });

        app.intent('Saldo cuenta', (conv, { tipo_cuenta }) => {
            console.log('INTENT: Saldo cuenta');
            const data = this.productsService.getProducts();
            conv.ask('El saldo  de la cuenta es de ' + data.num);
        });*/
    }
}
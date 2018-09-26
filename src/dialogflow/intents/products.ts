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

            //     const ssml = '<speak>' +
            //         'Here are <say-as interpret-as="characters">SSML</say-as> samples. ' +
            //         'I can pause <break time="3" />. ' +
            //         'I can play a sound <audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
            //         'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. ' +
            //         'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. ' +
            //         'Or I can even speak in digits. Your position in line is <say-as interpret-a s="digits">10</say-as>. ' +
            //         'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. ' +
            //         'Finally, I can speak a paragraph with two sentences. ' +
            //         '<p><s>This is sentence one.</s><s>This is sentence two.</s></p>' +
            //         '</speak>';
                
            //  conv.ask(ssml);
            conv.ask('Bienvendo al Banco Sabadell')
            conv.ask(new Permission({
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
        });*/
        app.intent('Cancel', (conv) => {
            conv.close('Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!');
        });
    }
}
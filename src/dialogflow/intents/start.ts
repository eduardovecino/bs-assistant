import { Permission, SignIn } from "actions-on-google";
import { TranslateManager } from "../../managers/translate.manager";
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager"
import { StartDFManager } from "../../managers/dialog-flow/start.manager";


export class StartIntents /*extends BaseIntent*/ {

    public translateManager: TranslateManager = TranslateManager.getInstance();

    constructor() {
    }

    public intents(app): void {
        let token;

        //PERMISSIONS
        // app.intent('Default Welcome Intent', conv => {
        //     conv.ask(new Permission({ 
        //         context: this.translateManager.translate('intent.start.welcome.permission'),
        //         permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
        //     }));
        // });

        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            console.log("ENTRO 6");
            conv.ask('hooooooolaaaaaaaaaaaaa');
        });

        //INICIAR SESIÓN
        app.intent('Iniciar Sesion', (conv) => {
            const loginResponse = StartDFManager.generateLoginSimpleResponse();
            conv.ask(loginResponse);
            conv.ask(new SignIn());
        });
        app.intent('Get Signin', (conv, params, signin) => {
            if (signin.status === 'OK') {
                const signinSimpleResponse = StartDFManager.generateSigninSimpleResponse(signin);
                conv.ask(signinSimpleResponse);
                conv.ask(SuggestionDFManager.generateSuggestions());
            } else {
                conv.close(`No se ha podido iniciar sesión, vuelvelo a intentar`);
            }
        });

        //CANCEL
        app.intent('Cancel', (conv) => {
            const cancelSimpleResponse = StartDFManager.generateCancelSimpleResponse();
            conv.close(cancelSimpleResponse);
        });

        //HELP
        app.intent('Ayuda', (conv) => {
            if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                const helpSimpleResponseScreen = StartDFManager.generateHelpSimpleResponseScreen();
                conv.ask(helpSimpleResponseScreen);
                conv.ask(SuggestionDFManager.generateSuggestions());
            } else {
                const helpSimpleResponseNoScreen = StartDFManager.generateHelpSimpleResponseNoScreen();
                conv.ask(helpSimpleResponseNoScreen);
            }
        });


    }
}
import { Permission, SignIn } from "actions-on-google";
import { TranslateManager } from "../../managers/translate.manager";
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager"
import { StartDFManager } from "../../managers/dialog-flow/start.manager";


export class StartIntents /*extends BaseIntent*/ {

    public translateManager: TranslateManager = TranslateManager.getInstance();

    constructor() {
    }

    public intents(app): void {

        //PERMISSIONS
        app.intent('Default Welcome Intent', conv => {
            conv.ask(new Permission({ 
                context: this.translateManager.translate('intent.start.welcome.permission'),
                permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
            }));
        });
        app.intent('Get Permission', (conv, params, confirmationGranted) => {
            const name = conv.user.name.given;
            const permissionSimpleResponse = StartDFManager.generatePermissionSimpleResponse(confirmationGranted, name);
            conv.ask(permissionSimpleResponse);
            conv.ask(SuggestionDFManager.generateSuggestions());
        });

        //INICIAR SESIÓN
        app.intent('Iniciar Sesion', (conv) => {
            const loginResponse = StartDFManager.generateLoginSimpleResponse();
            conv.ask(loginResponse);
            conv.ask(new SignIn());
        });
        // app.intent('Get Signin', (conv, params, signin) => {
        //     const access = conv.user.access.token;  //possibly do something with access token
        //     console.log("token", access);
        //     const signinSimpleResponse = StartDFManager.generateSigninSimpleResponse(signin);
        //     conv.ask(signinSimpleResponse);
        // });

        app.intent('Get Signin', (conv, params, signin) => {
            if (signin.status === 'OK') {
                const access = conv.user.access.token;  //possibly do something with access token
                conv.ask(`¡Genial, gracias por iniciar sesión! ${access}`);
            } else {
                //${signin.status}
                conv.ask(`No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`);
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
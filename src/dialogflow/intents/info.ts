import { Permission, Suggestions } from "actions-on-google";
import { InformationService } from '../../services/information.service';
import { InformationDFManager } from '../../managers/dialog-flow/information.manager';
import { TranslateManager } from "../../managers/translate.manager";



export class InfoIntents {

    private informationService: InformationService = new InformationService();
    public translateManager: TranslateManager = TranslateManager.getInstance();

    public intents(app): void {

        //OFICINAS
        app.intent('Oficinas Cercanas', async conv => {
            if (conv.user.permissions.length > 0) {
                this.offices(conv);
            } else {
                conv.ask(new Permission({
                    context: this.translateManager.translate('intent.information.offices.permission'),
                    permissions: ['NAME', 'DEVICE_PRECISE_LOCATION', 'DEVICE_COARSE_LOCATION'],
                }));
                this.offices(conv);
            }
        });

        //ABRIR APP
        app.intent('Abrir App', (conv) => {
            if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                const openAppSimpleResponseScreen = InformationDFManager.generateOpenAppSimpleResponseScreen();
                const openAppBasicCard = InformationDFManager.generateOpenAppBasicCard();
                conv.ask(openAppSimpleResponseScreen);
                conv.ask(openAppBasicCard);
            } else {
                const openAppSimpleResponseNoScreen = InformationDFManager.generateOpenAppSimpleResponseNoScreen();
                conv.ask(openAppSimpleResponseNoScreen);

            }
        });

        //CONTACTO
        app.intent('Contacto', (conv) => {
            const contactSimpleResponseScreen = InformationDFManager.generateContactSimpleResponseScreen();
            conv.ask(contactSimpleResponseScreen);
        });
    }

    private offices(conv) {
        const latitude = conv.device.location.coordinates.latitude;
        const longitude = conv.device.location.coordinates.longitude;

        let offices = await this.informationService.getOffices(latitude, longitude);
        if (offices) {
            if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                const officesSimpleResponseScreen = InformationDFManager.generateOfficesSimpleResponseScreen();
                const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices, latitude, longitude);
                conv.ask(officesSimpleResponseScreen);
                conv.ask(carouselOfOffices);
            } else {
                const officesSimpleResponseNoScreen = InformationDFManager.generateOfficesSimpleResponseNoScreen(offices);
                conv.ask(officesSimpleResponseNoScreen);
            }
        } else {
            conv.ask(this.translateManager.translate('intent.service.failure'));
        }
    }
}
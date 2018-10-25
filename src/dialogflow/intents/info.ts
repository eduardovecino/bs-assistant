import { InformationService } from '../../services/information.service';
import { InformationDFManager } from '../../managers/dialog-flow/information.manager';
import { TranslateManager } from "../../managers/translate.manager";



export class InfoIntents {

    private informationService: InformationService = new InformationService();
    public translateManager: TranslateManager = TranslateManager.getInstance();

    public intents(app): void {

        //OFICINAS
        app.intent('Oficinas Cercanas', async conv => {
            const latitude = conv.device.location.coordinates.latitude;
            const longitude = conv.device.location.coordinates.longitude;

            let offices = await this.informationService.getOffices(latitude, longitude);
            if (offices){
                const officesSimpleResponse = InformationDFManager.generateOfficesSimpleResponse(offices);
                const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
                conv.ask(officesSimpleResponse);
                conv.ask(carouselOfOffices);
            } else {
                conv.ask(this.translateManager.translate('intent.service.failure')); 
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
            // if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                const contactSimpleResponseScreen = InformationDFManager.generateContactSimpleResponseScreen();
                console.log("INFO1" + contactSimpleResponseScreen);
                conv.ask(contactSimpleResponseScreen);
            // } else {
            //     const openAppSimpleResponseNoScreen = InformationDFManager.generateOpenAppSimpleResponseNoScreen();
            //     conv.ask(openAppSimpleResponseNoScreen);

            // }

        });
    }
}
import { InformationService } from '../../services/information.service';
import { InformationDFManager } from '../../managers/dialog-flow/information.manager';



export class InfoIntents /*extends BaseIntent*/ {
    private informationService: InformationService = new InformationService();


    public intents(app): void {

        app.intent('Oficinas', conv => {
            this.informationService.getOffices().then(offices => {
                if (offices) {
                    const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
                    conv.ask('Aquí tienes las oficinas más cercanas');
                    conv.ask(carouselOfOffices);
                } else {
                    conv.ask('No podemos mostrar las oficinas cercanas en este momento, vuelve a intentarlo');
                }
            });
        });
    }
}
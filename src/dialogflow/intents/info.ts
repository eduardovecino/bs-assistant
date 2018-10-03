import { InformationService } from '../../services/information.service';
import { InformationDFManager } from '../../managers/dialog-flow/information.manager';



export class InfoIntents /*extends BaseIntent*/ {
    private informationService: InformationService = new InformationService();


    public intents(app): void {

        app.intent('Oficinas Cercanas', conv => {
            this.informationService.getOffices().then(offices => {
                let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";

                // conv.ask(offices[0].latitude);
                if (offices) {
                    offices.forEach(office => {
                        response = response + office.id + " en " + office.address + ", ";
                    })

                    const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
                    conv.ask(response + "¿Cúal quieres  seleccionar?");
                    conv.ask(carouselOfOffices);
                } else {
                    conv.ask(`No podemos mostrar las oficinas cercanas en este momento, vuelve a intentarlo`);
                }
            });
        });
    }
}
import { InformationService } from '../../services/information.service';
import { InformationDFManager } from '../../managers/dialog-flow/information.manager';
import { TranslateManager } from "../../managers/translate.manager";



export class InfoIntents /*extends BaseIntent*/ {

    private informationService: InformationService = new InformationService();
    public translateManager: TranslateManager = TranslateManager.getInstance();

    public intents(app): void {

        app.intent('Oficinas Cercanas', async conv => {
            const latitude = conv.coordinates.latitude;
            const longitude = conv.coordinates.longitude;

            let offices;
            offices = await this.informationService.getOffices(latitude, longitude);
            if (offices){
                let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
                offices.forEach(office => {
                    response = response + office.name + " en " + office.address + ", ";
                })

                const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
                conv.ask(response + "¿Cúal quieres seleccionar?");
                conv.ask(carouselOfOffices);
            } else {
                console.log("No funciona el servicio");
                conv.ask("No funciona el servicio"); 
            }
        });
    }
}
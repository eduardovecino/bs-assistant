import { InformationService } from '../../services/information.service';
import { InformationDFManager } from '../../managers/dialog-flow/information.manager';



export class InfoIntents /*extends BaseIntent*/ {
    private informationService: InformationService = new InformationService();


    public intents(app): void {

        app.intent('Oficinas Cercanas', async conv => {
            let offices;
            offices = await this.informationService.getOffices();
            if (offices){
                console.log("Localizaciones cajeros" + JSON.stringify(offices));
                conv.ask("Localizaciones cajeros" + JSON.stringify(offices));
            }

            // let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
            // if (offices) {
            //     offices.forEach(office => {
            //         response = response + office.id + " en " + office.address + ", ";
            //     })

            //     const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
            //     conv.ask(response + "¿Cúal quieres seleccionar?");
            //     conv.ask(carouselOfOffices);
            // } else {
            //     conv.ask(`No podemos mostrar las oficinas cercanas en este momento, vuelve a intentarlo`);
            // }
        });
    }
}
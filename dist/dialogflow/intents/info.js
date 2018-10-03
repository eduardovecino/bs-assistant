"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const information_service_1 = require("../../services/information.service");
const information_manager_1 = require("../../managers/dialog-flow/information.manager");
class InfoIntents /*extends BaseIntent*/ {
    constructor() {
        this.informationService = new information_service_1.InformationService();
    }
    intents(app) {
        app.intent('Oficinas Cercanas', conv => {
            this.informationService.getOffices().then(offices => {
                let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
                // conv.ask(offices[0].latitude);
                if (offices) {
                    offices.forEach(office => {
                        response = response + office.id + " en " + office.address + ", ";
                    });
                    const carouselOfOffices = information_manager_1.InformationDFManager.generateOfficesBrowseCarousel(offices);
                    conv.ask(response + "¿Cúal desea seleccionar?");
                    conv.ask(carouselOfOffices);
                }
                else {
                    conv.ask(`No podemos mostrar las oficinas cercanas en este momento, vuelve a intentarlo`);
                }
            });
        });
    }
}
exports.InfoIntents = InfoIntents;
//# sourceMappingURL=info.js.map
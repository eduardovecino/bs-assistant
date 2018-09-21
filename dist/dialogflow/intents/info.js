"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const information_service_1 = require("../../services/information.service");
class InfoIntents /*extends BaseIntent*/ {
    constructor() {
        this.informationService = new information_service_1.InformationService();
    }
    intents(app) {
        app.intent('Oficinas', conv => {
            conv.ask('jajajjajajaj');
            // this.informationService.getOffices().then(offices => {
            // conv.ask(offices[0].latitude);
            // if (offices) {
            //     const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
            //     conv.ask('Aquí tienes las oficinas más cercanas');
            //     conv.ask(carouselOfOffices);
            // } else {
            //     conv.ask('No podemos mostrar las oficinas cercanas en este momento, vuelve a intentarlo');
            // }
            // });
        });
    }
}
exports.InfoIntents = InfoIntents;
//# sourceMappingURL=info.js.map
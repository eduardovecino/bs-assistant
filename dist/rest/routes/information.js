"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const information_service_1 = require("../../services/information.service");
class InformationRoutes {
    constructor() {
        this.informationService = new information_service_1.InformationService();
    }
    routes(app) {
        app.route('/information/offices')
            .get((req, res) => {
            this.informationService.getOffices().then(offices => {
                if (offices) {
                    res.status(200).send(offices);
                    // const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
                    // res.status(200).send(carouselOfOffices);
                }
                else {
                    res.status(400).send('No se ha encontrado las tarjetas');
                }
            });
        });
    }
}
exports.InformationRoutes = InformationRoutes;
//# sourceMappingURL=information.js.map
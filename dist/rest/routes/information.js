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
            // Intercalar el servicio para recuperar los datos del servidor de sabadell
            const data = this.informationService.getOffices();
            res.status(200).send(data);
        });
    }
}
exports.InformationRoutes = InformationRoutes;
//# sourceMappingURL=information.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
class CardRoutes {
    constructor() {
        this.cardService = new card_service_1.CardService();
    }
    routes(app) {
        app.route('/cards')
            .get((req, res) => {
            // Intercalar el servicio para recuperar los datos del servidor de sabadell
            const data = this.cardService.getCards();
            res.status(200).send(data.data);
        });
    }
}
exports.CardRoutes = CardRoutes;
//# sourceMappingURL=cards.js.map
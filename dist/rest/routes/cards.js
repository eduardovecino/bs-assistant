"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const card_manager_1 = require("../../managers/card.manager");
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
        app.route('/cards/:last4/movements')
            .get((req, res) => {
            const cards = this.cardService.getCards();
            const card = card_manager_1.CardManager.getCardByLast4(cards, req.params.last4);
            if (card) {
                const movementsTable = card_manager_1.CardManager.generateMovementsTable(card);
                res.status(200).send(movementsTable);
            }
            else {
                res.status(400).send('No se ha encontrado la tarjeta');
            }
        });
    }
}
exports.CardRoutes = CardRoutes;
//# sourceMappingURL=cards.js.map
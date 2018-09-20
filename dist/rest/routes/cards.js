"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const card_manager_1 = require("../../managers/dialog-flow/card.manager");
class CardRoutes {
    constructor() {
        this.cardService = new card_service_1.CardService();
    }
    routes(app) {
        app.route('/cards')
            .get((req, res) => {
            this.cardService.getCards().then(cards => {
                if (cards) {
                    const carouselOfCards = card_manager_1.CardDFManager.cardsCarousel(cards);
                    res.status(200).send(carouselOfCards);
                }
                else {
                    res.status(400).send('No se ha encontrado las tarjetas');
                }
            });
        });
        app.route('/cards/:last4/movements')
            .get((req, res) => {
            this.cardService.getCardByInputs(req.params.last4).then(card => {
                if (card) {
                    const movementsTable = card_manager_1.CardDFManager.generateMovementsTable(card);
                    res.status(200).send(movementsTable);
                }
                else {
                    res.status(400).send('No se ha encontrado la tarjeta');
                }
            });
        });
    }
}
exports.CardRoutes = CardRoutes;
//# sourceMappingURL=cards.js.map
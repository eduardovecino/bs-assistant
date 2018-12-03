"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const card_manager_1 = require("../managers/data/card.manager");
const cards_model_1 = require("../models/cards.model");
const card_model_1 = require("../models/card.model");
class CardService extends rest_manager_1.RestManager {
    getCards(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/tarjetas', 'mock/card/get-cards.json', token);
            const cards = [];
            results.forEach(result => cards.push(new cards_model_1.CardsModel(result)));
            return cards;
        });
    }
    getCard(last4, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield this.getCards(token);
            const productNumber = card_manager_1.CardManager.getCardByLast4(cards, last4);
            let card;
            if (productNumber) {
                card = new card_model_1.CardModel(yield this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/tarjetas/${productNumber.productNumber}/movimientos?order=A`, 'mock/card/get-card.json', token));
            }
            return card;
        });
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
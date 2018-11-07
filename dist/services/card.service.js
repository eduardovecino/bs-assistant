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
class CardService extends rest_manager_1.RestManager {
    // async getCards() {
    //     const data = await fs.readFileSync('mock/card/get-cards.json');
    //     const jsonData = JSON.parse(data.toString());
    //     const cards: Array<CardModel> = [];
    //     jsonData.data.forEach(card => cards.push(new CardModel(card)));
    //     return cards;
    // }
    getCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/tarjetas', 'mock/card/get-cards.json');
            const cards = [];
            results.forEach(result => cards.push(new cards_model_1.CardsModel(result)));
            return cards;
        });
    }
    // async getCard(last4) {
    //     const cards = await this.getCards();
    //     const card = CardManager.getCardByLast4(cards, last4);
    //     return card;
    // }
    getCard(last4) {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield this.getCards();
            const productNumber = card_manager_1.CardManager.getCardByLast4(cards, last4).productNumber;
            const card = yield this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/tarjetas/${productNumber}/movimientos?order=A`, 'mock/card/get-card.json');
            console.log("CARDMODEL: ", card);
            return card;
        });
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
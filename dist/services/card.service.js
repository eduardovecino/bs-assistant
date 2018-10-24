"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const card_manager_1 = require("../managers/data/card.manager");
const fs = require("fs");
const card_model_1 = require("../models/card.model");
class CardService extends rest_manager_1.RestManager {
    getCards() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const cards = [];
            jsonData.forEach(card => cards.push(new card_model_1.CardModel(card)));
            console.log("CARDS", cards);
            resolve(cards);
        });
    }
    getCard(last4) {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const card = new card_model_1.CardModel(card_manager_1.CardManager.getCardByLast4(jsonData.data, last4));
            console.log("CARD", card);
            resolve(card);
        });
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
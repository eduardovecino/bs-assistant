"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/rest.manager");
const card_manager_1 = require("../managers/card.manager");
const fs = require("fs");
class CardService extends rest_manager_1.RestManager {
    getCards() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
    getCard(last4) {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const card = card_manager_1.CardManager.getCardByLast4(jsonData.data, last4);
            resolve(card);
        });
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
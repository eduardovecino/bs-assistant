"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const card_manager_1 = require("../managers/data/card.manager");
const card_model_1 = require("../models/card.model");
const fs = require("fs");
class CardService extends rest_manager_1.RestManager {
    // public getCards2(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const data = fs.readFileSync('mock/card/get-cards.json');
    //         const jsonData = JSON.parse(data.toString());
    //         console.log("CARDS", jsonData);
    //         resolve(jsonData.data);
    //     });      
    // }
    // public getCard(last4): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const data = fs.readFileSync('mock/card/get-cards.json');
    //         const jsonData = JSON.parse(data.toString());
    //         const card = CardManager.getCardByLast4(jsonData.data, last4);
    //         resolve(card);
    //     });
    // }
    getCards() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const cards = [];
            jsonData.data.forEach(card => cards.push(new card_model_1.CardModel(card)));
            resolve(cards);
        });
    }
    getCard(last4) {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const card = new card_model_1.CardModel(card_manager_1.CardManager.getCardByLast4(jsonData.data, last4));
            console.log("CARD0", card);
            resolve(card);
        });
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
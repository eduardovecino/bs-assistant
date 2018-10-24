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
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const cards = [];
            jsonData.data.forEach(card => cards.push(new card_model_1.CardModel(card)));
            return cards;
        });
    }
    getCard(last4) {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield this.getCards();
            console.log("CARD0", cards);
            const card = card_manager_1.CardManager.getCardByLast4(cards, last4);
            console.log("CARD1", card);
            return card;
        });
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";
import { CardModel } from "../models/card.model";

import * as fs from "fs";

export class CardService extends RestManager {
    async getCards() {
        const data = await fs.readFileSync('mock/card/get-cards.json');
        const jsonData = JSON.parse(data.toString());
        const cards: Array<CardModel> = [];
        jsonData.data.forEach(card => cards.push(new CardModel(card)));
        return cards;
    }

    async getCard(last4) {
        const cards = await this.getCards();
        const card = CardManager.getCardByLast4(cards, last4);
        return card;
    }
}
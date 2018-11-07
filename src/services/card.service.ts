import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";

import { CardsModel } from "../models/cards.model";
import { CardModel } from "../models/card.model";


import * as fs from "fs";

export class CardService extends RestManager {

    // async getCards() {
    //     const data = await fs.readFileSync('mock/card/get-cards.json');
    //     const jsonData = JSON.parse(data.toString());
    //     const cards: Array<CardModel> = [];
    //     jsonData.data.forEach(card => cards.push(new CardModel(card)));
    //     return cards;
    // }

    async getCards() {
        const results: any = await this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/tarjetas', 'mock/card/get-cards.json');
        const cards: Array<CardsModel> = [];
        results.forEach(result => cards.push(new CardsModel(result)));
        return cards;
    }

    // async getCard(last4) {
    //     const cards = await this.getCards();
    //     const card = CardManager.getCardByLast4(cards, last4);
    //     return card;
    // }

    async getCard(last4) {
        const cards = await this.getCards();
        const productNumber = CardManager.getCardByLast4(cards, last4).productNumber;
        let card: CardModel = new CardModel({});
        card = await this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/tarjetas/${productNumber}/movimientos?order=A`, 'mock/card/get-card.json');
        console.log("CARDMODEL: ", card);
        return card;
    }
}
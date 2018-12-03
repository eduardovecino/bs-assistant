import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";

import { CardsModel } from "../models/cards.model";
import { CardModel } from "../models/card.model";


import * as fs from "fs";

export class CardService extends RestManager {

    async getCards(token) {
        const results: any = await this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/tarjetas', 'mock/card/get-cards.json', token);
        const cards: Array<CardsModel> = [];
        results.forEach(result => cards.push(new CardsModel(result)));
        return cards;
    }

    async getCard(last4, token) {
        const cards = await this.getCards(token);
        const productNumber = CardManager.getCardByLast4(cards, last4);
        let card: CardModel;
        if (productNumber) {
            card = new CardModel(await this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/tarjetas/${productNumber.productNumber}/movimientos?order=A`, 'mock/card/get-card.json', token));
        }
        return card;
    }
}
import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";
import { CardModel } from "../models/card.model";

import * as fs from "fs";

export class CardService extends RestManager {

    public getCards2(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            console.log("CARDS", jsonData);
            resolve(jsonData.data);
        });      
    }

    public getCard(last4): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const card = CardManager.getCardByLast4(jsonData.data, last4);
            resolve(card);
        });
    }

    public getCards(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            console.log("CARDS0", jsonData.data);
            const cards: Array<CardModel> = [];
            jsonData.data.forEach(card => cards.push(new CardModel(card)));
            console.log("CARDS1", cards);
            resolve(cards);
        });
    }

    public getCard2(last4): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const card: CardModel = new CardModel(CardManager.getCardByLast4(jsonData.data, last4));
            console.log("CARD", card);
            resolve(card);
        });
    }
}
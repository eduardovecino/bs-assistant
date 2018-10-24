import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";
import { CardModel } from "../models/card.model";

import * as fs from "fs";

export class CardService extends RestManager {

    public getCards(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            console.log("CARDS", data);
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

    public getCards2(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            const cards: Array<CardModel> = [];
            jsonData.forEach(card => cards.push(new CardModel(card)));
            console.log("CARDS", cards);
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
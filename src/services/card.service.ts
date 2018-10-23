import { RestManager } from "../managers/data/rest.manager";
import { CardManager } from "../managers/data/card.manager";

import * as fs from "fs";

export class CardService extends RestManager {

    public getCards(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
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
}
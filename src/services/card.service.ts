import { RestManager } from "../managers/rest.manager";
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
            const data = fs.readFileSync('mock/card/get-card.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
}
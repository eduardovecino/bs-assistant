import { RestManager } from "../managers/rest.manager";
import * as fs from "fs";

export class CardService extends RestManager {

    public getCards(): any {
        if(this.isMock) {
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData.data;
        } else {
            // return this.get();
            const data = fs.readFileSync('mock/card/get-cards.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData.data;
        }
    }
}
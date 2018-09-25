import { RestManager } from "../managers/data/rest.manager";

import * as fs from "fs";

export class InformationService extends RestManager {

    public getOffices(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });      
    }
}
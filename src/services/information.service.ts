import { RestManager } from "../managers/data/rest.manager";

import * as fs from "fs";
import * as rp from "request-promise";
import { OfficeModel } from "../models/office.model";

export class InformationService extends RestManager {

    public getNearbyOffices(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        }); 
    }

    public getOffices(latitude, longitude): Promise<any> {
        console.log("ENTRO4");
        return new Promise((resolve, reject) => {
            const options = {
                'method': 'GET',
                'uri': `https://www.bancsabadell.mobi/bsmobil/api/offices/?lat=${latitude}&lng=${longitude}&numOffices=10`,
                'json': true,
                'headers': {
                    'Accept-Language': 'es',
                    'Accept': 'application/vnd.idk.bsmobil-v1000+json'
                },
            };

            rp(options)
                .then(function (body) {
                    const results: any = body.offices;
                    const offices: Array<OfficeModel> = [];
                    results.forEach(result => offices.push(result));
                    resolve(offices);
                })
                .catch(function (err) {
                    reject(err.error);
                });    
        }) 
    }
}
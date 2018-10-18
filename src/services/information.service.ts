import { RestManager } from "../managers/data/rest.manager";

import * as fs from "fs";
import * as rp from "request-promise";

export class InformationService extends RestManager {

    public getNearbyOffices(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        }); 
    }

    public getOffices(): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                'method': 'GET',
                'uri': 'https://www.bancsabadell.mobi/bsmobil/api/offices/?lat=41.389492&lng=2.135065&numOffices=10',
                'json': true,
                'headers': {
                    'Accept-Language': 'es',
                    'Accept': 'application/vnd.idk.bsmobil-v1000+json'
                    // 'Content-Type': 'application/json'
                },
            };

            rp(options)
                .then(function (body) {
                    var data = body;
                    console.log('success', data);
                    resolve(data.offices);
                })
                .catch(function (err) {
                    console.log('error', err);
                    reject(err.error);
                });    
        }) 
    }
}
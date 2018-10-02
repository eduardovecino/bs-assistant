import { RestManager } from "../managers/data/rest.manager";

import * as fs from "fs";
import * as https from 'https';

export class ProductService extends RestManager {

    public getProducts(): any {
        if(this.isMock) {
            const data = fs.readFileSync('mock/products/get-products.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        } else {
            // const data = fs.readFileSync('mock/products/get-products.json');
            // const jsonData = JSON.parse(data.toString());
            // return jsonData;
            let options = {
                host: 'https://oauth.bancsabadell.com',
                path: '/ResourcesServerBS/oauthservices/v1.0.0/productos',
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer ef87983a-ee9e-435e-8380-e482993b06342434ca7d-5d95-488b-a8ef-fc0b88bf3860f7cea5da-adf6-4dfd-a6a6-cafb3223c755',
                }
            }
            https.request(options, (data)=>{
                const jsonData = JSON.parse(data.toString());
                return jsonData
            })
        }
    }
}
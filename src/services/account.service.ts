import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import * as fs from "fs";
import * as https from 'https';

export class AccountService extends RestManager {

    public getAccounts(): Promise<any> {
        return new Promise((resolve, reject) => {
            // const data = fs.readFileSync('mock/accounts/get-accounts.json');
            // const jsonData = JSON.parse(data.toString());
            // resolve(jsonData.data);

            let options = {
                host: 'https://oauth.bancsabadell.com',
                path: '/ResourcesServerBS/oauthservices/v1.0.0/productos',
                method: 'GET',
                headers: {
                    // accept: 'application/json',
                    authorization: 'Bearer ef87983a-ee9e-435e-8380-e482993b06342434ca7d-5d95-488b-a8ef-fc0b88bf3860f7cea5da-adf6-4dfd-a6a6-cafb3223c755',
                }
            }
            https.request(options, (data) => {
                const jsonData = JSON.parse(data.toString());
                resolve (jsonData)
            })
        });
    }

    public getAccount(last4): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/accounts/get-account.json');
            const jsonData = JSON.parse(data.toString());
            const card = AccountManager.getAccountByLast4(jsonData.data, last4);
            resolve(card);
        });
    }
}
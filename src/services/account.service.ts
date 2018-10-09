import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import * as fs from "fs";
import { setTimeout } from "timers";


export class AccountService extends RestManager {

    public getAccounts(): Promise<any> {
        return new Promise((resolve, reject) => {
            // setTimeout(() => 
            // const result = this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');
            // resolve(result);
            resolve('funciona')
                // , 0);
        });
        // return new Promise((resolve, reject) => {
        //     const data = fs.readFileSync('mock/accounts/get-accounts.json');
        //     const jsonData = JSON.parse(data.toString());
        //     resolve(jsonData.data);
        // });        
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
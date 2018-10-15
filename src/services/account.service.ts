import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import * as fs from "fs";
import { setTimeout } from "timers";


export class AccountService extends RestManager {

    public getAccounts() {
        return this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');
        // return new Promise((resolve, reject) => {
        //     const data = fs.readFileSync('mock/accounts/get-accounts.json');
        //     const jsonData = JSON.parse(data.toString());
        //     resolve(jsonData.data);
        // });        
    }

    public getAccount(last4) {
        console.log("ACCOUNT.SERVICE " +last4);
        this.getAccounts().then(accounts=> {
            console.log("ACCOUNT.SERVICE2 " + accounts);
            const jsonData = JSON.parse(accounts.toString());
            const account = AccountManager.getAccountByLast4(jsonData.data, last4);
            console.log("987654321 "+account);
            return account;
        });
    }

    public getMovementsAccounts(account) {
        return this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-1-2018`, `mock/accounts/get-movements-accounts.json`);
        // return new Promise((resolve, reject) => {
        //     const data = fs.readFileSync('mock/accounts/get-movements-accounts.json');
        //     const jsonData = JSON.parse(data.toString());
        //     resolve(jsonData.data);
        // });
    }
}

import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import * as fs from "fs";
import { setTimeout } from "timers";


export class AccountService extends RestManager {

    public getAccounts() {
        return this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');        
    }

    public getAccount(last4) {
        return this.getAccounts().then(accounts=> {
            const account = AccountManager.getAccountByLast4(accounts, last4);
            console.log("987654321 " + JSON.stringify(account));
            
            return account;
        });
    }

    public getMovementsAccounts(account) {
        return this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-1-2018`, `mock/accounts/get-movements-accounts.json`);
    }
}

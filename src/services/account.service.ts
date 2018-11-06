import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import { AccountModel } from "../models/account.model";
import { MovementModel } from "../models/movement.model";


export class AccountService extends RestManager {

    async getAccounts() {
        const results: any = await this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista', 'mock/accounts/get-accounts.json');
        const accounts: Array<AccountModel> = [];
        results.forEach(result => accounts.push(new AccountModel(result)));
        return accounts;        
    }

    async getAccount(last4) {
        const accounts = await this.getAccounts();
        const account = AccountManager.getAccountByLast4(accounts, last4);
        return account;
    }

    async getMovementsAccounts(account) {
        //TODO Quitar los limites de la fecha para mostrar los últimos movimientos
        // /ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos
        const results: any = await this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-10-2018`, `mock/accounts/get-movements-accounts.json`);
        const movements: Array<MovementModel> = [];
        if(results) {
            results.forEach(result => movements.push(new MovementModel(result)));
        };
        return movements;

    }
}
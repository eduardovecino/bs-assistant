import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import { ProductModel } from "../models/product.model";
import { MovementModel } from "../models/movement.model";


export class AccountService extends RestManager {

    async getAccounts() {
        const results: any = await this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');
        const accounts: Array<ProductModel> = [];
        results.forEach(result => accounts.push(new ProductModel(result)));
        return accounts;        
    }

    async getAccount(last4) {
        const accounts = await this.getAccounts();
        const account: ProductModel = new ProductModel(AccountManager.getAccountByLast4(accounts, last4));
        return account;
    }

    async getMovementsAccounts(account) {
        //TODO Quitar los limites de la fecha para mostrar los últimos movimientos
        // /ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos
        const results: any = await this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-10-2018`, `mock/accounts/get-movements-accounts.json`);
        const movements: Array<MovementModel> = [];
        results.forEach(result => movements.push(new MovementModel(result)));
        return movements;
    }
}
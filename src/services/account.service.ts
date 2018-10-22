import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import { ProductModel } from "../models/product.model";


export class AccountService extends RestManager {

    public getAccounts() {
        return this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');        
    }

    public getAccount(last4) {
        return this.getAccounts().then(accounts=> {
            // const account: ProductModel = new ProductModel(AccountManager.getAccountByLast4(accounts, last4));    
            const account = AccountManager.getAccountByLast4(accounts, last4);            
          
            return account;
        });
    }

    public getMovementsAccounts(account) {
        //TODO Quitar los limites de la fecha para mostrar los últimos movimientos
        // /ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos
        return this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-10-2018`, `mock/accounts/get-movements-accounts.json`);
    }
}

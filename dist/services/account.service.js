"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const account_manager_1 = require("../managers/data/account.manager");
class AccountService extends rest_manager_1.RestManager {
    getAccounts() {
        return this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');
    }
    getAccount(last4) {
        return this.getAccounts().then(accounts => {
            const account = account_manager_1.AccountManager.getAccountByLast4(accounts, last4);
            console.log("987654321 " + JSON.stringify(account));
            return account;
        });
    }
    getMovementsAccounts(account) {
        return this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-1-2018`, `mock/accounts/get-movements-accounts.json`);
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
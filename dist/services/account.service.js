"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const account_manager_1 = require("../managers/data/account.manager");
const fs = require("fs");
class AccountService extends rest_manager_1.RestManager {
    getAccounts() {
        return this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/productos', 'mock/accounts/get-accounts.json');
        // return new Promise((resolve, reject) => {
        //     const data = fs.readFileSync('mock/accounts/get-accounts.json');
        //     const jsonData = JSON.parse(data.toString());
        //     resolve(jsonData.data);
        // });        
    }
    getAccount(last4) {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/accounts/get-accounts.json');
            const jsonData = JSON.parse(data.toString());
            const account = account_manager_1.AccountManager.getAccountByLast4(jsonData.data, last4);
            resolve(account);
        });
    }
    getMovementsAccounts() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/accounts/get-movements-accounts.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
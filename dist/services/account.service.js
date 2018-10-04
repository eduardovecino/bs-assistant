"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const account_manager_1 = require("../managers/data/account.manager");
const fs = require("fs");
class AccountService extends rest_manager_1.RestManager {
    getAccounts() {
        return new Promise((resolve, reject) => {
            // const data = fs.readFileSync('mock/accounts/get-accounts.json');
            // const jsonData = JSON.parse(data.toString());
            // resolve(jsonData.data);
            const request = require('request');
            const options = {
                'method': 'GET',
                'uri': 'https://oauth.bancsabadell.com/ResourcesServerBS/oauthservices/v1.0.0/productos',
                'json': true,
                'timeout': 8000,
                'headers': {
                    'content-Type': 'application/json',
                    'Authorization': 'Bearer 7da398b8-0b10-4b85-bb81-7e7a86cc2bfe0a8db05d-83fc-4f24-9f03-e685739592e0ac0eaa97-0356-469a-ba02-e7dd74ee81dc',
                }
            };
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
                resolve(body.data);
                console.log(body.data);
            });
        });
    }
    getAccount(last4) {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/accounts/get-account.json');
            const jsonData = JSON.parse(data.toString());
            const card = account_manager_1.AccountManager.getAccountByLast4(jsonData.data, last4);
            resolve(card);
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
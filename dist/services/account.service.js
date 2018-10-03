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
            // let options: https.RequestOptions = {
            //     host: 'oauth.bancsabadell.com',
            //     path: '/ResourcesServerBS/oauthservices/v1.0.0/productos',
            //     method: 'GET',
            //     headers: {
            //         'content-Type': 'application/json',
            //         // 'accept-encoding': 'gzip, deflate',
            //         'Authorization': 'Bearer 7da398b8-0b10-4b85-bb81-7e7a86cc2bfe0a8db05d-83fc-4f24-9f03-e685739592e0ac0eaa97-0356-469a-ba02-e7dd74ee81dc',
            //     }
            // }
            // let options: https.RequestOptions = {
            //     host: 'jsonplaceholder.typicode.com',
            //     path: '/users',
            //     method: 'GET',
            //     // headers: {
            //     //     'content-Type': 'application/json',
            //     //     // 'accept-encoding': 'gzip, deflate',
            //     //     'Authorization': 'Bearer 7da398b8-0b10-4b85-bb81-7e7a86cc2bfe0a8db05d-83fc-4f24-9f03-e685739592e0ac0eaa97-0356-469a-ba02-e7dd74ee81dc',
            //     // }
            // }
            // https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
            //     let data = '';
            //     // A chunk of data has been recieved.
            //     resp.on('data', (chunk) => {
            //         data += chunk;
            //     });
            //     // The whole response has been received. Print out the result.
            //     resp.on('end', () => {
            //         resolve(JSON.parse(data).explanation)
            //     });
            // }).on("error", (err) => {
            //     console.log("Error: " + err.message);
            // });
            const request = require('request');
            const options = {
                'method': 'GET',
                'uri': 'https://oauth.bancsabadell.com/ResourcesServerBS/oauthservices/v1.0.0/productos',
                'json': true,
                'headers': {
                    'content-Type': 'application/json',
                    // 'accept-encoding': 'gzip, deflate',
                    'Authorization': 'Bearer 7da398b8-0b10-4b85-bb81-7e7a86cc2bfe0a8db05d-83fc-4f24-9f03-e685739592e0ac0eaa97-0356-469a-ba02-e7dd74ee81dc',
                }
            };
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
                resolve(body.data);
                console.log(body);
                // console.log(body.explanation);
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
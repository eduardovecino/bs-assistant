import { RestManager } from "../managers/data/rest.manager";
import { AccountManager } from "../managers/data/account.manager";

import * as fs from "fs";

const request = require('request-promise');
const host = 'https://oauth.bancsabadell.com';
const path = '/ResourcesServerBS/oauthservices/v1.0.0/productos';
const token = '7da398b8-0b10-4b85-bb81-7e7a86cc2bfe0a8db05d-83fc-4f24-9f03-e685739592e0ac0eaa97-0356-469a-ba02-e7dd74ee81dc'

export class AccountService extends RestManager {

    public getAccounts(): Promise<any> {
        return new Promise((resolve, reject) => {
                const data = fs.readFileSync('mock/accounts/get-accounts.json');
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData.data);

            // let url = host + path;

            // const options = {
            //     'method': 'GET',
            //     'uri': url,
            //     'json': true,
            //     'timeout': 8000,
            //     'headers': {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + token,
            //     }
            // };

            // request(options, (err, res, body) => {
            //     if (err) { return console.log(err); }
            //     resolve(body.data);
            //     console.log(body.data);
            // });
        });        
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
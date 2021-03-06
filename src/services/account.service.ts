import { RestManager } from "../managers/rest.manager";
import { AccountManager } from "../managers/account.manager";

import * as fs from "fs";

export class AccountService extends RestManager {

    public getAccounts(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/accounts/get-accounts.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
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
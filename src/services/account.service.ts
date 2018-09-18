import { RestManager } from "../managers/rest.manager";
import * as fs from "fs";

export class AccountService extends RestManager {

    public getAccounts(): any {
        if(this.isMock) {
            const data = fs.readFileSync('mock/accounts/get-accounts.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData.data;
        } else {
            return this.get();
        }
    }
}
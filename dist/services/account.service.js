"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/rest.manager");
const fs = require("fs");
class AccountService extends rest_manager_1.RestManager {
    getAccounts() {
        if (this.isMock) {
            const data = fs.readFileSync('mock/accounts/get-accounts.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData.data;
        }
        else {
            return this.get();
        }
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
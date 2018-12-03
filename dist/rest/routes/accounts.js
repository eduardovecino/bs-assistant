"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_service_1 = require("../../services/account.service");
class AccountRoutes {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    routes(app) {
        app.route('/accounts')
            .get((req, res) => {
            let accounts = this.accountService.getAccounts('');
            if (accounts) {
                res.status(200).send(accounts);
            }
            else {
                res.status(400).send('No se ha encontrado las tarjetas');
            }
        });
        app.route('/accounts/movements')
            .get((req, res) => {
        });
    }
}
exports.AccountRoutes = AccountRoutes;
//# sourceMappingURL=accounts.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_service_1 = require("../../services/account.service");
const account_manager_1 = require("../../managers/dialog-flow/account.manager");
class AccountRoutes {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    routes(app) {
        app.route('/accounts')
            .get((req, res) => {
            this.accountService.getAccounts().then(accounts => {
                if (accounts) {
                    const listOfAccounts = account_manager_1.AccountDFManager.generateAccountsList(accounts);
                    res.status(200).send(listOfAccounts);
                }
                else {
                    res.status(400).send('No se ha encontrado las tarjetas');
                }
            });
        });
        app.route('/accounts/movements')
            .get((req, res) => {
            this.accountService.getMovementsAccounts().then(movements => {
                if (movements) {
                    const movementsOfAccounts = account_manager_1.AccountDFManager.generateMovementsTable(movements);
                    res.status(200).send(movementsOfAccounts);
                }
                else {
                    res.status(400).send('No se ha encontrado las tarjetas');
                }
            });
        });
    }
}
exports.AccountRoutes = AccountRoutes;
//# sourceMappingURL=accounts.js.map
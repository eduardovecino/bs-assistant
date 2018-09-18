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
            // Intercalar el servicio para recuperar los datos del servidor de sabadell
            const data = this.accountService.getAccounts();
            res.status(200).send(data);
        });
    }
}
exports.AccountRoutes = AccountRoutes;
//# sourceMappingURL=accounts.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountIntents /*extends BaseIntent*/ {
    intents(app) {
        app.intent('Saldo cuenta', conv => {
            conv.ask(`Si`);
        });
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountManager {
    constructor() {
    }
    static getAccountByLast4(accounts, last4) {
        if (accounts.length === 1) {
            return accounts[0];
        }
        else if (accounts.length > 1) {
            for (let i = 0; i < accounts.length; i++) {
                const account4Numbers = accounts[i].iban.charAt(accounts[i].iban.length - 4) + accounts[i].iban.charAt(accounts[i].iban.length - 3) + accounts[i].iban.charAt(accounts[i].iban.length - 2) + accounts[i].iban.charAt(accounts[i].iban.length - 1);
                if (parseInt(last4) === parseInt(account4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                    return accounts[i];
                }
            }
        }
        return null;
    }
    static getAccountByOption(accounts, option) {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].iban == option) {
                return accounts[i];
            }
        }
        return null;
    }
}
exports.AccountManager = AccountManager;
//# sourceMappingURL=account.manager.js.map
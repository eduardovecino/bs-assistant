"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_service_1 = require("../../services/account.service");
const account_manager_1 = require("../../managers/account.manager");
class AccountIntents /*extends BaseIntent*/ {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    intents(app) {
        const nullResponse = 'No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros';
        const suggestionResponse = 'Puedes preguntame por el saldo o los movimientos de una cuenta';
        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => {
            this.accountService.getAccounts().then(accounts => {
                if (accounts) {
                    const accountsList = account_manager_1.AccountManager.generateAccountsList(accounts);
                    conv.ask(accountsList);
                    conv.ask(suggestionResponse);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //CUENTA SELECCIONADA
        app.intent('Cuenta seleccionada', (conv, input, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
                if (selectedAccount) {
                    conv.ask(`Has seleccionado la cuenta ${selectedAccount.descripcion}, el saldo es de ${selectedAccount.balance}€`);
                }
                else {
                    conv.ask(`No podemos mostrar la cuenta ${option}`);
                }
            });
        });
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers, tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                if (account) {
                    conv.ask('El saldo  de tu ' + account.descripcion + ' es de ' + account.balance + ' €');
                    conv.ask(suggestionResponse);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_service_1 = require("../../services/account.service");
const account_manager_1 = require("../../managers/data/account.manager");
const account_manager_2 = require("../../managers/dialog-flow/account.manager");
const format_manager_1 = require("../../managers/format.manager");
class AccountIntents /*extends BaseIntent*/ {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    intents(app) {
        const nullResponse = `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo o los movimientos de una cuenta`;
        const accountCloseResponse = ['Nos vemos pronto', 'Que vaya bien', 'Hasta la próxima'];
        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => {
            this.accountService.getAccounts().then(accounts => {
                let response = "Tienes " + accounts.length + " cuentas. Terminadas en:";
                if (accounts) {
                    accounts.forEach(account => {
                        response = response + format_manager_1.FormatManager.getLast4numbers(account.iban) + ", ";
                    });
                    const accountsList = account_manager_2.AccountDFManager.generateAccountsList(accounts);
                    conv.ask(response + "¿Cúal deseas seleccionar?");
                    conv.ask(accountsList);
                    // conv.ask(suggestionResponse);
                    // conv.ask(SuggestionDFManager.generateSuggestions(conv))
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //CUENTA SELECCIONADA
        app.intent('Cuenta seleccionada', (conv, input, output, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
                if (selectedAccount) {
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}, el saldo es de ${selectedAccount.balance} €. ¿Quieres saber el saldo de la cuenta?`);
                }
                else {
                    conv.ask(`No podemos mostrar la cuenta ${option}`);
                }
            });
        });
        app.intent('Cuenta seleccionada - yes', (conv, option, { last4numbers, tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                if (account) {
                    conv.ask(`El saldo  de tu ${account.descripcion} es de ${account.balance} €`);
                    conv.ask(suggestionResponse);
                    const parameters = {
                        saldo_cuenta: true,
                    };
                    conv.contexts.set('saldo_cuenta', 5, parameters);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        app.intent('Cuenta seleccionada - no', (conv, input, output) => {
            var accountCloseResponseResult = accountCloseResponse[Math.floor(Math.random() * accountCloseResponse.length)];
            conv.close(accountCloseResponseResult);
        });
        // SALDO CUENTA
        app.intent('Saldo Cuenta', (conv, option, { last4numbers, tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                if (account) {
                    conv.ask(`El saldo  de tu ${account.descripcion} es de ${account.balance} €`);
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
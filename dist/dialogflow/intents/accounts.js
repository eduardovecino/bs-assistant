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
        const AppContexts = {
            last4NumbersContext: 'si',
        };
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
        app.intent('Cuenta Seleccionada', (conv, input, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
                conv.contexts.set(AppContexts.last4NumbersContext, 1);
                if (selectedAccount) {
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}. Puedes preguntame por el saldo de la cuenta o los movimientos.`);
                }
                else {
                    conv.ask(`No podemos mostrar la cuenta ${option}`);
                }
                app.intent('Saldo cuenta - seleccionada', (conv) => {
                    const context = conv.contexts.get(AppContexts.last4NumbersContext);
                    const response = account_manager_2.AccountDFManager.saldoAccount(selectedAccount);
                    conv.ask(response);
                    // if (selectedAccount) {
                    //     conv.ask(`El saldo  de tu ${selectedAccount.descripcion} es de ${selectedAccount.balance} €`);
                    //     } else {
                    //     conv.ask(nullResponse);
                    // }
                });
                // app.intent('Movimientos - seleccionada', (conv) => {
                //     const context = conv.contexts.get(AppContexts.last4NumbersContext);
                //     const response = AccountDFManager.movementsAccount(selectedAccount);
                //     conv.ask(response);
                //     // if (selectedAccount) {
                //     //     conv.ask(`El saldo  de tu ${selectedAccount.descripcion} es de ${selectedAccount.balance} €`);
                //     //     } else {
                //     //     conv.ask(nullResponse);
                //     // }
                // });
                app.intent('Movimientos Cuentas', (conv, { last4numbers }, { tipo_cuenta }) => {
                    this.accountService.getMovementsAccounts().then(movements => {
                        if (movements) {
                            const movementsTable = account_manager_2.AccountDFManager.generateMovementsTable(movements);
                            conv.ask(`Aquí tienes los movimientos de la cuenta`);
                            conv.ask(movementsTable);
                        }
                        else {
                            conv.ask(nullResponse);
                        }
                    });
                });
            });
        });
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, input, { last4numbers }, { tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                // const response = AccountDFManager.saldoAccount(account);
                // conv.ask(response);
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
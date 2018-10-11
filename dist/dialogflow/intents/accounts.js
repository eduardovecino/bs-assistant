"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const suggestionResponse = `Puedes preguntarme por el saldo o los movimientos de una cuenta`;
        const Contexts = {
            selected_account: 'selected_account',
        };
        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => __awaiter(this, void 0, void 0, function* () {
            let accounts;
            accounts = yield this.accountService.getAccounts();
            let response = "Tienes " + accounts.length + " cuentas. Terminadas en:";
            if (accounts) {
                accounts.forEach(account => {
                    response = response + format_manager_1.FormatManager.getLast4numbers(account.iban) + ", ";
                });
                const accountsList = account_manager_2.AccountDFManager.generateAccountsList(accounts);
                conv.ask(response + "¿Cúal deseas seleccionar?");
                conv.ask(accountsList);
            }
            else {
                conv.ask(nullResponse);
            }
        }));
        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', (conv, input, option) => __awaiter(this, void 0, void 0, function* () {
            let accounts;
            accounts = yield this.accountService.getAccounts();
            const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
            conv.contexts.set(Contexts.selected_account, 5);
            if (selectedAccount) {
                conv.ask(`Has seleccionado la ${selectedAccount.descripcion}. ${suggestionResponse}`);
            }
            else {
                conv.ask(`No podemos mostrar la cuenta ${option}`);
            }
            app.intent('Saldo cuenta - seleccionada', (conv) => {
                const response = account_manager_2.AccountDFManager.saldoAccount(selectedAccount);
                conv.ask(response);
            });
            app.intent('Movimientos cuenta - seleccionada', (conv) => {
                this.accountService.getMovementsAccounts(selectedAccount.numeroProducto).then(movements => {
                    if (movements) {
                        let response = `Este mes tienes ${movements.length} movimientos: `;
                        for (let i = 0; i < 3; i++) {
                            response = response + movements[i].concepto + " con un importe de " + movements[i].importe + "€, ";
                        }
                        ;
                        const movementsTable = account_manager_2.AccountDFManager.generateMovementsTable(movements);
                        conv.ask(response);
                        conv.ask(movementsTable);
                    }
                    else {
                        conv.ask(nullResponse);
                    }
                });
            });
            app.intent('ayuda - cuentas', (conv) => {
                conv.ask(suggestionResponse);
            });
        }));
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers }, { tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                const response = account_manager_2.AccountDFManager.saldoAccount(account);
                conv.ask(response);
            });
        });
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', (conv, { last4numbers }, { tipo_cuenta }) => {
            // this.accountService.getAccount(last4numbers).then(account => {
            //     const response = AccountDFManager.movementsAccount(account);
            //     conv.ask(response);
            // });
            // this.accountService.getMovementsAccounts().then(movements => {
            //     if (movements) {
            //         const movementsTable = AccountDFManager.generateMovementsTable(movements);
            //         conv.ask(`Aquí tienes los movimientos de la cuenta`);
            //         conv.ask(movementsTable);
            //     } else {
            //         conv.ask(nullResponse);
            //     }
            // });
        });
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
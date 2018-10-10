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
class AccountIntents /*extends BaseIntent*/ {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    intents(app) {
        const nullResponse = `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo o los movimientos de una cuenta`;
        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => __awaiter(this, void 0, void 0, function* () {
            let accounts;
            accounts = yield this.accountService.getAccounts(); /*.then(accounts => {*/
            if (accounts) {
                const accountsList = account_manager_2.AccountDFManager.generateAccountsList(accounts);
                conv.ask(`Tus cuentas son `);
                conv.ask(accountsList);
                // conv.ask(suggestionResponse);
                // conv.ask(SuggestionDFManager.generateSuggestions(conv))
            }
            else {
                conv.ask(nullResponse);
            }
            // }, error => {
            //     conv.ask("errrorrrr");
            // });
        }));
        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', (conv, input, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
                if (selectedAccount) {
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}, el saldo es de ${selectedAccount.balance} €`);
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
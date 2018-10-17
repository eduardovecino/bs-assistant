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
const suggestion_manager_1 = require("../../managers/dialog-flow/suggestion.manager");
const format_manager_1 = require("../../managers/format.manager");
const translate_manager_1 = require("../../managers/translate.manager");
class AccountIntents /*extends BaseIntent*/ {
    constructor() {
        this.accountService = new account_service_1.AccountService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        const nullResponse = 'No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros';
        // const nullResponse = this.translateManager.translate('intent.account.null_response');
        // const suggestionResponse = 'Puedes preguntarme por el saldo o los movimientos de una cuenta';
        let suggestionResponse = this.translateManager.translate('intent.account.suggestion_response');
        const Contexts = {
            selected_account: 'selected_account',
            selected_card: 'selected_card'
        };
        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => __awaiter(this, void 0, void 0, function* () {
            let accounts;
            accounts = yield this.accountService.getAccounts();
            // let response = "Tienes " + accounts.length + " cuentas. Terminadas en: ";
            let response = this.translateManager.translate('intent.account.account_list_%number%', accounts.length);
            conv.contexts.delete(Contexts.selected_card);
            if (accounts) {
                accounts.forEach(account => {
                    response = response + format_manager_1.FormatManager.getLast4numbers(account.iban) + ", ";
                });
                const accountsList = account_manager_2.AccountDFManager.generateAccountsList(accounts);
                // conv.ask(response + '¿Cúal deseas seleccionar ?');
                conv.ask(response + this.translateManager.translate('intent.account.account_list.answer_which_one'));
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
                conv.ask(suggestion_manager_1.SuggestionDFManager.generateAccountSuggestions());
            }
            else {
                conv.ask(`No podemos mostrar la cuenta ${option}`);
            }
            // SALDO CUENTA SELECCIONADA
            app.intent('Saldo cuenta - seleccionada', (conv) => {
                const response = account_manager_2.AccountDFManager.saldoAccount(selectedAccount);
                conv.ask(response);
            });
            // MOVIMIENTOS CUENTA SELECCIONADA
            app.intent('Movimientos cuenta - seleccionada', (conv) => __awaiter(this, void 0, void 0, function* () {
                let movements;
                movements = yield this.accountService.getMovementsAccounts(selectedAccount.numeroProducto);
                const response = account_manager_2.AccountDFManager.movementsAccount(movements);
                conv.ask(response[0]);
                conv.ask(response[1]);
            }));
            // AYUDA CUENTAS
            app.intent('ayuda - cuentas', (conv) => {
                conv.ask(suggestionResponse);
                conv.ask(suggestion_manager_1.SuggestionDFManager.generateAccountSuggestions());
            });
        }));
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers }, { tipo_cuenta }) => __awaiter(this, void 0, void 0, function* () {
            let account;
            account = yield this.accountService.getAccount(last4numbers);
            if (account) {
                const response = account_manager_2.AccountDFManager.saldoAccount(account);
                conv.ask(response);
            }
            else {
                conv.ask(nullResponse);
            }
        }));
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', (conv, { last4numbers }, { tipo_cuenta }) => __awaiter(this, void 0, void 0, function* () {
            let movements;
            let account;
            account = yield this.accountService.getAccount(last4numbers);
            if (account) {
                movements = yield this.accountService.getMovementsAccounts(account.numeroProducto);
                const response = account_manager_2.AccountDFManager.movementsAccount(movements);
                conv.ask(response[0]);
                conv.ask(response[1]);
            }
            else {
                conv.ask(nullResponse);
            }
        }));
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
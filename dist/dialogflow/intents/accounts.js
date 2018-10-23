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
const translate_manager_1 = require("../../managers/translate.manager");
class AccountIntents {
    constructor() {
        this.accountService = new account_service_1.AccountService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        const Contexts = {
            selected_account: 'selected_account',
            selected_card: 'selected_card'
        };
        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => __awaiter(this, void 0, void 0, function* () {
            let accounts = yield this.accountService.getAccounts();
            conv.contexts.delete(Contexts.selected_card);
            if (accounts) {
                const accountsSimpleResponse = account_manager_2.AccountDFManager.generateAccountsSimpleResponse(accounts);
                const accountsList = account_manager_2.AccountDFManager.generateAccountsList(accounts);
                conv.ask(accountsSimpleResponse);
                conv.ask(accountsList);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', (conv, input, option) => __awaiter(this, void 0, void 0, function* () {
            let accounts = yield this.accountService.getAccounts();
            const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
            conv.contexts.set(Contexts.selected_account, 5);
            if (selectedAccount) {
                const response = account_manager_2.AccountDFManager.generateSelectedAccountSimpleResponse(selectedAccount);
                conv.ask(response + this.translateManager.translate('intent.account.help'));
                conv.ask(suggestion_manager_1.SuggestionDFManager.generateAccountSuggestions());
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.selected_account.failure_%account%', option));
            }
            // SALDO CUENTA SELECCIONADA
            app.intent('Saldo cuenta - seleccionada', (conv) => {
                this.accountBalance(selectedAccount, conv);
            });
            // MOVIMIENTOS CUENTA SELECCIONADA
            app.intent('Movimientos cuenta - seleccionada', (conv) => __awaiter(this, void 0, void 0, function* () {
                let movements = yield this.accountService.getMovementsAccounts(selectedAccount.productNumber);
                this.accountMovements(selectedAccount, movements, conv);
            }));
            // AYUDA CUENTAS
            app.intent('ayuda - cuentas', (conv) => {
                conv.ask(this.translateManager.translate('intent.account.help'));
                conv.ask(suggestion_manager_1.SuggestionDFManager.generateAccountSuggestions());
            });
        }));
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers }, { tipo_cuenta }) => __awaiter(this, void 0, void 0, function* () {
            let account = yield this.accountService.getAccount(last4numbers);
            if (account) {
                this.accountBalance(account, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', (conv, { last4numbers }, { tipo_cuenta }) => __awaiter(this, void 0, void 0, function* () {
            let account = yield this.accountService.getAccount(last4numbers);
            let movements = yield this.accountService.getMovementsAccounts(account.productNumber);
            if (account) {
                this.accountMovements(account, movements, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
    }
    accountMovements(account, movements, conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountMovementsSimpleResponse = account_manager_2.AccountDFManager.generateMovementsAccountSimpleResponse(movements);
            const accountMovementsTable = account_manager_2.AccountDFManager.generateMovementsAccountTable(movements);
            conv.ask(accountMovementsSimpleResponse);
            conv.ask(accountMovementsTable);
        });
    }
    accountBalance(account, conv) {
        const response = account_manager_2.AccountDFManager.generateBalanceAccountResponse(account);
        conv.ask(response);
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
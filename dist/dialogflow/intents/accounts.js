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
            let accounts = yield this.accountService.getAccounts(conv.user.access.token);
            conv.contexts.delete(Contexts.selected_card);
            if (accounts) {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const accountsSimpleResponseScreen = account_manager_2.AccountDFManager.generateAccountsSimpleResponseScreen(accounts);
                    const accountsList = account_manager_2.AccountDFManager.generateAccountsList(accounts);
                    conv.ask(accountsSimpleResponseScreen);
                    conv.ask(accountsList);
                }
                else {
                    const accountsSimpleResponseNoScreen = account_manager_2.AccountDFManager.generateAccountsSimpleResponseNoScreen(accounts);
                    conv.ask(accountsSimpleResponseNoScreen);
                }
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', (conv, input, option) => __awaiter(this, void 0, void 0, function* () {
            let accounts = yield this.accountService.getAccounts(conv.user.access.token);
            const selectedAccount = account_manager_1.AccountManager.getAccountByOption(accounts, option);
            conv.contexts.set(Contexts.selected_account, 5);
            if (selectedAccount) {
                const response = account_manager_2.AccountDFManager.generateSelectedAccountSimpleResponse(selectedAccount);
                conv.ask(response);
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
                let movements = yield this.accountService.getMovementsAccounts(selectedAccount.productNumber, conv.user.access.token);
                this.accountMovements(movements, conv);
            }));
            // AYUDA CUENTAS
            app.intent('ayuda - cuentas', (conv) => {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const accountHelpSimpleResponseScreen = account_manager_2.AccountDFManager.generateAccountHelpSimpleResponseScreen();
                    conv.ask(accountHelpSimpleResponseScreen);
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateAccountSuggestions());
                }
                else {
                    const accountHelpSimpleResponseNoScreen = account_manager_2.AccountDFManager.generateAccountHelpSimpleResponseNoScreen();
                    conv.ask(accountHelpSimpleResponseNoScreen);
                }
            });
        }));
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers }, { tipo_cuenta }) => __awaiter(this, void 0, void 0, function* () {
            let account = yield this.accountService.getAccount(last4numbers, conv.user.access.token);
            if (account) {
                console.log("PTG SALDO CUENTA IF");
                this.accountBalance(account, conv);
            }
            else {
                console.log("PTG SALDO CUENTA ELSE");
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', (conv, { last4numbers }, { tipo_cuenta }) => __awaiter(this, void 0, void 0, function* () {
            let account = yield this.accountService.getAccount(last4numbers, conv.user.access.token);
            let movements = yield this.accountService.getMovementsAccounts(account.productNumber, conv.user.access.token);
            if (account) {
                this.accountMovements(movements, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
    }
    accountMovements(movements, conv) {
        if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
            if (movements.length > 1) {
                const accountMovementsTable = account_manager_2.AccountDFManager.generateMovementsAccountTable(movements);
                const accountMovementsTableSimpleResponse = account_manager_2.AccountDFManager.generateMovementsAccountTableSimpleResponse(movements);
                conv.ask(accountMovementsTableSimpleResponse);
                conv.ask(accountMovementsTable);
            }
            else {
                const accountMovementsSimpleResponse = account_manager_2.AccountDFManager.generateMovementsAccountSimpleResponse(movements);
                conv.ask(accountMovementsSimpleResponse);
            }
        }
        else {
            const accountMovementsSimpleResponse = account_manager_2.AccountDFManager.generateMovementsAccountSimpleResponse(movements);
            conv.ask(accountMovementsSimpleResponse);
        }
    }
    accountBalance(account, conv) {
        const response = account_manager_2.AccountDFManager.generateBalanceAccountResponse(account);
        conv.ask(response);
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
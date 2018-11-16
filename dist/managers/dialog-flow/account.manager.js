"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("../translate.manager");
const ssml_gib_1 = require("ssml-gib");
class AccountDFManager {
    static generateAccountsSimpleResponseScreen(accounts) {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.simple_response.screen_%number%', [accounts.length])]);
    }
    static generateAccountsSimpleResponseNoScreen(accounts) {
        let response = ' ';
        accounts.forEach(account => {
            response = response + account.last4Numbers + ", ";
        });
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.simple_response.no_screen_%number%_%accounts%', [accounts.length, response])]);
    }
    static generateAccountsList(accounts) {
        if (accounts.length > 1) {
            const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
            const tmp = {
                title: this.translateManager.translate('intent.account.list.title'),
                items: {}
            };
            accounts.forEach((account) => {
                tmp.items[account.iban] = {
                    title: `ES••••••••••••••••${account.last4Numbers}`,
                    description: account.description,
                    image: {
                        url: accountImage,
                        accessibilityText: account.description
                    }
                };
            });
            return (new actions_on_google_1.List(tmp));
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.balance_%account%_%balance%', [accounts[0].description, accounts[0].balance])]);
        }
    }
    static generateSelectedAccountSimpleResponse(account) {
        if (account) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.selected_account_%account%', [account.description])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.null_response')]);
        }
    }
    static generateBalanceAccountResponse(account) {
        if (account) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.balance_%account%_%balance%', [account.description, account.balance])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.null_response')]);
        }
    }
    static generateMovementsAccountSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.simple_response.pre_%concept%_%import%', [movements[i].concept, movements[i].amount])]);
            }
            ;
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.simple_response_%number%_%movements%', [movements.length, response])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.no_movements')]);
        }
    }
    static generateMovementsAccountTableSimpleResponse(movements) {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.table.simple_response_%number%', [movements.length])]);
    }
    static generateMovementsAccountTable(movements) {
        const tmp = {
            dividers: true,
            columns: [this.translateManager.translate('intent.account.movements.table.column.first'), this.translateManager.translate('intent.account.movements.table.column.second'), this.translateManager.translate('intent.account.movements.table.column.third')],
            rows: []
        };
        movements.forEach((movement) => {
            tmp.rows.push({
                cells: [movement.concept, movement.operationDate, movement.amount + ' €'],
                dividerAfter: true
            });
        });
        return new actions_on_google_1.Table(tmp);
    }
    static generateAccountHelpSimpleResponseScreen() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.help.screen')]);
    }
    static generateAccountHelpSimpleResponseNoScreen() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.help.no_screen')]);
    }
}
AccountDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.AccountDFManager = AccountDFManager;
//# sourceMappingURL=account.manager.js.map
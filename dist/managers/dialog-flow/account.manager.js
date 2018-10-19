"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const format_manager_1 = require("../../managers/format.manager");
const translate_manager_1 = require("../translate.manager");
class AccountDFManager {
    static generateAccountsSimpleResponse(accounts) {
        let response = ' ';
        accounts.forEach(account => {
            response = response + format_manager_1.FormatManager.getLast4numbers(account.iban) + ", ";
        });
        return this.translateManager.translate('intent.account.simple_response_%number%_%accounts%', [accounts.length, response]);
    }
    static generateAccountsList(accounts) {
        if (accounts.length > 1) {
            const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
            const tmp = {
                title: this.translateManager.translate('intent.account.list.title'),
                items: {}
            };
            accounts.forEach((account) => {
                const last4Numbers = format_manager_1.FormatManager.getLast4numbers(account.iban);
                tmp.items[account.iban] = {
                    title: account.descripcion,
                    description: `ES••••••••••••••••${last4Numbers}`,
                    image: {
                        url: accountImage,
                        accessibilityText: account.descripcion
                    }
                };
            });
            return (new actions_on_google_1.List(tmp));
        }
        else {
            return this.translateManager.translate('intent.account.balance_%account%_%balance%', [accounts[0].descripcion, accounts[0].balance]);
        }
    }
    static selectedAccount(account) {
        if (account) {
            return this.translateManager.translate('intent.account.selected_account_%account%', [account.descripcion]);
        }
        else {
            return this.translateManager.translate('intent.account.null_response');
        }
    }
    static saldoAccount(account) {
        if (account) {
            return this.translateManager.translate('intent.account.balance_%account%_%balance%', [account.descripcion, account.balance]);
        }
        else {
            return this.translateManager.translate('intent.account.null_response');
        }
    }
    static generateMovementsAccountSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length + 1;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + this.translateManager.translate('intent.account.movements.simple_response.pre_%concept%_%import%', [movements[i].concepto, movements[i].importe]);
            }
            ;
            return this.translateManager.translate('intent.account.movements.simple_response_%number%_%movements%', [movements.length, response]);
        }
        else {
            return this.translateManager.translate('intent.account.movements.no_movements');
        }
    }
    static generateMovementsAccountTable(movements) {
        const tmp = {
            dividers: true,
            columns: [this.translateManager.translate('intent.account.movements.table.column.first'), this.translateManager.translate('intent.account.movements.table.column.second'), this.translateManager.translate('intent.account.movements.table.column.third')],
            rows: []
        };
        movements.forEach((movement) => {
            tmp.rows.push({
                cells: [movement.concepto, movement.fechaOperacion, movement.importe],
                dividerAfter: true
            });
        });
        return new actions_on_google_1.Table(tmp);
    }
}
AccountDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.AccountDFManager = AccountDFManager;
//# sourceMappingURL=account.manager.js.map
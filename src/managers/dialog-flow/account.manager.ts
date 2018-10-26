import { List, Table, TableOptions } from "actions-on-google";
import { TranslateManager } from "../translate.manager";
import { Ssml } from 'ssml-gib';


export class AccountDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generateAccountsSimpleResponseScreen(accounts) {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.simple_response.screen_%number%', [accounts.length])]);
    }

    public static generateAccountsSimpleResponseNoScreen(accounts) {
        let response = ' ';
        accounts.forEach(account => {
            response = response + account.last4Numbers + ", ";
        });
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.simple_response.no_screen_%number%_%accounts%', [accounts.length, response])]);
    }
    
    public static generateAccountsList(accounts) {
        if (accounts.length > 1) {
            const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
            const tmp = {
                title: this.translateManager.translate('intent.account.list.title'),
                items: {}
            };
            accounts.forEach((account) => {
                tmp.items[account.iban] = {
                    title: account.description,
                    description: `ES••••••••••••••••${account.last4Numbers}`,
                    image: {
                        url: accountImage,
                        accessibilityText: account.description
                    }
                };
            });
            return (new List(tmp));
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.balance_%account%_%balance%', [accounts[0].description, accounts[0].balance])]);
        }
    }

    public static generateSelectedAccountSimpleResponse(account) {
        if (account) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.selected_account_%account%', [account.description])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.null_response')]);
        }
    }

    public static generateBalanceAccountResponse(account) {
        if (account) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.balance_%account%_%balance%', [account.description, account.balance])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.null_response')]);
        }
    }

    public static generateMovementsAccountSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.simple_response.pre_%concept%_%import%', [movements[i].concept, movements[i].amount])])
            };
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.simple_response_%number%_%movements%', [movements.length, response])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.no_movements')]);
        }
    }
    public static generateMovementsAccountTableSimpleResponse(movements) {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.movements.table.simple_response_%number%', [movements.length])]);
    }

    public static generateMovementsAccountTable(movements) {
        const tmp: TableOptions = {
            dividers: true,
            columns: [this.translateManager.translate('intent.account.movements.table.column.first'), this.translateManager.translate('intent.account.movements.table.column.second'), this.translateManager.translate('intent.account.movements.table.column.third')],
            rows: []
        };
        movements.forEach((movement) => {
            tmp.rows.push(
                {
                    cells: [movement.concept, movement.operationDate, movement.amount + ' €'],
                    dividerAfter: true
                }
            );
        });
        return new Table(tmp);
    }

    public static generateAccountHelpSimpleResponseScreen() {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.help.screen')]);
    }

    public static generateAccountHelpSimpleResponseNoScreen() {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.account.help.no_screen')]);
    }
}

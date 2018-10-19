import { List, Table, TableOptions } from "actions-on-google";
import { FormatManager } from '../../managers/format.manager';
import { TranslateManager } from "../translate.manager";


export class AccountDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generateAccountsSimpleResponse(accounts) {
        let response= ' ';
        accounts.forEach(account => {
            response = response + FormatManager.getLast4numbers(account.iban) + ", ";
        });
        return this.translateManager.translate('intent.account.simple_response_%number%_%accounts%', [accounts.length,response]);
    }
    
    public static generateAccountsList(accounts) {
        if (accounts.length > 1) {
            const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
            const tmp = {
                title: this.translateManager.translate('intent.account.list.title'),
                items: {}
            };
            accounts.forEach((account) => {
                const last4Numbers = FormatManager.getLast4numbers(account.iban);
                tmp.items[account.iban] = {
                    title: account.descripcion,
                    description: `ES••••••••••••••••${last4Numbers}`,
                    image: {
                        url: accountImage,
                        accessibilityText: account.descripcion
                    }
                };
            });
            return (new List(tmp));
        } else {
            return this.translateManager.translate('intent.account.balance_%account%_%balance%', [accounts[0].descripcion, accounts[0].balance]);
        }
    }

    public static selectedAccount(account) {
        if (account) {
            return this.translateManager.translate('intent.account.selected_account_%account%', [account.descripcion]);
        } else {
            return this.translateManager.translate('intent.account.null_response');
        }
    }

    public static saldoAccount(account) {
        if (account) {
            return this.translateManager.translate('intent.account.balance_%account%_%balance%', [account.descripcion, account.balance]);
        } else {
            return this.translateManager.translate('intent.account.null_response');
        }
    }

    public static generateMovementsAccountSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length + 1;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + this.translateManager.translate('intent.account.movements.simple_response.pre_%concept%_%import%', [movements[i].concepto, movements[i].importe])
            };
            return this.translateManager.translate('intent.account.movements.simple_response_%number%_%movements%', [movements.length, response]);
        } else {
            return this.translateManager.translate('intent.account.movements.no_movements');
        }
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
                    cells: [movement.concepto, movement.fechaOperacion, movement.importe],
                    dividerAfter: true
                }
            );
        });
        return new Table(tmp);
    }
}

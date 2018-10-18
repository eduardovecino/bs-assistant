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
                title: 'Mis Cuentas' + ' ',
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
            return 'El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance + ' €';
        }
    }

    public static saldoAccount(account) {
        if (account) {
            return `El saldo  de tu ${account.descripcion} es de ${account.balance} €. ¿Qué más quieres saber acerca de tu cuenta?`;
        } else {
            return this.translateManager.translate('intent.account.null_response');
        }
    }

    public static movementsAccount(movements) {
        if (movements) {
            let response = `Este mes tienes ${movements.length} movimientos: `;
            for (let i = 0; i < 3; i++) {
                response = response + movements[i].concepto + " con un importe de " + movements[i].importe + "€, ";
            };
            response = response + "¿Qué más quieres saber acerca de tu cuenta?"
            const movementsTable = this.generateMovementsTable(movements);
            return [response, movementsTable];
        } else {
            return [`No hay movimientos recientes en esta cuenta`, ` `]
        }
    }

    public static generateMovementsTable(movements) {
        const tmp: TableOptions = {
            dividers: true,
            columns: ['Concepto', 'Fecha', 'Importe'],
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

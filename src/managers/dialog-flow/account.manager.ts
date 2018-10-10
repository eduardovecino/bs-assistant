import { List, Table, TableOptions } from "actions-on-google";
import { FormatManager } from '../../managers/format.manager';


export class AccountDFManager {



    constructor() {
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
            return `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`
        }
    }

    // public static movementsAccount(account) {
    //     if(){

    //     }
    // }

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

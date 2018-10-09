"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const format_manager_1 = require("../../managers/format.manager");
class AccountDFManager {
    constructor() {
    }
    static generateAccountsList(accounts) {
        if (accounts.length > 1) {
            const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
            const tmp = {
                title: 'Mis Cuentas' + ' ',
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
            return 'El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance + ' €';
        }
    }
    static saldoAccount(account) {
        if (account) {
            return `El saldo  de tu ${account.descripcion} es de ${account.balance} €`;
        }
        else {
            return `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`;
        }
    }
    static generateMovementsTable(movement) {
        const tmp = {
            dividers: true,
            columns: ['Concepto', 'Fecha', 'Importe'],
            rows: []
        };
        movement.forEach((movement) => {
            tmp.rows.push({
                cells: [movement.concepto, movement.fecha, movement.importe],
                dividerAfter: true
            });
        });
        return new actions_on_google_1.Table(tmp);
    }
}
exports.AccountDFManager = AccountDFManager;
//# sourceMappingURL=account.manager.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const format_manager_1 = require("../../managers/format.manager");
const translate_manager_1 = require("../translate.manager");
class AccountDFManager {
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
            return `El saldo  de tu ${account.descripcion} es de ${account.balance} €. ¿Qué más quieres saber acerca de tu cuenta?`;
        }
        else {
            return this.translateManager.translate('intent.account.null_response');
        }
    }
    static movementsAccount(movements) {
        if (movements) {
            let response = `Este mes tienes ${movements.length} movimientos: `;
            for (let i = 0; i < 3; i++) {
                response = response + movements[i].concepto + " con un importe de " + movements[i].importe + "€, ";
            }
            ;
            response = response + "¿Qué más quieres saber acerca de tu cuenta?";
            const movementsTable = this.generateMovementsTable(movements);
            return [response, movementsTable];
        }
        else {
            return [`No hay movimientos recientes en esta cuenta`, ` `];
        }
    }
    static generateMovementsTable(movements) {
        const tmp = {
            dividers: true,
            columns: ['Concepto', 'Fecha', 'Importe'],
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
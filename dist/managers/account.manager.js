"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
class AccountManager {
    constructor() {
    }
    static getAccountByLast4(accounts, last4) {
        if (accounts.length === 1) {
            return accounts[0];
        }
        else if (accounts.length > 1) {
            for (let i = 0; i < accounts.length; i++) {
                const account4Numbers = accounts[i].iban.charAt(accounts[i].iban.length - 4) + accounts[i].iban.charAt(accounts[i].iban.length - 3) + accounts[i].iban.charAt(accounts[i].iban.length - 2) + accounts[i].iban.charAt(accounts[i].iban.length - 1);
                if (parseInt(last4) === parseInt(account4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                    return accounts[i];
                }
            }
        }
        return null;
    }
    static generateAccountsList(accounts) {
        if (accounts.length > 1) {
            const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
            const tmp = {
                title: 'Mis Cuentas' + ' ',
                items: {}
            };
            // var voice = 'Tus cuentas son' + ' ';
            accounts.forEach((account) => {
                // voice = voice + ' ' + account.descripcion + ',';
                tmp.items[account.iban] = {
                    title: account.descripcion,
                    description: account.iban,
                    image: {
                        url: accountImage,
                        accessibilityText: account.descripcion
                    }
                };
            });
            return new actions_on_google_1.List(tmp);
        }
        else {
            return 'El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance + ' €';
        }
    }
    static accountSelect(accounts, option) {
        // accounts.forEach((account) => {
        //     if (parseInt(account.iban) === parseInt(option)) {
        //         return ('Has seleccionado la cuenta ' + account.descripcion + ', el saldo es de' + account.balance + ' €');
        //     } else {
        //         return (' No podemos mostrar la cuenta' + account.iban);
        //     }
        // })
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].iban === option) {
                return ('Has seleccionado la cuenta ' + accounts[i].descripcion + ', el saldo es de' + accounts[i].balance + ' €');
            }
            else {
                return (' No podemos mostrar la cuenta' + option);
            }
        }
    }
}
exports.AccountManager = AccountManager;
//# sourceMappingURL=account.manager.js.map
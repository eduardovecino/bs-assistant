"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
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
}
exports.AccountDFManager = AccountDFManager;
//# sourceMappingURL=account.manager.js.map
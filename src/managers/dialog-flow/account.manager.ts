import { List } from "actions-on-google";

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
            return new List(tmp);
        } else {
            return 'El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance + ' €';
        }
    }
}
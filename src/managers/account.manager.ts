import { List } from "actions-on-google";

export class AccountManager {
    


    constructor() {
    }


    public static getAccountByLast4(accounts, last4): any {
        if (accounts.length === 1) {
            return accounts[0];
        } else if (accounts.length > 1){
            for (let i = 0; i < accounts.length; i++) {
                const account4Numbers = accounts[i].iban.charAt(accounts[i].iban.length - 4) + accounts[i].iban.charAt(accounts[i].iban.length - 3) + accounts[i].iban.charAt(accounts[i].iban.length - 2) + accounts[i].iban.charAt(accounts[i].iban.length - 1);
                if (parseInt(last4) === parseInt(account4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                    return accounts[i];
                }
            }
        }
        return null;
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
                    descripcion: account.iban,
                    image: {
                        url: accountImage,
                        accessibilityText: account.descripcion
                    }
                };
            });
            return new List(tmp);
        } else {
            return 'El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance +' €';
        }
        
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const account_service_1 = require("../../services/account.service");
class AccountIntents /*extends BaseIntent*/ {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    intents(app) {
        const accountImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Recibo_de_pago_-_modelo_simple.svg/300px-Recibo_de_pago_-_modelo_simple.svg.png';
        const accounts = this.accountService.getAccounts();
        //Lista cuentas
        app.intent('Cuentas', (conv) => {
            if (accounts.length > 1) {
                var voice = 'Tus cuentas son' + ' ';
                const tmp = {
                    title: 'Mis Cuentas' + ' ',
                    items: {}
                };
                accounts.forEach((account) => {
                    voice = voice + ' ' + account.descripcion + ',';
                    tmp.items[account.iban] = {
                        title: account.descripcion,
                        descripcion: account.iban,
                        image: {
                            url: accountImage,
                            accessibilityText: account.descripcion
                        }
                    };
                });
                conv.ask(new actions_on_google_1.List(tmp));
                conv.ask(voice);
                conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
            }
            else {
                conv.ask('Dispones de la cuenta ' + accounts[0].descripcion + ' ');
                conv.ask('Puedes obtener el saldo de la cuenta o el listado de movimientos');
                conv.ask(new actions_on_google_1.BasicCard({
                    title: 'Abrir App',
                    image: {
                        url: accountImage,
                        accessibilityText: 'Abrir APP'
                    },
                    text: '',
                    buttons: new actions_on_google_1.Button({
                        title: 'Abrir APP',
                        url: 'http://eduvecino.com/GA_BMA/app_saba.php',
                    })
                }));
            }
        });
        //Detalle cuenta seleccionada
        app.intent('Cuenta seleccionada', (conv, input, option) => {
            accounts.forEach((account) => {
                if (account.iban === option) {
                    conv.ask('Has seleccionado la cuenta ' + account.descripcion + ' ');
                    conv.ask('Puedes obtener el saldo de la cuenta o el listado de movimientos');
                    conv.ask(new actions_on_google_1.BasicCard({
                        title: 'Abrir App',
                        image: {
                            url: accountImage,
                            accessibilityText: 'Abrir APP'
                        },
                        text: '',
                        buttons: new actions_on_google_1.Button({
                            title: 'Abrir APP',
                            url: 'http://eduvecino.com/GA_BMA/app_saba.php',
                        })
                    }));
                }
            });
        });
        // Saldo cuenta
        app.intent('Saldo cuenta', (conv, { last4numbers }) => {
            // accounts.forEach((account) => {
            // const iban4Numbers = account.iban.charAt(account.iban.length - 3)+account.iban.charAt(account.iban.length -2)+account.iban.charAt(account.iban.length-1)+account.iban.charAt(account.iban.length)
            const iban4Numbers = accounts[1].iban.charAt(accounts[1].iban.length - 4) + accounts[1].iban.charAt(accounts[1].iban.length - 3) + accounts[1].iban.charAt(accounts[1].iban.length - 2) + accounts[1].iban.charAt(accounts[1].iban.length - 1);
            // if (last4numbers) {
            // conv.ask(iban4Numbers + ' ' + last4numbers);
            conv.ask(iban4Numbers + last4numbers);
            // conv.ask('El saldo  de la ' + account.descripcion + ' es de ' + account.balance);
            //  }
            // });
        });
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
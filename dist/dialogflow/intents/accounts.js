"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const account_service_1 = require("../../services/account.service");
class AccountIntents /*extends BaseIntent*/ {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    intents(app) {
        const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
        const accounts = this.accountService.getAccounts();
        //LISTA CUENTAS
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
                conv.ask('El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance + ' €');
            }
        });
        //CUENTA SELECCIONADA
        app.intent('Cuenta seleccionada', (conv, input, option) => {
            accounts.forEach((account) => {
                if (account.iban === option) {
                    conv.ask('Has seleccionado la cuenta ' + account.descripcion + ', el saldo es de' + accounts[0].balance + ' €');
                    conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
                }
            });
        });
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers, tipo_cuenta }) => {
            if (accounts.length === 1) {
                conv.ask('El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance + ' €');
            }
            else {
                for (let i = 0; i < accounts.length; i++) {
                    const iban4Numbers = accounts[i].iban.charAt(accounts[i].iban.length - 4) + accounts[i].iban.charAt(accounts[i].iban.length - 3) + accounts[i].iban.charAt(accounts[i].iban.length - 2) + accounts[i].iban.charAt(accounts[i].iban.length - 1);
                    if (parseInt(last4numbers) === parseInt(iban4Numbers) || tipo_cuenta === accounts[i].descripcion) {
                        conv.ask('El saldo  de tu ' + accounts[i].descripcion + ' es de ' + accounts[i].balance + ' €');
                        break;
                    }
                    else if (accounts.length - 1 === i) {
                        conv.ask('No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros' + tipo_cuenta);
                    }
                }
            }
        });
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
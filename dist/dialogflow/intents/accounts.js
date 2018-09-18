"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
class AccountIntents /*extends BaseIntent*/ {
    intents(app) {
        const accountImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Recibo_de_pago_-_modelo_simple.svg/300px-Recibo_de_pago_-_modelo_simple.svg.png';
        let accounts = 
        //Lista cuentas
        app.intent('Cuentas', (conv) => {
            var voice = 'Tus cuentas son' + ' ';
            const tmp = {
                title: 'Mis Cuentas' + ' ',
                items: {}
            };
            accounts.forEach((account) => {
                voice = voice + ' ' + account.description + ',';
                tmp.items[account.description] = {
                    title: account.description,
                    description: account.iban,
                    image: {
                        url: accountImage,
                        accessibilityText: account.description
                    }
                };
            });
            conv.ask(new actions_on_google_1.List(tmp));
            conv.ask(voice);
            conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
        });
    }
}
exports.AccountIntents = AccountIntents;
//# sourceMappingURL=accounts.js.map
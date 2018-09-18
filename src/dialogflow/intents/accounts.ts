import { List, BasicCard, Button } from "actions-on-google";
import { AccountService } from "../../services/account.service";



export class AccountIntents /*extends BaseIntent*/ {

    private accountService: AccountService = new AccountService();

    public intents(app): void {

        const accountImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Recibo_de_pago_-_modelo_simple.svg/300px-Recibo_de_pago_-_modelo_simple.svg.png';
        const accounts = this.accountService.getAccounts();

        //Lista cuentas
        app.intent('Cuentas', (conv) => {
            conv.ask('blablabla' + accounts.length);
            // if (accounts.length > 1) {
            //     var voice = 'Tus cuentas son' + ' ';
            //     const tmp = {
            //         title: 'Mis Cuentas' + ' ',
            //         items: {}
            //     };
            //     accounts.forEach((account) => {
            //         voice = voice + ' ' + account.description + ',';
            //         tmp.items[account.iban] = {
            //             title: account.description,
            //             description: account.iban,
            //             image: {
            //                 url: accountImage,
            //                 accessibilityText: account.description
            //             }
            //         };
            //     });
            //     conv.ask(new List(tmp));
            //     conv.ask(voice);
            //     conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
            // } else {
            //     conv.ask('Dispones de la cuenta ' + accounts[0].description + ' ');
            //     conv.ask('Puedes obtener el saldo de la cuenta o el listado de movimientos');
            //     conv.ask(new BasicCard({
            //         title: 'Abrir App',
            //         image: {
            //             url: accountImage,
            //             accessibilityText: 'Abrir APP'
            //         },
            //         text: '',
            //         buttons: new Button({
            //             title: 'Abrir APP',
            //             url: 'http://eduvecino.com/GA_BMA/app_saba.php',
            //         })
            //     })
            //     );
            // }
        });

        //Detalle cuenta seleccionada
        app.intent('Cuenta seleccionada', (conv, input, option) => {
            accounts.forEach((account) => {
                if (account.iban === option) {
                    conv.ask('Has seleccionado la cuenta ' + account.description + ' ');
                    conv.ask('Puedes obtener el saldo de la cuenta o el listado de movimientos');
                    conv.ask(new BasicCard({
                        title: 'Abrir App',
                        image: {
                            url: accountImage,
                            accessibilityText: 'Abrir APP'
                        },
                        text: '',
                        buttons: new Button({
                            title: 'Abrir APP',
                            url: 'http://eduvecino.com/GA_BMA/app_saba.php',
                        })
                    })
                    );
                }
            });
        });

        // Saldo cuenta
        app.intent('Saldo cuenta', (conv, { tipo_cuenta }) => {
            accounts.forEach((account) => {
                if (account.iban === tipo_cuenta) {
                    conv.ask('El saldo  de la cuenta ' + account.description + ' es de ' + account.balance);
                }
            });
        });
    }
}
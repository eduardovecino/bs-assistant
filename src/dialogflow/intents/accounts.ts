import { List, BasicCard, Button } from "actions-on-google";
import { AccountService } from "../../services/account.service";



export class AccountIntents /*extends BaseIntent*/ {

    private accountService: AccountService = new AccountService();

    public intents(app): void {

        const accountImage = 'https://es.banqueando.com/wp-content/uploads/2012/05/logotipo_sabadell_creditos_banco11.gif';
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
                conv.ask(new List(tmp));
                conv.ask(voice);
                conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
            } else {
                conv.ask('El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance);
            }
        });

        //Detalle cuenta seleccionada
        app.intent('Cuenta seleccionada', (conv, input, option) => {
            accounts.forEach((account) => {
                if (account.iban === option) {
                    conv.ask('Has seleccionado la cuenta ' + account.descripcion + ' ');
                    conv.ask(' El saldo es de ' + accounts[0].balance);
                }
            });
            
            // accounts.forEach((account) => {
            //     if (account.iban === option) {
            //         conv.ask('Has seleccionado la cuenta ' + account.descripcion + ' ');
            //         conv.ask('Puedes obtener el saldo de la cuenta o el listado de movimientos');
            //         conv.ask(new BasicCard({
            //             title: 'Abrir App',
            //             image: {
            //                 url: accountImage,
            //                 accessibilityText: 'Abrir APP'
            //             },
            //             text: '',
            //             buttons: new Button({
            //                 title: 'Abrir APP',
            //                 url: 'http://eduvecino.com/GA_BMA/app_saba.php',
            //             })
            //         })
            //         );
            //     }
            // });
        });

        // Saldo cuenta
        app.intent('Saldo cuenta', (conv, { last4numbers, tipo_cuenta }) => {
            let encontrada = 0;
            if (accounts.length === 1) {
                conv.ask('El saldo  de tu ' + accounts[0].descripcion + ' es de ' + accounts[0].balance);
            } else {
                accounts.forEach((account, index) => {
                    const iban4Numbers = account.iban.charAt(account.iban.length - 4) + account.iban.charAt(account.iban.length - 3) + account.iban.charAt(account.iban.length - 2) + account.iban.charAt(account.iban.length - 1);
                    if (parseInt(last4numbers) === parseInt(iban4Numbers) || tipo_cuenta === account.descripcion) {
                        encontrada = 1;
                        conv.ask('El saldo  de tu ' + account.descripcion + ' es de ' + account.balance);
                    } else if (encontrada === 0 && accounts.length - 1 === index) {
                        conv.ask('No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros' +tipo_cuenta);
                    }
                });
            }
        });
    }
}
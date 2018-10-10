import { AccountService } from "../../services/account.service";
import { AccountManager } from "../../managers/data/account.manager";
import { AccountDFManager } from "../../managers/dialog-flow/account.manager";
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager";
import * as rp from "request-promise";


export class AccountIntents /*extends BaseIntent*/ {

    private accountService: AccountService = new AccountService();

    public intents(app): void {

        const nullResponse = `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo o los movimientos de una cuenta`;
        const host = 'https://oauth.bancsabadell.com';
        const token = '23df793a-4c26-4c47-9f71-3e858abb2e2f54e635c6-de2d-4a98-9de7-d2456f360db202231bf0-ff4b-44dd-b162-f404ef87800d'
        const options = {
            'method': 'GET',
            'uri': host + '/ResourcesServerBS/oauthservices/v1.0.0/productos',
            'json': true,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        };
        

        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => {
            rp(options)
                .then(function (body) {
                    var data = body.data;
                    // resolve(data);
                    console.log(data);
                    if (data) {
                        const accountsList = AccountDFManager.generateAccountsList(data);
                        conv.ask(`Tus cuentas son `);
                        conv.ask(accountsList);

                        // conv.ask(suggestionResponse);
                        // conv.ask(SuggestionDFManager.generateSuggestions(conv))
                    } else {
                        conv.ask(nullResponse);
                    }
                })
                .catch(function (err) {
                    // reject(err.error);
                });
            // this.accountService.getAccounts().then(accounts => {
                
            // }, error => {
            //     conv.ask("errrorrrr");
            // });
        });

        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', (conv, input, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = AccountManager.getAccountByOption(accounts, option);
                if (selectedAccount) {
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}, el saldo es de ${selectedAccount.balance} €`);
                } else {
                    conv.ask(`No podemos mostrar la cuenta ${option}`);
                }
            });
        });

        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers, tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                if (account) {
                    conv.ask(`El saldo  de tu ${account.descripcion} es de ${account.balance} €`);
                    conv.ask(suggestionResponse);
                } else {
                    conv.ask(nullResponse);
                }
            });
        });
    }
}
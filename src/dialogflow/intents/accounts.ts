import { List, BasicCard, Button } from "actions-on-google";
import { AccountService } from "../../services/account.service";
import { AccountManager } from "../../managers/account.manager";




export class AccountIntents /*extends BaseIntent*/ {

    private accountService: AccountService = new AccountService();

    public intents(app): void {

        const nullResponse = 'No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros';
        const suggestionResponse = 'Puedes preguntame por el saldo o los movimientos de una cuenta';

        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => {
            this.accountService.getAccounts().then(accounts => {
                if (accounts) {
                    const accountsList = AccountManager.generateAccountsList(accounts);
                    conv.ask(accountsList);
                    conv.ask(suggestionResponse);
                } else {
                    conv.ask(nullResponse);
                }
            });
        });

        //CUENTA SELECCIONADA
        app.intent('Cuenta seleccionada', (conv, input, option) => {
            // accounts.forEach((account) => {
            //     if (account.iban === option) {
            //         conv.ask('Has seleccionado la cuenta ' + account.descripcion + ', el saldo es de' + accounts[0].balance + ' €');
            //         conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
            //     }
            // });
        });

        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers, tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                if (account) {
                    conv.ask('El saldo  de tu ' + account.descripcion + ' es de ' + account.balance + ' €');
                    conv.ask(suggestionResponse);
                } else {
                    conv.ask(nullResponse);
                }
            });
        });
    }
}
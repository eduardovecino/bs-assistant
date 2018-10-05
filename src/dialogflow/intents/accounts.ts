import { AccountService } from "../../services/account.service";
import { AccountManager } from "../../managers/data/account.manager";
import { AccountDFManager } from "../../managers/dialog-flow/account.manager";
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager";
import { Ssml } from "ssml-gib";
import { FormatManager } from "../../managers/format.manager"


export class AccountIntents /*extends BaseIntent*/ {

    private accountService: AccountService = new AccountService();

    public intents(app): void {

        const nullResponse = `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo o los movimientos de una cuenta`;
        const accountCloseResponse = ['Nos vemos pronto', 'Que vaya bien', 'Hasta la próxima'];

        //LISTA CUENTAS
        app.intent('Cuentas', (conv) => {
            this.accountService.getAccounts().then(accounts => {
                let response = "Tienes " + accounts.length + " cuentas. Terminadas en:" ;
             
                if (accounts) {
                    accounts.forEach(account => {
                        response = response + FormatManager.getLast4numbers(account.iban) + ", ";
                    })
                    const accountsList = AccountDFManager.generateAccountsList(accounts);    
                    conv.ask(response + "¿Cúal deseas seleccionar?");
                    conv.ask(accountsList);
                    // conv.ask(suggestionResponse);
                    // conv.ask(SuggestionDFManager.generateSuggestions(conv))
                } else {
                    conv.ask(nullResponse);
                }
            });
        });

        //CUENTA SELECCIONADA
        app.intent('Cuenta seleccionada', (conv, input, output, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = AccountManager.getAccountByOption(accounts, option);
                if(selectedAccount) {
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}, el saldo es de ${selectedAccount.balance} €. ¿Quieres saber el saldo de la cuenta?`);
                } else {
                    conv.ask(`No podemos mostrar la cuenta ${option}`);
                }
            });
        });

        app.intent('Cuenta seleccionada - yes', (conv, option, { last4numbers, tipo_cuenta }) => {
        this.accountService.getAccount(last4numbers).then(account => {
            if (account) {
                conv.ask(`El saldo  de tu ${account.descripcion} es de ${account.balance} €`);
                conv.ask(suggestionResponse);
                const parameters = {
                    saldo_cuenta: true,
                };
                conv.contexts.set('saldo_cuenta', 5, parameters )
            } else {
                conv.ask(nullResponse);
            }
        });
    })


        app.intent('Cuenta seleccionada - no', (conv, input, output) => {
            var accountCloseResponseResult = accountCloseResponse[Math.floor(Math.random() * accountCloseResponse.length)];
            conv.close(accountCloseResponseResult);
        }) 

        // SALDO CUENTA
        app.intent('Saldo Cuenta', (conv, option, { last4numbers, tipo_cuenta }) => {
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
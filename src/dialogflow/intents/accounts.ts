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

        const AppContexts = {
            last4NumbersContext: 'last4NumbersContext',
        }

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
        app.intent('Cuenta Seleccionada', (conv, input, option) => {
            this.accountService.getAccounts().then(accounts => {
                const selectedAccount = AccountManager.getAccountByOption(accounts, option);
                if (selectedAccount) {
                    conv.contexts.set(AppContexts.last4NumbersContext, 1)
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}, el saldo es de ${selectedAccount.balance} €`);
                } else {
                    conv.ask(`No podemos mostrar la cuenta ${JSON.stringify(option)}`);
                }
            });
        });

        app.intent('Saldo cuenta - seleccionada', (conv) =>{
            const context = conv.contexts.get(AppContexts.last4NumbersContext)
            conv.ask('Tu edad es' + context.parameters.last4NumbersContext);
            });

        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers}, {tipo_cuenta }) => {

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
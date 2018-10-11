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

        const Contexts = {
            selected_account: 'selected_account',
        }

        //LISTA CUENTAS

        app.intent('Cuentas', async (conv) => {
            let accounts;
            accounts = await this.accountService.getAccounts();
            let response = "Tienes " + accounts.length + " cuentas. Terminadas en:";
            if (accounts) {
                accounts.forEach(account => {
                    response = response + FormatManager.getLast4numbers(account.iban) + ", ";
                })
                const accountsList = AccountDFManager.generateAccountsList(accounts);
                conv.ask(response + "¿Cúal deseas seleccionar?");
                conv.ask(accountsList);
            } else {
                conv.ask(nullResponse);
            }
        });

        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', async (conv, input, option) => {
            let accounts;
            accounts = await this.accountService.getAccounts();
                const selectedAccount = AccountManager.getAccountByOption(accounts, option);
                 conv.contexts.set(Contexts.selected_account, 5)
                if (selectedAccount) {
                    conv.ask(`Has seleccionado la ${selectedAccount.descripcion}. ${suggestionResponse}`);
                    } else {
                    conv.ask(`No podemos mostrar la cuenta ${option}`);
                }

                app.intent('Saldo cuenta - seleccionada', (conv) => {
                    const response = AccountDFManager.saldoAccount(selectedAccount);
                    conv.ask(response);
                        // if (selectedAccount) {
                        //     conv.ask(`El saldo  de tu ${selectedAccount.descripcion} es de ${selectedAccount.balance} €`);
                        //     } else {
                        //     conv.ask(nullResponse);
                        // }
                }); 
                 
                app.intent('Movimientos Cuentas', (conv, { last4numbers }, { tipo_cuenta }) => {
                    this.accountService.getMovementsAccounts().then(movements => {
                        if (movements) {
                            const movementsTable = AccountDFManager.generateMovementsTable(movements);
                            conv.ask(`Aquí tienes los movimientos de la cuenta`);
                            conv.ask(movementsTable);
                        } else {
                            conv.ask(nullResponse);
                        }
                    });
                })

                app.intent('ayuda - cuentas', (conv) => {
                    conv.ask(suggestionResponse);
                });
        })
        
        // SALDO CUENTA
        app.intent('Saldo cuenta', (conv, { last4numbers }, { tipo_cuenta }) => {
            this.accountService.getAccount(last4numbers).then(account => {
                const response = AccountDFManager.saldoAccount(account);
                conv.ask(response);
                // if (account) {
                //     conv.ask(`El saldo  de tu ${account.descripcion} es de ${account.balance} €. `);
                //     conv.ask(suggestionResponse);
                // } else {
                //     conv.ask(nullResponse);
                // }
            });
        }); 
    }
}

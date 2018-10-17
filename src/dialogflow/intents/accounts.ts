import { AccountService } from "../../services/account.service";
import { AccountManager } from "../../managers/data/account.manager";
import { AccountDFManager } from "../../managers/dialog-flow/account.manager";
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager";
import { Ssml } from "ssml-gib";
import { FormatManager } from "../../managers/format.manager"
import { TranslateManager } from "../../managers/translate.manager";



export class AccountIntents /*extends BaseIntent*/ {

    private accountService: AccountService = new AccountService();
    public translateManager: TranslateManager = TranslateManager.getInstance();


    public intents(app): void {

        const nullResponse = 'No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros';
        // const nullResponse = this.translateManager.translate('intent.account.null_response');

        const suggestionResponse = 'Puedes preguntarme por el saldo o los movimientos de una cuenta';
        // const suggestionResponse = this.translateManager.translate('intent.account.suggestion_response');

        const Contexts = {
            selected_account: 'selected_account',
            selected_card: 'selected_card'
        }

        //LISTA CUENTAS
        app.intent('Cuentas', async (conv) => {
            let accounts;
            accounts = await this.accountService.getAccounts();
            // let response = "Tienes " + accounts.length + " cuentas. Terminadas en: ";
            let response = this.translateManager.translate('intent.account.account_list_%number%', accounts.length);
            conv.contexts.delete(Contexts.selected_card);

            if (accounts) {
                accounts.forEach(account => {
                    response = response + FormatManager.getLast4numbers(account.iban) + ", ";
                })
                const accountsList = AccountDFManager.generateAccountsList(accounts);
                conv.ask(response + '¿Cúal deseas seleccionar ?');

                // conv.ask(response + this.translateManager.translate('intent.account.account_list.answer_which_one'));
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
                    conv.ask(SuggestionDFManager.generateAccountSuggestions());
                } else {
                conv.ask(`No podemos mostrar la cuenta ${option}`);
                }

                // SALDO CUENTA SELECCIONADA
                app.intent('Saldo cuenta - seleccionada', (conv) => {
                    const response = AccountDFManager.saldoAccount(selectedAccount);
                    conv.ask(response);
                }); 
                
                // MOVIMIENTOS CUENTA SELECCIONADA
                app.intent('Movimientos cuenta - seleccionada', async (conv) => {
                    let movements;
                    movements = await this.accountService.getMovementsAccounts(selectedAccount.numeroProducto);
                    const response = AccountDFManager.movementsAccount(movements);
                    conv.ask(response[0]);
                    conv.ask(response[1]);
                });

                // AYUDA CUENTAS
                app.intent('ayuda - cuentas', (conv) => {
                    conv.ask(suggestionResponse);
                    conv.ask(SuggestionDFManager.generateAccountSuggestions());
                });
        })
        
        // SALDO CUENTA
        app.intent('Saldo cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let account;
            account = await this.accountService.getAccount(last4numbers);
            if (account){
                const response = AccountDFManager.saldoAccount(account);
                conv.ask(response);
            } else {
                conv.ask(nullResponse);
            }
        });
        
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let movements;
            let account;
            account = await this.accountService.getAccount(last4numbers);
            if(account) {
                movements = await this.accountService.getMovementsAccounts(account.numeroProducto);
                const response = AccountDFManager.movementsAccount(movements);
                conv.ask(response[0]);
                conv.ask(response[1]);
            } else {
                conv.ask(nullResponse);
            }
        })
    }
}
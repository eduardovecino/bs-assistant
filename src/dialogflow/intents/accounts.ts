import { AccountService } from "../../services/account.service";
import { AccountManager } from "../../managers/data/account.manager";
import { AccountDFManager } from "../../managers/dialog-flow/account.manager";
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager";
import { TranslateManager } from "../../managers/translate.manager";



export class AccountIntents {

    private accountService: AccountService = new AccountService();
    public translateManager: TranslateManager = TranslateManager.getInstance();


    public intents(app): void {
        const Contexts = {
            selected_account: 'selected_account',
            selected_card: 'selected_card'
        }

        //LISTA CUENTAS
        app.intent('Cuentas', async (conv) => {
            let accounts;
            accounts = await this.accountService.getAccounts();
            conv.contexts.delete(Contexts.selected_card);
            if (accounts) {
                const accountsSimpleResponse = AccountDFManager.generateAccountsSimpleResponse(accounts);
                const accountsList = AccountDFManager.generateAccountsList(accounts);
                conv.ask(accountsSimpleResponse);
                conv.ask(accountsList);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });

        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', async (conv, input, option) => {
            let accounts;
            accounts = await this.accountService.getAccounts();
                const selectedAccount = AccountManager.getAccountByOption(accounts, option);
                conv.contexts.set(Contexts.selected_account, 5)
                if (selectedAccount) {
                    const response = AccountDFManager.generateSelectedAccountSimpleResponse(selectedAccount);
                    conv.ask( response + this.translateManager.translate('intent.account.help'));
                    conv.ask(SuggestionDFManager.generateAccountSuggestions());
                } else {
                    conv.ask(this.translateManager.translate('intent.account.selected_account.failure_%account%', option));
                }

                // SALDO CUENTA SELECCIONADA
                app.intent('Saldo cuenta - seleccionada', (conv) => {
                    const response = AccountDFManager.generateBalanceAccountResponse(selectedAccount);
                    conv.ask(response);
                }); 
                
                // MOVIMIENTOS CUENTA SELECCIONADA
                app.intent('Movimientos cuenta - seleccionada', async (conv) => {
                    let movements;
                    movements = await this.accountService.getMovementsAccounts(selectedAccount.numeroProducto);
                    const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
                    const accountMovementsTable = AccountDFManager.generateMovementsAccountTable(movements);
                    conv.ask(accountMovementsSimpleResponse);
                    conv.ask(accountMovementsTable);
                });

                // AYUDA CUENTAS
                app.intent('ayuda - cuentas', (conv) => {
                    conv.ask(this.translateManager.translate('intent.account.help'));
                    conv.ask(SuggestionDFManager.generateAccountSuggestions());
                });
        })
        
        // SALDO CUENTA
        app.intent('Saldo cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let account;
            account = await this.accountService.getAccount(last4numbers);
            if (account){
                const response = AccountDFManager.generateBalanceAccountResponse(account);
                conv.ask(response);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });
        
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let movements;
            let account;
            account = await this.accountService.getAccount(last4numbers);
            if(account) {
                movements = await this.accountService.getMovementsAccounts(account.numeroProducto);
                const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
                const accountMovementsTable = AccountDFManager.generateMovementsAccountTable(movements);
                conv.ask(accountMovementsSimpleResponse);
                conv.ask(accountMovementsTable);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        })
    }
}
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
            let accounts = await this.accountService.getAccounts(conv.user.access.token);
            conv.contexts.delete(Contexts.selected_card);
            if (accounts) {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const accountsSimpleResponseScreen = AccountDFManager.generateAccountsSimpleResponseScreen(accounts);
                    const accountsList = AccountDFManager.generateAccountsList(accounts);
                    conv.ask(accountsSimpleResponseScreen);
                    conv.ask(accountsList);
                } else {
                    const accountsSimpleResponseNoScreen = AccountDFManager.generateAccountsSimpleResponseNoScreen(accounts);
                    conv.ask(accountsSimpleResponseNoScreen);
                }
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });

        //CUENTA SELECCIONADA
        app.intent('Cuenta Seleccionada', async (conv, input, option) => {
            let accounts = await this.accountService.getAccounts(conv.user.access.token);
            const selectedAccount = AccountManager.getAccountByOption(accounts, option);
            conv.contexts.set(Contexts.selected_account, 5)
            if (selectedAccount) {
                const response = AccountDFManager.generateSelectedAccountSimpleResponse(selectedAccount);
                conv.ask(response);
                conv.ask(SuggestionDFManager.generateAccountSuggestions());
            } else {
                conv.ask(this.translateManager.translate('intent.account.selected_account.failure_%account%', option));
            }

            // SALDO CUENTA SELECCIONADA
            app.intent('Saldo cuenta - seleccionada', (conv) => {
                this.accountBalance(selectedAccount, conv);
            }); 
            
            // MOVIMIENTOS CUENTA SELECCIONADA
            app.intent('Movimientos cuenta - seleccionada', async (conv) => {
                let movements = await this.accountService.getMovementsAccounts(selectedAccount.productNumber, conv.user.access.token);
                this.accountMovements(movements, conv);
            });

            // AYUDA CUENTAS
            app.intent('ayuda - cuentas', (conv) => {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const accountHelpSimpleResponseScreen = AccountDFManager.generateAccountHelpSimpleResponseScreen();
                    conv.ask(accountHelpSimpleResponseScreen);
                    conv.ask(SuggestionDFManager.generateAccountSuggestions());
                } else {
                    const accountHelpSimpleResponseNoScreen = AccountDFManager.generateAccountHelpSimpleResponseNoScreen();
                    conv.ask(accountHelpSimpleResponseNoScreen);
                }
            });
        })
        
        // SALDO CUENTA
        app.intent('Saldo cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let account = await this.accountService.getAccount(last4numbers, conv.user.access.token);
            if (account){
                this.accountBalance(account, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });
        
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let account = await this.accountService.getAccount(last4numbers, conv.user.access.token);
            if(account) {
                let movements = await this.accountService.getMovementsAccounts(account.productNumber, conv.user.access.token);
                this.accountMovements(movements, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        })
    }

    private accountMovements(movements, conv){
        if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
            if (movements.length > 1) {
                const accountMovementsTable = AccountDFManager.generateMovementsAccountTable(movements);
                const accountMovementsTableSimpleResponse = AccountDFManager.generateMovementsAccountTableSimpleResponse(movements);
                conv.ask(accountMovementsTableSimpleResponse);
                conv.ask(accountMovementsTable);
            } else {
                const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
                conv.ask(accountMovementsSimpleResponse);
            }
        } else {
            const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
            conv.ask(accountMovementsSimpleResponse);
        }
    }

    private accountBalance(account, conv) {
        const response = AccountDFManager.generateBalanceAccountResponse(account);
        conv.ask(response);
    }
}
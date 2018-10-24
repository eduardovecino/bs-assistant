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
            let accounts = await this.accountService.getAccounts();
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
            let accounts = await this.accountService.getAccounts();
            const selectedAccount = AccountManager.getAccountByOption(accounts, option);
            conv.contexts.set(Contexts.selected_account, 5)
            if (selectedAccount) {
                const response = AccountDFManager.generateSelectedAccountSimpleResponse(selectedAccount);
                conv.ask(response + this.translateManager.translate('intent.account.help'));
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
                let movements = await this.accountService.getMovementsAccounts(selectedAccount.productNumber);
                this.accountMovements(movements, conv);
            });

            // AYUDA CUENTAS
            app.intent('ayuda - cuentas', (conv) => {
                conv.ask(this.translateManager.translate('intent.account.help'));
                conv.ask(SuggestionDFManager.generateAccountSuggestions());
            });
        })
        
        // SALDO CUENTA
        app.intent('Saldo cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let account = await this.accountService.getAccount(last4numbers);
            if (account){
                this.accountBalance(account, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });
        
        //MOVIMIENTOS CUENTA
        app.intent('Movimientos cuenta', async (conv, { last4numbers }, { tipo_cuenta }) => {
            let account = await this.accountService.getAccount(last4numbers);
            let movements = await this.accountService.getMovementsAccounts(account.productNumber);
            if(account) {
                this.accountMovements(movements, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        })
    }

    private accountMovements(movements, conv){
        // const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
        // conv.ask(accountMovementsSimpleResponse);
        // if (movements.length > 1) {
        //     const accountMovementsTable = AccountDFManager.generateMovementsAccountTable(movements);
        //     conv.ask(accountMovementsTable);
        // }



        console.log("ENTRO 0", conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO'));

        if (conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
            console.log("ENTRO MEDIA", conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO'));
            if (movements.length > 1) {
                const accountMovementsTable = AccountDFManager.generateMovementsAccountTable(movements);
                conv.ask(accountMovementsTable);
            } else {
                const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
                conv.ask(accountMovementsSimpleResponse);
            }
        } else {
            console.log("ENTRO NO MEDIA", conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO'));
            const accountMovementsSimpleResponse = AccountDFManager.generateMovementsAccountSimpleResponse(movements);
            conv.ask(accountMovementsSimpleResponse);
        }
    }

    private accountBalance(account, conv) {
        const response = AccountDFManager.generateBalanceAccountResponse(account);
        conv.ask(response);
    }
}
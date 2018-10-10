import { Request, Response } from "express";
import { AccountService } from "../../services/account.service";
import { AccountDFManager } from "../../managers/dialog-flow/account.manager"

export class AccountRoutes {

    private accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    public routes(app): void {
        app.route('/accounts')
         .get((req: Request, res: Response) => {
             let accounts;
             accounts = this.accountService.getAccounts()/*.then(accounts => {*/
                if (accounts) {
                    const listOfAccounts = AccountDFManager.generateAccountsList(accounts);

                    res.status(200).send(listOfAccounts);

                } else {
                    res.status(400).send('No se ha encontrado las tarjetas');
                }
            })
        // })
    }
}
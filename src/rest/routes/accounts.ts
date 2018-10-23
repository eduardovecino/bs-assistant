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
                let accounts = this.accountService.getAccounts();
                if (accounts) {
                    res.status(200).send(accounts);
                } else {
                    res.status(400).send('No se ha encontrado las tarjetas');
                }
            })

        app.route('/accounts/movements')
            .get((req: Request, res: Response) => {
                // this.accountService.getMovementsAccounts().then(movements => {
                //     if (movements) {
                //         const movementsOfAccounts = AccountDFManager.generateMovementsTable(movements);

                //         res.status(200).send(movementsOfAccounts);

                //     } else {
                //         res.status(400).send('No se ha encontrado la cuenta');
                //     }
                // })
            })
    }

}
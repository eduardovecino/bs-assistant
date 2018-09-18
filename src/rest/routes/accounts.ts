import { Request, Response } from "express";
import { AccountService } from "../../services/account.service";

export class AccountRoutes {

    private accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    public routes(app): void {
        app.route('/accounts')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.accountService.getAccounts();
                res.status(200).send(data);
            })
    }
}
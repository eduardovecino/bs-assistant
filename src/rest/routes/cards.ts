import { Request, Response } from "express";
import { CardService } from "../../services/card.service";

export class CardRoutes {

    private cardService: CardService;

    constructor() {
        this.cardService = new CardService();
    }

    public routes(app): void {
        app.route('/cards')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.cardService.getCard();
                res.status(200).send(data.data);
            })
    }
}

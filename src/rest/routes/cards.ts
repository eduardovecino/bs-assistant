import { Request, Response } from "express";
import { CardService } from "../../services/card.service";
import { CardManager } from "../../managers/card.manager";
import { Table, TableOptions } from "actions-on-google";

export class CardRoutes {

    private cardService: CardService;

    constructor() {
        this.cardService = new CardService();
    }

    public routes(app): void {
        app.route('/cards')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.cardService.getCards();
                res.status(200).send(data.data);
            })

        app.route('/cards/:last4/movements')
            .get((req: Request, res: Response) => {
                const cards = this.cardService.getCards()
                const card = CardManager.getCardByLast4(cards, req.params.last4);

                if (card) {
                    const movementsTable = CardManager.generateMovementsTable(card);

                    res.status(200).send(movementsTable);
                } else {
                    res.status(400).send('No se ha encontrado la tarjeta');
                }

                
            })
    }
}

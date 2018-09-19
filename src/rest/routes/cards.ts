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
                this.cardService.getCards().then(cards => {
                    res.status(200).send(cards);
                })
            })

        app.route('/cards/:last4/movements')
            .get((req: Request, res: Response) => {
                this.cardService.getCard(req.params.last4).then(card => {
                    if (card) {
                        const movementsTable = CardManager.generateMovementsTable(card);

                        res.status(200).send(movementsTable);
                    } else {
                        res.status(400).send('No se ha encontrado la tarjeta');
                    }
                })
            })
    }
}

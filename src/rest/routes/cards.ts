import { Request, Response } from "express";
import { CardService } from "../../services/card.service";
import { CardDFManager } from "../../managers/dialog-flow/card.manager";

export class CardRoutes {

    private cardService: CardService;

    constructor() {
        this.cardService = new CardService();
    }


    public routes(app): void {
        
        app.route('/cards')
            .get((req: Request, res: Response) => {
                this.cardService.getCards().then(cards => {
                    if(cards){
                        const carouselOfCards = CardDFManager.cardsCarousel(cards); 

                        res.status(200).send(carouselOfCards);

                    } else {
                        res.status(400).send('No se ha encontrado las tarjetas');
                    }
                })
            })
        

            app.route('/cards/:last4/movements')
            .get((req: Request, res: Response) => {
                this.cardService.getCardByInputs(req.params.last4).then(card => {
                    if (card) {
                        const movementsTable = CardDFManager.generateMovementsTable(card);

                        res.status(200).send(movementsTable);
                    } else {
                        res.status(400).send('No se ha encontrado la tarjeta');
                    }
                })
            })
    }
}

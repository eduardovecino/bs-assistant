import { Request, Response } from "express";
import { InformationService } from "../../services/information.service";
import { InformationDFManager } from "../../managers/dialog-flow/information.manager"

export class InformationRoutes {

    private informationService: InformationService;

    constructor() {
        this.informationService = new InformationService();
    }


    public routes(app): void {
        app.route('/information/offices')
            .get((req: Request, res: Response) => {
                this.informationService.getOffices().then(offices => {
                    if (offices) {
                        const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);

                        res.status(200).send(carouselOfOffices);

                    } else {
                        res.status(400).send('No se ha encontrado las tarjetas');
                    }
                })
            })
    }
    // public routes(app): void {
    //     app.route('/information/offices')
    //         .get((req: Request, res: Response) => {
    //             // Intercalar el servicio para recuperar los datos del servidor de sabadell
    //             const data = this.informationService.getOffices();
    //             res.status(200).send(data);
    //         })
    // }
}
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
                //Test location
                const latitude = '41.389492';
                const longitude = '2.135065';
                this.informationService.getOffices(latitude, longitude).then(offices => {
                    if (offices) {
                        res.status(200).send(offices);
                        const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices, latitude, longitude);

                        res.status(200).send(carouselOfOffices);

                    } else {
                        res.status(400).send('No se ha encontrado las oficinas');
                    }
                })
            })
    }
}
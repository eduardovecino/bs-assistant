import { Request, Response } from "express";
import { InformationService } from "../../services/information.service";

export class InformationRoutes {

    private informationService: InformationService;

    constructor() {
        this.informationService = new InformationService();
    }

    public routes(app): void {
        app.route('/information/offices')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.informationService.getOffices();
                res.status(200).send(data);
            })
    }
}
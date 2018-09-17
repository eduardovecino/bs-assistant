import { Request, Response } from "express";
import { ProductService } from "../../services/products.service";

export class ProductRoutes {

    private productsService: ProductService;

    constructor() {
        this.productsService = new ProductService();
    }

    public routes(app): void {
        app.route('/products')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.productsService.getProducts();
                res.status(200).send(data);
            })
    }
}
import { Request, Response } from "express";
import { ProductService } from "../../services/products.service";
import { TranslateManager } from "../../managers/translate.manager";

export class ProductRoutes {

    private productsService: ProductService;
    public translateManager: TranslateManager = TranslateManager.getInstance();

    constructor() {
        this.productsService = new ProductService();
    }

    public routes(app): void {
        app.route('/products/default')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.productsService.getProducts();
                res.status(200).send(this.translateManager.translate('intent.product.welcome.answer'));
            })
        app.route('/products')
            .get((req: Request, res: Response) => {
                // Intercalar el servicio para recuperar los datos del servidor de sabadell
                const data = this.productsService.getProducts();
                res.status(200).send(data);
            })
    }
}
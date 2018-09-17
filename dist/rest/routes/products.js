"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_1 = require("../../services/products.service");
class ProductRoutes {
    constructor() {
        this.productsService = new products_service_1.ProductService();
    }
    routes(app) {
        app.route('/products')
            .get((req, res) => {
            // Intercalar el servicio para recuperar los datos del servidor de sabadell
            const data = this.productsService.getProducts();
            res.status(200).send(data);
        });
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=products.js.map
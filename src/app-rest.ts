import * as express from "express";
import * as bodyParser from "body-parser";
import { ProductRoutes } from "./rest/routes/products";
import { CardRoutes } from "./rest/routes/cards";
import { AccountRoutes } from "./rest/routes/accounts";


class AppRest {

    public app: express.Application;
    public productRoutes: ProductRoutes = new ProductRoutes();
    public cardRoutes: CardRoutes = new CardRoutes();
    public accountRoutes: AccountRoutes = new AccountRoutes();



    constructor() {
        console.log('AppRest Constructor');
        this.app = express();
        this.config();
        this.productRoutes.routes(this.app);
        this.cardRoutes.routes(this.app);
        this.accountRoutes.routes(this.app); 
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new AppRest().app;

  
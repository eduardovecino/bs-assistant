import { RestManager } from "../managers/rest.manager";
import * as fs from "fs";

export class ProductService extends RestManager {

    public getProducts(): any {
        if(this.isMock) {
            const data = fs.readFileSync('mock/products/get-products.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        } else {
            return this.get();
        }
    }
}
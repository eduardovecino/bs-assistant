"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardsModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
    }
    get productNumber() {
        return this._productNumber;
    }
    set productNumber(value) {
        this._productNumber = value;
    }
    get numberCodificatedProduct() {
        return this._numberCodificatedProduct;
    }
    set numberCodificatedProduct(value) {
        this._numberCodificatedProduct = value;
    }
    // get last4Numbers(): string {
    //     return FormatManager.getLast4numbers(this.relatedAccount);
    // }
    fromJSON(data) {
        this._owner = data.propietario;
        this._description = data.descripcion;
        this._user = data.usuario;
        this._balance = data.balance;
        this._product = data.producto;
        this._productNumber = data.numeroProducto;
        this._numberCodificatedProduct = data.numeroProductoCodificado;
    }
    toJSON() {
        return {};
    }
}
exports.CardsModel = CardsModel;
//# sourceMappingURL=cards.model.js.map
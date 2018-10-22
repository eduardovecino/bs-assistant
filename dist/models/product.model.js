"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get available() {
        return this._available;
    }
    set available(value) {
        this._available = value;
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
    get iban() {
        return this._iban;
    }
    set iban(value) {
        this._iban = value;
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
    get numberProduct() {
        return this._numberProduct;
    }
    set numberProduct(value) {
        this._numberProduct = value;
    }
    get numberCodificatedProduct() {
        return this._numberCodificatedProduct;
    }
    set numberCodificatedProduct(value) {
        this._numberCodificatedProduct = value;
    }
    get formattedIban() {
        return `****${this.iban}`;
    }
    fromJSON(data) {
        this._owner = data.propietario;
        this._available = data.disponibilidad;
        this._description = data.descripcion;
        this._user = data.usuario;
        this._iban = data.iban;
        this._balance = data.balance;
        this._product = data.product;
        this._numberProduct = data.numeroProducto;
        this._numberCodificatedProduct = data.numeroProductoCodificado;
    }
    toJSON() {
        return {};
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.model.js.map
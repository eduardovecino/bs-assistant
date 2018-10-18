"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get iban() {
        return this._iban;
    }
    set iban(value) {
        this._iban = value;
    }
    get formattedIban() {
        return `****${this.iban}`;
    }
    fromJSON(data) {
        this._owner = data.propietario;
        // this._productId = data.product;
        // this._productId = data.product;
        // this._productId = data.product;
        this._iban = data.iban;
        // this._productId = data.product;
        // this._productId = data.product;
        // this._productId = data.product;
    }
    toJSON() {
        return {};
    }
}
exports.AccountModel = AccountModel;
/*
"propietario": "&UPJURID - &LPJURID",
"disponibilidad": null,
"descripcion": "CUENTA CORRIENTE",
"usuario": "00000001R",
"iban": "ES00817065420001205528",
"balance": "123.915,06",
"producto": "CC",
"numeroProducto": "00817065420001205528",
"numeroProductoCodificado": "00817065420001205528"
*/ 
//# sourceMappingURL=account.model.js.map
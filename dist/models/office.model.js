"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(value) {
        this._latitude = value;
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(value) {
        this._longitude = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get postalCode() {
        return this._postalCode;
    }
    set postalCode(value) {
        this._postalCode = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
        this._city = value;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
    }
    fromJSON(data) {
        this._numOrder = data.numOrden;
        this._operationDate = data.fechaOperacion;
        this._valueDate = data.fechaValor;
        this._amount = data.importe;
        this._currency = data.divisa;
        this._balance = data.saldo;
        this._concept = data.concepto;
        this._conceptCode = data.codigoConcepto;
    }
    toJSON() {
        return {};
    }
}
exports.AccountModel = AccountModel;
//# sourceMappingURL=office.model.js.map
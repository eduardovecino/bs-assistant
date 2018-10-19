"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get numOrder() {
        return this._numOrder;
    }
    set numOrder(value) {
        this._numOrder = value;
    }
    get operationDate() {
        return this._operationDate;
    }
    set operationDate(value) {
        this._operationDate = value;
    }
    get valueDate() {
        return this._valueDate;
    }
    set valueDate(value) {
        this._valueDate = value;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
    }
    get currency() {
        return this._currency;
    }
    set _urrency(value) {
        this._currency = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get concept() {
        return this._concept;
    }
    set concept(value) {
        this._concept = value;
    }
    get conceptCode() {
        return this._conceptCode;
    }
    set conceptCode(value) {
        this._conceptCode = value;
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
//# sourceMappingURL=movement.model.js.map
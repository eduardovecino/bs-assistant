
export class AccountModel {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _numOrder: string;
    get numOrder(): string {
        return this._numOrder;
    }
    set numOrder(value: string) {
        this._numOrder = value;
    }

    private _operationDate: string;
    get operationDate(): string {
        return this._operationDate;
    }
    set operationDate(value: string) {
        this._operationDate = value;
    }

    private _valueDate: string;
    get valueDate(): string {
        return this._valueDate;
    }
    set valueDate(value: string) {
        this._valueDate = value;
    }

    private _amount: string;
    get amount(): string {
        return this._amount;
    }
    set amount(value: string) {
        this._amount = value;
    }

    private _currency: string;
    get currency(): string {
        return this._currency;
    }
    set _urrency(value: string) {
        this._currency = value;
    }

    private _balance: string;
    get balance(): string {
        return this._balance;
    }
    set balance(value: string) {
        this._balance = value;
    }

    private _concept: string;
    get concept(): string {
        return this._concept;
    }
    set concept(value: string) {
        this._concept = value;
    }

    private _conceptCode: string;
    get conceptCode(): string {
        return this._conceptCode;
    }
    set conceptCode(value: string) {
        this._conceptCode = value;
    }

    fromJSON(data: any) {
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
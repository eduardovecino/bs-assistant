
export class AccountModel {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _id: string;
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    private _latitude: string;
    get latitude(): string {
        return this._latitude;
    }
    set latitude(value: string) {
        this._latitude = value;
    }

    private _longitude: string;
    get longitude(): string {
        return this._longitude;
    }
    set longitude(value: string) {
        this._longitude = value;
    }

    private _type: string;
    get type(): string {
        return this._type;
    }
    set type(value: string) {
        this._type = value;
    }

    private _address: string;
    get address(): string {
        return this._address;
    }
    set address(value: string) {
        this._address = value;
    }

    private _postalCode: string;
    get postalCode(): string {
        return this._postalCode;
    }
    set postalCode(value: string) {
        this._postalCode = value;
    }

    private _city: string;
    get city(): string {
        return this._city;
    }
    set city(value: string) {
        this._city = value;
    }

    private _phoneNumber: string;
    get phoneNumber(): string {
        return this._phoneNumber;
    }
    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    fromJSON(data: any) {
        // this._numOrder = data.numOrden;
        // this._operationDate = data.fechaOperacion;
        // this._valueDate = data.fechaValor;
        // this._amount = data.importe;
        // this._currency = data.divisa;
        // this._balance = data.saldo;
        // this._concept = data.concepto;
        // this._conceptCode = data.codigoConcepto;
    }

    toJSON() {
        return {};
    }
}
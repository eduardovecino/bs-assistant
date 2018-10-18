
export class AccountModel {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _owner: string;
    get owner(): string {
        return this._owner;
    }
    set owner(value: string) {
        this._owner = value;
    }

    private _iban: string;
    get iban(): string {
        return this._iban;
    }
    set iban(value: string) {
        this._iban = value;
    }

    get formattedIban(): string {
        return `****${this.iban}`;
    }

    fromJSON(data: any) {
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

export class ProductModel {
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

    private _available: string;
    get available(): string {
        return this._available;
    }
    set available(value: string) {
        this._available = value;
    }

    private _description: string;
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }

    private _user: string;
    get user(): string {
        return this._user;
    }
    set user(value: string) {
        this._user = value;
    }

    private _iban: string;
    get iban(): string {
        return this._iban;
    }
    set iban(value: string) {
        this._iban = value;
    }

    private _balance: string;
    get balance(): string {
        return this._balance;
    }
    set balance(value: string) {
        this._balance = value;
    }

    private _product: string;
    get product(): string {
        return this._product;
    }
    set product(value: string) {
        this._product = value;
    }

    private _productNumber: string;
    get productNumber(): string {
        return this._productNumber;
    }
    set productNumber(value: string) {
        this._productNumber = value;
    }

    private _numberCodificatedProduct: string;
    get numberCodificatedProduct(): string {
        return this._numberCodificatedProduct;
    }
    set numberCodificatedProduct(value: string) {
        this._numberCodificatedProduct = value;
    }

    get formattedIban(): string {
        return `****${this.iban}`;
    }

    fromJSON(data: any) {
        this._owner = data.propietario;
        this._available = data.disponibilidad;
        this._description = data.descripcion;
        this._user = data.usuario;
        this._iban = data.iban;
        this._balance = data.balance;
        this._product = data.producto;
        this._productNumber = data.numeroProducto;
        this._numberCodificatedProduct = data.numeroProductoCodificado;

    }

    toJSON() {
        return {};
    }
}

export class OfficeModel {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _distToPoint: number;
    get distToPoint(): number {
        return this._distToPoint;
    }
    set distToPoint(value: number) {
        this._distToPoint = value;
    }

    private _num: string;
    get num(): string {
        return this._num;
    }
    set latitude(value: string) {
        this._num = value;
    }

    private _name: string;
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    private _address: string;
    get address(): string {
        return this._address;
    }
    set address(value: string) {
        this._address = value;
    }

    private _location: string;
    get location(): string {
        return this._location;
    }
    set location(value: string) {
        this._location = value;
    }

    private _postalCode: string;
    get postalCode(): string {
        return this._postalCode;
    }
    set postalCode(value: string) {
        this._postalCode = value;
    }

    private _director: string;
    get director(): string {
        return this._director;
    }
    set director(value: string) {
        this._director = value;
    }

    private _phone: string;
    get phone(): string {
        return this._phone;
    }
    set phone(value: string) {
        this._phone = value;
    }

    private _fax: string;
    get fax(): string {
        return this._fax;
    }
    set fax(value: string) {
        this._fax = value;
    }

    private _type: number;
    get type(): number {
        return this._type;
    }
    set type(value: number) {
        this._type = value;
    }

    private _point: {
        lat: number,
        lng: number,
        description: number
    };
    get point() {
        return this._point;
    }
    set point(value) {
        this._point = value;
    }

    private _country: string;
    get country(): string {
        return this._country;
    }
    set country(value: string) {
        this._country = value;
    }

    private _geoaddress: string;
    get geoaddress(): string {
        return this._geoaddress;
    }
    set geoaddress(value: string) {
        this._geoaddress = value;
    }

    fromJSON(data: any) {
        this._distToPoint = data.distToPoint;
        this._num = data.num;
        this._name = data.name;
        this._address = data.address;
        this._location = data.location;
        this._postalCode = data.postalCode;
        this._director = data.director;
        this._phone = data.phone;
        this._fax = data.fax;
        this._type = data.type;
        this._point = data.point.map(detail => ({
            lat: detail.lat,
            lng: detail.lng,
            description: detail.description
        }));
        this._country = data.country;
        this._geoaddress = data.geoaddress;
    }

    toJSON() {
        return {};
    }
}
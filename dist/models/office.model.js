"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OfficeModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get distToPoint() {
        return this._distToPoint;
    }
    set distToPoint(value) {
        this._distToPoint = value;
    }
    get num() {
        return this._num;
    }
    set latitude(value) {
        this._num = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        this._location = value;
    }
    get postalCode() {
        return this._postalCode;
    }
    set postalCode(value) {
        this._postalCode = value;
    }
    get director() {
        return this._director;
    }
    set director(value) {
        this._director = value;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        this._phone = value;
    }
    get fax() {
        return this._fax;
    }
    set fax(value) {
        this._fax = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get point() {
        return this._point;
    }
    set point(value) {
        this._point = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    get geoaddress() {
        return this._geoaddress;
    }
    set geoaddress(value) {
        this._geoaddress = value;
    }
    fromJSON(data) {
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
exports.OfficeModel = OfficeModel;
//# sourceMappingURL=office.model.js.map
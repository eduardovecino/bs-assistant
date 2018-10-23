"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const fs = require("fs");
const rp = require("request-promise");
const office_model_1 = require("../models/office.model");
class InformationService extends rest_manager_1.RestManager {
    getNearbyOffices() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
    getOffices(latitude, longitude) {
        return new Promise((resolve, reject) => {
            const options = {
                'method': 'GET',
                'uri': `https://www.bancsabadell.mobi/bsmobil/api/offices/?lat=${latitude}&lng=${longitude}&numOffices=10`,
                'json': true,
                'headers': {
                    'Accept-Language': 'es',
                    'Accept': 'application/vnd.idk.bsmobil-v1000+json'
                },
            };
            rp(options)
                .then(function (body) {
                return __awaiter(this, void 0, void 0, function* () {
                    const results = yield body.offices;
                    const offices = [];
                    console.log("RESULTS: ", results);
                    results.forEach(result => offices.push(new office_model_1.OfficeModel(result)));
                    console.log("OFFICES: ", offices);
                    resolve(offices);
                });
            })
                .catch(function (err) {
                reject(err.error);
            });
        });
    }
}
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map
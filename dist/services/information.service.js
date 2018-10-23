"use strict";
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
                const results = body.offcies;
                console.log("RESULTS: ", results);
                const offices = [];
                results.forEach(result => offices.push(new office_model_1.OfficeModel(result)));
                console.log("OFFICES: ", offices);
                resolve(offices);
            })
                .catch(function (err) {
                reject(err.error);
            });
        });
    }
}
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map
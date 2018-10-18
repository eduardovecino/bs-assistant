"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const fs = require("fs");
const rp = require("request-promise");
class InformationService extends rest_manager_1.RestManager {
    getNearbyOffices() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
    getOffices() {
        return new Promise((resolve, reject) => {
            const options = {
                'method': 'GET',
                'uri': 'https://www.bancsabadell.mobi/bsmobil/api/offices/?lat=41.389492&lng=2.135065&numOffices=10',
                'json': true,
                'headers': {
                    'Accept-Language': 'es',
                    'Accept': 'application/vnd.idk.bsmobil-v1000+json'
                    // 'Content-Type': 'application/json'
                },
            };
            rp(options)
                .then(function (body) {
                var data = body;
                console.log('success', data);
                resolve(data.offices);
            })
                .catch(function (err) {
                console.log('error', err);
                reject(err.error);
            });
        });
    }
}
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map
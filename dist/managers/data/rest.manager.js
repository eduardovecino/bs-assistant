"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
// const host = 'https://oauth.bancsabadell.com';
// const token = '87dfdac5-7ce4-4ee8-b2ab-ae621650266230493354-4ddf-4c5e-88fd-0171f55ff301f3190023-879d-4fc7-9a84-effe1775c79d'
const host = 'https://developers.bancsabadell.com';
const token = '6c2edddc-d110-487b-9267-92c6e69a5c9460c0aaf6-15f6-4b93-b9a4-efcf2701848fcbbbdbde-bc19-4625-aa8c-d5adfeb36c37';
class RestManager {
    constructor() {
        this.isMock = process.env.MOCK;
    }
    getApiBSabadell(path, mock) {
        return new Promise((resolve, reject) => {
            const options = {
                'method': 'GET',
                'uri': host + path,
                'json': true,
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                'strictSSL': false
            };
            if (this.isMock) {
                const data = fs.readFileSync(mock);
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData.data);
            }
            else {
                rp(options)
                    .then(function (body) {
                    var data = body.data;
                    console.log('success', data);
                    resolve(data);
                })
                    .catch(function (err) {
                    console.log('error', err);
                    reject(err.error);
                });
            }
        });
    }
}
exports.RestManager = RestManager;
//# sourceMappingURL=rest.manager.js.map
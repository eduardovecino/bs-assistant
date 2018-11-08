"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
const host = 'https://developers.bancsabadell.com';
// const token = 'fb2f1a76-e0c8-4bdd-9fb3-92a922ab21cde04424c8-5d6c-4f62-83f7-2bfae526db0fb42d8b8d-179c-428c-9a2b-219067dfc9d7'
class RestManager {
    constructor() {
        this.isMock = process.env.MOCK;
    }
    getApiBSabadell(path, mock, token) {
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
                    var data = body.data || null;
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
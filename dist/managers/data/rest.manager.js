"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
const host = 'https://developers.bancsabadell.com';
const token = 'f73db91b-2713-4493-a6a4-3b1946b0f05b49830d1f-cc65-4ccf-8b7a-d235b1b07d3333a89894-d172-4b0f-826a-5267cf7520ee';
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
                }
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
const host = 'https://oauth.bancsabadell.com';
const token = '6f025f5a-59e6-4c9d-909e-399535bc79ab33fdd161-cc7c-4dd9-8b01-e1ede3d4aa5bf34af305-350c-4ab0-a071-33b36643f387';
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
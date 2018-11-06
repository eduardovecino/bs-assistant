"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
const host = 'https://developers.bancsabadell.com';
const token = '6b4cdff4-37f2-4772-83d4-98b6e80d75950b85ef2e-f36d-445d-94f5-1438446ce1b38fd2635a-06ca-46f2-9c38-52399bcce257';
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
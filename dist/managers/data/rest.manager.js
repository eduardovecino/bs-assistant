"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const request = require('request-promise');
const host = 'https://oauth.bancsabadell.com';
const token = 'e9eb3665-d159-4f95-b5d8-82078bd4d2700f9dc5fb-49b7-4d14-8231-5c1d05f734a448c180a8-1732-4552-bc75-cd5061255c75';
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
                request(options, (err, res, body) => {
                    if (err) {
                        return console.log(err);
                    }
                    resolve(body.data);
                    console.log(body.data);
                });
            }
        });
    }
}
exports.RestManager = RestManager;
//# sourceMappingURL=rest.manager.js.map
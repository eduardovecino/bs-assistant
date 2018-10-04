import * as fs from "fs";

const request = require('request-promise');
const host = 'https://oauth.bancsabadell.com';
const token = '7da398b8-0b10-4b85-bb81-7e7a86cc2bfe0a8db05d-83fc-4f24-9f03-e685739592e0ac0eaa97-0356-469a-ba02-e7dd74ee81dc'

export class RestManager {

    public isMock;
    

    constructor() {
        this.isMock = process.env.MOCK;
    }

    public getApiBSabadell(path, mock): Promise<any> {
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

            if(this.isMock) {
                const data = fs.readFileSync(mock);
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData.data);

            } else {
                request(options, (err, res, body) => {
                    if (err) { return console.log(err); }
                    resolve(body.data);
                    console.log(body.data);
                });
            }
        })  
    }
}
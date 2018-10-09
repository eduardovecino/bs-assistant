import * as fs from "fs";
import * as request from "request-promise";

const host = 'https://oauth.bancsabadell.com';
const token = '23df793a-4c26-4c47-9f71-3e858abb2e2f54e635c6-de2d-4a98-9de7-d2456f360db202231bf0-ff4b-44dd-b162-f404ef87800d'

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

            if (this.isMock) {
                const data = fs.readFileSync(mock);
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData.data);

            } else {
                // request(options, (err, res, body) => {
                //     if (!!err) { return console.log(err); }
                //     resolve(body.data);
                //     console.log(body.data);
                // });

                request(options)
                    .then(function (body) {
                        var data = body.data;
                        resolve(data);
                        console.log(data);
                        return data;
                    })
                    .catch(function (err) {
                        reject(err.error);
                    });
            }
        })  
    }

    // constructor() {
    //     this.isMock = process.env.MOCK;
    // }

    // public get(): any {
    //     return { num: 21 };
    // }
}
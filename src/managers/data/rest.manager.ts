import * as fs from "fs";
import * as rp from "request-promise";

const host = 'https://oauth.bancsabadell.com';
const token = 'c340d58c-8178-4a88-a7ac-7aee118887f3812dd701-d136-437f-a963-126da3ceaf2890a8b112-a06f-4d3f-9f70-0ce2c5edb92c'

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
        })  
    }
}
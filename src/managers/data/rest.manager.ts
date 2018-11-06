import * as fs from "fs";
import * as rp from "request-promise";

// const host = 'https://oauth.bancsabadell.com';
// const token = '87dfdac5-7ce4-4ee8-b2ab-ae621650266230493354-4ddf-4c5e-88fd-0171f55ff301f3190023-879d-4fc7-9a84-effe1775c79d'

const host = 'https://developers.bancsabadell.com';
const token = '1e18ff2f-2044-4e6b-ac42-256a0f00135621acd97f-124f-48b2-8e35-7daa7816a5e62aa5a729-54a2-42e5-bcae-477ef703c2da'

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
                },
                'strictSSL': false
            };
            if (this.isMock) {
                const data = fs.readFileSync(mock);
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData.data);

            } else {
                rp(options)
                    .then(function (body) {
                        console.log('body', body);
                        console.log('body.data', body.data);

                        var data = body.data || null;
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
import * as fs from "fs";
import * as rp from "request-promise";

// const host = 'https://oauth.bancsabadell.com';
// const token = '87dfdac5-7ce4-4ee8-b2ab-ae621650266230493354-4ddf-4c5e-88fd-0171f55ff301f3190023-879d-4fc7-9a84-effe1775c79d'

const host = 'https://developers.bancsabadell.com';
const token = 'cb1112b3-4a6e-4fc3-8b29-14a358558f4ec65217df-4668-4893-948e-b667122c0d46377de5f7-f4ab-451f-a01a-eab773c789be'

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
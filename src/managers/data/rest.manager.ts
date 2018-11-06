import * as fs from "fs";
import * as rp from "request-promise";

// const host = 'https://oauth.bancsabadell.com';
// const token = '87dfdac5-7ce4-4ee8-b2ab-ae621650266230493354-4ddf-4c5e-88fd-0171f55ff301f3190023-879d-4fc7-9a84-effe1775c79d'

const host = 'https://developers.bancsabadell.com';
const token = 'f7fd2435-8dfc-4288-ad40-dd4dfd3bdbee2a4ff530-1180-46d8-b25e-66c6b599c43f2a236c7a-9f81-4ccc-9c34-c86ae1049424'

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
import * as fs from "fs";
import * as rp from "request-promise";

const host = 'https://oauth.bancsabadell.com';
const token = '688ae2be-c891-4f1b-a807-4372be6a824dcb510da1-dfd1-4d92-a9a2-e79a53a7579acec71d5b-11b1-420e-9987-bfc2377e394c'

export class RestManager {

    public isMock;
    

    constructor() {
        this.isMock = process.env.MOCK;
    }

    public getApiBSabadell(path, mock): Promise<any> {
        console.log('Before promise');
        return new Promise((resolve, reject) => {
            console.log('After promise - before timeout');
 
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
                // rp(options, (err, res, body) => {
                //     if (!!err) { return console.log(err); }
                //     resolve(body.data);
                //     console.log(body.data);
                // });

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

    // constructor() {
    //     this.isMock = process.env.MOCK;
    // }

    // public get(): any {
    //     return { num: 21 };
    // }
}
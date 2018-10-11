import * as fs from "fs";
import * as rp from "request-promise";

const host = 'https://oauth.bancsabadell.com';
const token = '07b85d58-1e37-4cf3-9f2f-b4c3d753f3a08203d205-3975-41ee-9058-ee0843c8c1475136a6f7-ec9d-40c1-8285-45a34ea9dae8'

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
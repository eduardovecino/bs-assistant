"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const host = 'https://oauth.bancsabadell.com';
const token = '23df793a-4c26-4c47-9f71-3e858abb2e2f54e635c6-de2d-4a98-9de7-d2456f360db202231bf0-ff4b-44dd-b162-f404ef87800d';
class RestManager {
    constructor() {
        this.isMock = process.env.MOCK;
    }
    getApiBSabadell(path, mock) {
        return new Promise((resolve, reject) => {
            const data = {
                "data": [
                    {
                        "propietario": "&UPJURID - &LPJURID",
                        "disponibilidad": null,
                        "descripcion": "CUENTA CORRIENTE",
                        "usuario": "00000001R",
                        "iban": "ES00810000000000001234",
                        "balance": "123.915,06",
                        "producto": "CC",
                        "numeroProducto": "00810000000000001234",
                        "numeroProductoCodificado": "00810000000000001234"
                    },
                    {
                        "propietario": "&RNOMBRE &DPRIAPE I &. &MPRIAPE",
                        "disponibilidad": null,
                        "descripcion": "CUENTA EXPANSIÓN",
                        "usuario": "00000001R ",
                        "iban": "ES00810000000000004567",
                        "balance": "27.912,74",
                        "producto": "CC",
                        "numeroProducto": "00810000000000004567",
                        "numeroProductoCodificado": "00810000000000004567"
                    }
                ],
                "head": {
                    "fechaOperacion": "2014-03-25 11:00:05",
                    "descripcionError": null,
                    "informacionAdicional": null,
                    "codigoServicio": "SERV_CUE01",
                    "errorCode": null,
                    "warnCode": null
                }
            };
            resolve(data.data);
            /*
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

                rp(options)
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
            */
        });
    }
}
exports.RestManager = RestManager;
//# sourceMappingURL=rest.manager.js.map
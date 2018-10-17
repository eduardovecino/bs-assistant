"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const fs = require("fs");
const rp = require("request-promise");
class InformationService extends rest_manager_1.RestManager {
    getNearbyOffices() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
    getOffices() {
        return new Promise((resolve, reject) => {
            const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <informacion>
                <canal>C_BS1</canal>
                <ubiRef>
                    <idCajero></idCajero>
                    <geoPos>
                        <lat>41.389492</lat>
                        <lon>2.135065</lon>
                    </geoPos>
                </ubiRef>
                <numCajCer></numCajCer>
                <hashMD5>wbubwubuwwbuwbbfwf</hashMD5>
                <hora></hora>
                <tamanyoMapa>
                    <ancho></ancho>
                    <alto></alto>
                </tamanyoMapa>
                <filterCriteria>
                    <operatividadGlobal></operatividadGlobal>
                    <conectividad></conectividad>
                    <actTarjPermitido></actTarjPermitido>
                    <actLibretaPermitido></actLibretaPermitido>
                    <actQRPermitido></actQRPermitido>
                    <opParcialIngresoSobres></opParcialIngresoSobres>
                    <opParcialIngresoEfecOnl></opParcialIngresoEfecOnl>
                    <opParcialUniRecibos></opParcialUniRecibos>
                    <opParcialUniTicketing></opParcialUniTicketing>
                    <horarioEstablecimiento></horarioEstablecimiento>
                    <cajeroPropio></cajeroPropio>
                </filterCriteria>
            </informacion>`;
            const options = {
                'method': 'GET',
                'uri': 'http://api_geocaix_host/geocaix/rest/cajeroscercanos.json',
                'json': true,
                'headers': {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'text/xml'
                },
                'body': xmlString
            };
            rp(options)
                .then(function (body) {
                var data = body;
                console.log('success', data);
                resolve(data);
            })
                .catch(function (err) {
                console.log('error', err);
                reject(err.error);
            });
        });
    }
}
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map
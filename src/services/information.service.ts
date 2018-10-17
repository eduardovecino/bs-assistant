import { RestManager } from "../managers/data/rest.manager";

import * as fs from "fs";
import * as rp from "request-promise";

const host = 'http://api_geocaix_host/geocaix/rest/cajeroscercanos.json';

export class InformationService extends RestManager {

    public getNearbyOffices(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });      
    }

    public getOffices(): Promise<any> {
        return new Promise((resolve, reject) => {
            const xmlString = 
            `<informacion>
                <canal></canal>
                <ubiRef>
                    <idCajero></idCajero>
                    <geoPos>
                        <lat>41,389492</lat>
                        <lon>2,135065</lon>
                    </geoPos>
                </ubiRef>
                <numCajCer></numCajCer>
                <hashMD5></hashMD5>
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
                'uri': host,
                'json': true,
                'headers': {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'text/xml'
                },
                'body': xmlString
            };

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
        }) 
    }
}
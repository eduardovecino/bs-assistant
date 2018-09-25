"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/data/rest.manager");
const fs = require("fs");
class InformationService extends rest_manager_1.RestManager {
    getOffices() {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync('mock/information/get-offices.json');
            const jsonData = JSON.parse(data.toString());
            resolve(jsonData.data);
        });
    }
}
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map
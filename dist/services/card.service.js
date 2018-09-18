"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_manager_1 = require("../managers/rest.manager");
const fs = require("fs");
class CardService extends rest_manager_1.RestManager {
    getCard() {
        if (this.isMock) {
            const data = fs.readFileSync('mock/card/get-card.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        }
        else {
            // return this.get();
            const data = fs.readFileSync('mock/card/get-card.json');
            const jsonData = JSON.parse(data.toString());
            return jsonData;
        }
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map
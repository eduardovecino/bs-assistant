"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestManager {
    constructor() {
        this.isMock = process.env.MOCK;
    }
    get() {
        return { num: 21 };
    }
}
exports.RestManager = RestManager;
//# sourceMappingURL=rest.manager.js.map
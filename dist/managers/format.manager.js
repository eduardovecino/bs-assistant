"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatManager {
    constructor() {
    }
    static getLast4numbers(number) {
        const last4Numbers = number.charAt(number.length - 4) + number.charAt(number.length - 3) + number.charAt(number.length - 2) + number.charAt(number.length - 1);
        return last4Numbers;
    }
}
exports.FormatManager = FormatManager;
//# sourceMappingURL=format.manager.js.map
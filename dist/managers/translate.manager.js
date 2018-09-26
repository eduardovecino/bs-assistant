"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TranslateManager {
    constructor() {
    }
    static getInstance() {
        if (!TranslateManager.instance) {
            TranslateManager.instance = new TranslateManager();
        }
        return TranslateManager.instance;
    }
    set config(config) {
        this._config = config;
    }
    translate(key) {
        return 'Soy un gato';
    }
}
exports.TranslateManager = TranslateManager;
//# sourceMappingURL=translate.manager.js.map
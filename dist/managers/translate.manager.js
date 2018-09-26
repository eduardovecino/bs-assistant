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
    get config() {
        return this._config;
    }
    translate(key) {
        return this._config.translations[this._config.lang][key];
    }
}
exports.TranslateManager = TranslateManager;
//# sourceMappingURL=translate.manager.js.map
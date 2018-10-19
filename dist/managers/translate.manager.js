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
    translate(key, params) {
        let literal = this._config.translations[this._config.lang][key];
        if (params) {
            console.log("PTGlen" + params.length);
            for (let i = 0; i < params.length; i++) {
                literal = literal.replace(/\{{.*?\}}/, params[i]);
            }
        }
        return literal;
    }
}
exports.TranslateManager = TranslateManager;
//# sourceMappingURL=translate.manager.js.map
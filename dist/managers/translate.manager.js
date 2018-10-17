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
        let startCharacter = literal.indexOf('{');
        let endCharacter = literal.lastIndexOf('{');
        // let startPart = literal.split('{{');
        // let endPart = startPart[1].split('}}');
        let selection = literal.slice(startCharacter - 1, endCharacter - 1);
        literal = literal.replace(selection, params);
        console.log("liiteral" + literal);
        return literal;
    }
}
exports.TranslateManager = TranslateManager;
//# sourceMappingURL=translate.manager.js.map
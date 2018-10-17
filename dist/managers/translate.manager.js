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
        const literal = this._config.translations[this._config.lang][key];
        // const startCharacter = literal.indexOf('{');
        // const endCharacter = literal.lastIndexOf('{');
        // let startPart = literal.split('{{');
        // let endPart = startPart[1].split('}}');
        // let selection = endPart[1];
        literal.replace('{{ name }}', params);
        console.log("liiteral" + literal);
        return literal;
    }
}
exports.TranslateManager = TranslateManager;
//# sourceMappingURL=translate.manager.js.map
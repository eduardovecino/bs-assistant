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
            // for(let i=0; i<params.lenght+1; i++){
            literal = literal.replace(/\{{.*?\}}/, params[0]);
            // }
            // let startCharacter = literal.indexOf('{');
            // let endCharacter = literal.lastIndexOf('}');
            // let selection = literal.slice(startCharacter - 1, endCharacter + 1);
            // literal = literal.replace(selection, params);
        }
        return literal;
    }
    translate2(key, [params]) {
        let literal = this._config.translations[this._config.lang][key];
        if (params) {
            for (let i = 0; i < params.lenght + 1; i++) {
                literal = literal.replace(/\{{.*?\}}/, params[0]);
            }
            // let startCharacter = literal.indexOf('{');
            // let endCharacter = literal.lastIndexOf('}');
            // let selection = literal.slice(startCharacter - 1, endCharacter + 1);
            // literal = literal.replace(selection, params);
        }
        return literal;
    }
}
exports.TranslateManager = TranslateManager;
//.replace(/\{{.*?\}}/, ['adios1'])
//# sourceMappingURL=translate.manager.js.map
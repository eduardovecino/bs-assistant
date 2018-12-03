export class TranslateManager {

    private static instance: TranslateManager;
    private _config: { lang, translations };

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

    get config(): any {
        return this._config;
    }

    public translate(key, params?) {
        let literal = this._config.translations[this._config.lang][key];
        if (params) {
            for (let i = 0; i < params.length; i++) {
                literal = literal.replace(/\{{.*?\}}/, params[i]);
            }
        }
        return literal;
    }
}
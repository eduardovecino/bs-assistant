

export class TranslateManager {

    private static instance: TranslateManager;
    private _config: {lang, translations};

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
        const literal = this._config.translations[this._config.lang][key];
        // Welcome to Banco Sabadell, {{ name }}
        return literal;
    }
}
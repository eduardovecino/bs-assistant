

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
        let literal = this._config.translations[this._config.lang][key];
        if (params){
            let startCharacter = literal.indexOf('{');
            let endCharacter = literal.lastIndexOf('}');
            let selection = literal.slice(startCharacter - 1, endCharacter + 1);
            literal = literal.replace(selection, params);
        }
        return literal;
    }
}
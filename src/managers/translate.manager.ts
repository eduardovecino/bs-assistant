

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
        console.log("liiteral1" + literal);

        let startCharacter = literal.indexOf('{');
        console.log("liiteral2" + startCharacter);

        let endCharacter = literal.lastIndexOf('}');
        console.log("liiteral3" + endCharacter);
        
        // let startPart = literal.split('{{');
        // let endPart = startPart[1].split('}}');
        let selection = literal.slice(startCharacter-1, endCharacter+1);
        console.log("liiteral4" + selection);

        literal = literal.replace(selection , params);
        console.log("liiteral5" + literal);
        return literal;
    }
}
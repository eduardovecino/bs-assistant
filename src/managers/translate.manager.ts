

export class TranslateManager {

    private static instance: TranslateManager;
    private _config: any;


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

    public translate(key) {
        return 'Soy un gato';
    }
}
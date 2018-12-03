"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translate_manager_1 = require("../translate.manager");
const ssml_gib_1 = require("ssml-gib");
class StartDFManager {
    static generateLoginSimpleResponse() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.login')]);
    }
    static generateSigninSimpleResponse(signin) {
        if (signin.status === 'OK') {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.get_signin.ok')]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.get_signin.failure')]);
        }
    }
    static generateCancelSimpleResponse() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.cancel')]);
    }
    static generateHelpSimpleResponseScreen() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.help.screen')]);
    }
    static generateHelpSimpleResponseNoScreen() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.help.no_screen')]);
    }
}
StartDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.StartDFManager = StartDFManager;
//# sourceMappingURL=start.manager.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translate_manager_1 = require("../translate.manager");
const ssml_gib_1 = require("ssml-gib");
class StartDFManager {
    static generatePermissionSimpleResponse(confirmationGranted, name) {
        if (confirmationGranted) {
            if (name) {
                return (ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.product.get_permission.answer_%name%', [name])]));
            }
        }
        else {
            return this.translateManager.translate('intent.product.get_permission.failure');
        }
    }
    static generateLoginSimpleResponse() {
        return this.translateManager.translate('intent.product.login');
    }
    static generateSigninSimpleResponse(signin) {
        if (signin.status === 'OK') {
            return this.translateManager.translate('intent.product.get_signin.ok');
        }
        else {
            return this.translateManager.translate('intent.product.get_signin.failure');
        }
    }
    static generateCancelSimpleResponse() {
        return this.translateManager.translate('intent.product.cancel');
    }
    static generateHelpSimpleResponse() {
        return this.translateManager.translate('intent.product.help');
    }
}
StartDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.StartDFManager = StartDFManager;
//# sourceMappingURL=start.manager.js.map
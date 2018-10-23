import { FormatManager } from '../../managers/format.manager';
import { TranslateManager } from "../translate.manager";
import { Ssml } from 'ssml-gib';


export class StartDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generatePermissionSimpleResponse(confirmationGranted, name) {
        if (confirmationGranted) {
            if (name) {
                return (Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.start.get_permission.answer_%name%', [name])]));
            }
        } else {
            return this.translateManager.translate('intent.start.get_permission.failure');
        }
        
    }

    public static generateLoginSimpleResponse() {
        return this.translateManager.translate('intent.start.login');
    }

    public static generateSigninSimpleResponse(signin) {
        if (signin.status === 'OK') {
            return this.translateManager.translate('intent.start.get_signin.ok');

        } else {
            return this.translateManager.translate('intent.start.get_signin.failure');
        }
    }

    public static generateCancelSimpleResponse() {
        return this.translateManager.translate('intent.start.cancel');
    }

    public static generateHelpSimpleResponse() {
        return this.translateManager.translate('intent.start.help');
    }
    
}

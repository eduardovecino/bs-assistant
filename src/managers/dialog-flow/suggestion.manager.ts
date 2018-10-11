import { Suggestions } from "actions-on-google";
import { SUGGESTIONS } from "../../constants/suggestions";
import { TOKEN } from "../../constants/token";



export class SuggestionDFManager {


    constructor() {
    }

    public static generateSuggestions() {
        if (TOKEN.TOKEN_MOCK) {
            return (new Suggestions(SUGGESTIONS.LOGGED_SUGGESTIONS));
        } else {
            return (new Suggestions(SUGGESTIONS.NOT_LOGGED_SUGGESTIONS));
        }
    }

    public static generateCardSuggestions() {
            return (new Suggestions(SUGGESTIONS.CARD_SUGGESTIONS));
    }

    public static generateAccountSuggestions() {
        return (new Suggestions(SUGGESTIONS.ACCOUNT_SUGGESTIONS));
    }

    
}
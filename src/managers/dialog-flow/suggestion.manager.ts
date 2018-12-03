import { Suggestions } from "actions-on-google";
import { SUGGESTIONS } from "../../constants/suggestions";



export class SuggestionDFManager {


    constructor() {
    }

    public static generateSuggestions() {
        // if (TOKEN.TOKEN_MOCK) {
            return (new Suggestions(SUGGESTIONS.LOGGED_SUGGESTIONS));
        // } else {
            //TODO NOT LOGGED SUGGESTIONS
            // return (new Suggestions(SUGGESTIONS.LOGGED_SUGGESTIONS));
        // }
    }

    public static generateCardSuggestions() {
            return (new Suggestions(SUGGESTIONS.CARD_SUGGESTIONS));
    }

    public static generateAccountSuggestions() {
        return (new Suggestions(SUGGESTIONS.ACCOUNT_SUGGESTIONS));
    }

    
}
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

    
}
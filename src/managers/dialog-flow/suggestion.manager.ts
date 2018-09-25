import { Suggestions } from "actions-on-google";
import { SUGGESTIONS } from "../../constants/suggestions";


export class SuggestionDFManager {

    private static logged = '0';

    constructor() {
    }

    public static generateSuggestions(conv) {
        if (this.logged === '1') {
            return (new Suggestions(SUGGESTIONS.LOGGED_SUGGESTIONS));
        } else {
            return (new Suggestions(SUGGESTIONS.NOT_LOGGED_SUGGESTIONS));
        }
    }

    
}
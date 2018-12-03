"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const suggestions_1 = require("../../constants/suggestions");
class SuggestionDFManager {
    constructor() {
    }
    static generateSuggestions() {
        // if (TOKEN.TOKEN_MOCK) {
        return (new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.LOGGED_SUGGESTIONS));
        // } else {
        //TODO NOT LOGGED SUGGESTIONS
        // return (new Suggestions(SUGGESTIONS.LOGGED_SUGGESTIONS));
        // }
    }
    static generateCardSuggestions() {
        return (new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.CARD_SUGGESTIONS));
    }
    static generateAccountSuggestions() {
        return (new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.ACCOUNT_SUGGESTIONS));
    }
}
exports.SuggestionDFManager = SuggestionDFManager;
//# sourceMappingURL=suggestion.manager.js.map
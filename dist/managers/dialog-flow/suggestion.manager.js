"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const suggestions_1 = require("../../constants/suggestions");
const token_1 = require("../../constants/token");
class SuggestionDFManager {
    constructor() {
    }
    static generateSuggestions() {
        if (token_1.TOKEN.TOKEN_MOCK) {
            return (new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.LOGGED_SUGGESTIONS));
        }
        else {
            return (new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.NOT_LOGGED_SUGGESTIONS));
        }
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
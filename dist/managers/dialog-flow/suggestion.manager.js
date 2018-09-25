"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const suggestions_1 = require("../../constants/suggestions");
class SuggestionDFManager {
    constructor() {
    }
    static generateSuggestions() {
        // if (this.logged === '1') {
        //     return (new Suggestions(SUGGESTIONS.LOGGED_SUGGESTIONS));
        // } else {
        return (new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.NOT_LOGGED_SUGGESTIONS));
    }
}
SuggestionDFManager.logged = '0';
exports.SuggestionDFManager = SuggestionDFManager;
//# sourceMappingURL=suggestion.manager.js.map
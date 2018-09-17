"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const suggestions_1 = require("../../constants/suggestions");
class BaseIntents {
    constructor() {
        this.logged = '0';
    }
    suggestions(conv) {
        if (this.logged === '1') {
            conv.ask(new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.LOGGED_SUGGESTIONS));
        }
        else {
            conv.ask(new actions_on_google_1.Suggestions(suggestions_1.SUGGESTIONS.NOT_LOGGED_SUGGESTIONS));
        }
    }
}
exports.BaseIntents = BaseIntents;
//# sourceMappingURL=base-intents.js.map
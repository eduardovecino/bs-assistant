"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InfoIntents /*extends BaseIntent*/ {
    intents(app) {
        app.intent('Oficinas', conv => {
            conv.ask(`Oficinas`);
        });
    }
}
exports.InfoIntents = InfoIntents;
//# sourceMappingURL=info.js.map
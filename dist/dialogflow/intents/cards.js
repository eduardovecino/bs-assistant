"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardIntents /*extends BaseIntent*/ {
    intents(app) {
        app.intent('Tarjetas', conv => {
            conv.ask(`Tarjetas`);
        });
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
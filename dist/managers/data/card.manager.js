"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardManager {
    constructor() {
    }
    static getCardByLast4(cards, last4) {
        if (cards.length === 1) {
            return cards[0];
        }
        else if (cards.length > 1) {
            for (let i = 0; i < cards.length; i++) {
                const card4Numbers = cards[i].relatedAccount.charAt(cards[i].relatedAccount.length - 4) + cards[i].relatedAccount.charAt(cards[i].relatedAccount.length - 3) + cards[i].relatedAccount.charAt(cards[i].relatedAccount.length - 2) + cards[i].relatedAccount.charAt(cards[i].relatedAccount.length - 1);
                if (parseInt(last4) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                    console.log("RETURN0", cards[i]);
                    return cards[i];
                }
            }
        }
        return null;
    }
    static getCardByOption(cards, option) {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].contract === option) {
                return cards[i];
            }
        }
        return null;
    }
}
exports.CardManager = CardManager;
//# sourceMappingURL=card.manager.js.map
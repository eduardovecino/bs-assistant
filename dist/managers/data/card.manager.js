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
                const card4Numbers = cards[i].numberCodificatedProduct.charAt(cards[i].numberCodificatedProduct.length - 4) + cards[i].numberCodificatedProduct.charAt(cards[i].numberCodificatedProduct.length - 3) + cards[i].numberCodificatedProduct.charAt(cards[i].numberCodificatedProduct.length - 2) + cards[i].numberCodificatedProduct.charAt(cards[i].numberCodificatedProduct.length - 1);
                if (parseInt(last4) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                    return cards[i];
                }
            }
        }
        return null;
    }
    static getCardByOption(cards, option) {
        console.log("PT2:", option);
        for (let i = 0; i < cards.length; i++) {
            console.log("PT3:", cards[i].productNumber);
            if (cards[i].productNumber === option) {
                console.log("PT4:", cards[i]);
                return cards[i];
            }
        }
        return null;
    }
}
exports.CardManager = CardManager;
//# sourceMappingURL=card.manager.js.map
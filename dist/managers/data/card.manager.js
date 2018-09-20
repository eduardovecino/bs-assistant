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
                const card4Numbers = cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 4) + cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 3) + cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 2) + cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 1);
                if (parseInt(last4) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                    return cards[i];
                }
            }
        }
        return null;
    }
    static getCardByOption(cards, option) {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].contrato === option) {
                return ('Has seleccionado la tarjeta' + cards[i].cuentaRelacionada + ' con un saldo disponible de ' + cards[i].saldoDisponible + ' €');
            }
            else {
                return (' No podemos mostrar la tarjeta' + cards[i].contrato);
            }
        }
    }
}
exports.CardManager = CardManager;
//# sourceMappingURL=card.manager.js.map
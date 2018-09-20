"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
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
    static generateMovementsTable(card) {
        const tmp = {
            dividers: true,
            columns: ['Concepto', 'Fecha', 'Importe'],
            rows: []
        };
        card.detalleMesActual.forEach((detail) => {
            tmp.rows.push({
                cells: [detail.concepto, detail.fecha, detail.importe],
                dividerAfter: true
            });
        });
        return new actions_on_google_1.Table(tmp);
    }
}
exports.CardManager = CardManager;
//# sourceMappingURL=card.manager.js.map
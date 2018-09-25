"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const format_manager_1 = require("../../managers/format.manager");
const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg';
class CardDFManager {
    constructor() {
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
    static cardsCarousel(cards) {
        if (cards.length > 1) {
            const tmp = {
                title: 'Mis Tarjetas',
                items: {}
            };
            cards.forEach((card) => {
                const last4Numbers = format_manager_1.FormatManager.getLast4numbers(card.cuentaRelacionada);
                tmp.items[card.contrato] = {
                    title: card.contrato,
                    description: `**** **** **** **** ${last4Numbers}`,
                    image: {
                        url: cardUrlImage,
                        accessibilityText: card.contrato
                    }
                };
            });
            return (new actions_on_google_1.Carousel(tmp));
        }
        else {
            return ('El saldo  de tu tarjeta ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible + ' €');
        }
    }
}
exports.CardDFManager = CardDFManager;
//# sourceMappingURL=card.manager.js.map
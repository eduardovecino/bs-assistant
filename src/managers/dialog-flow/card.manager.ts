import { Table, TableOptions, Carousel } from "actions-on-google";
import { FormatManager } from '../../managers/format.manager';
import { TranslateManager } from "../translate.manager";


const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg'

export class CardDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generateCardsSimpleResponse(cards) {
        let response = ' ';
        cards.forEach(card => {
            response = response + FormatManager.getLast4numbers(card.cuentaRelacionada) + ", ";
        });
        return this.translateManager.translate('intent.card.simple_response_%number%_%cards%', [cards.length, response]);
    }

    public static generateCardsCarousel(cards) {
        if (cards.length > 1) {
            const tmp = {
                title: 'Mis Tarjetas',
                items: {}
            };
            cards.forEach((card) => {
                const last4Numbers = FormatManager.getLast4numbers(card.cuentaRelacionada);
                tmp.items[card.contrato] = {
                    title: card.contrato,
                    description: `**** **** **** **** ${last4Numbers}`,
                    image: {
                        url: cardUrlImage,
                        accessibilityText: card.contrato
                    }
                };
            });
            return (new Carousel(tmp));
        } else {
            return ('El saldo  de tu tarjeta ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible + ' €');
        }
    }

    public static generateMovementsTable(card) {
        const tmp: TableOptions = {
            dividers: true,
            columns: ['Concepto', 'Fecha', 'Importe'],
            rows: []
        };
        card.detalleMesActual.forEach((detail) => {
            tmp.rows.push(
                {
                    cells: [detail.concepto, detail.fecha, detail.importe],
                    dividerAfter: true
                }
            );
        });
        return new Table(tmp);
    }
}
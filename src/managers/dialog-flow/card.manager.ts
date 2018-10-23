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
                title: this.translateManager.translate('intent.card.list.title'),
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
            return this.translateManager.translate('intent.card.balance_%card%_%balance%', [cards[0].cuentaRelacionada, cards[0].saldoDisponible])
        }
    }

    public static generateSelectedCardSimpleResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.selected_card_%card%', [card.cuentaRelacionada]);
        } else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }

    public static generateBalanceCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.balance_%card%_%balance%', [card.cuentaRelacionada, card.saldoDisponible]);
        } else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }

    public static generateBlockCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.block_%card%', [card.cuentaRelacionada]);
        } else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }

    public static generateSettlementCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.settlement%card%_%date%', [card.cuentaRelacionada, card.fechaProxiLiquidacion]);
        } else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }

    public static generateLimitsCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.block_%card%_%authorized_limit%_%credit_limit%', [card.cuentaRelacionada, card.limiteAutorizado, card.limiteCredito]);
        } else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }

    public static generateMovementsCardSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length + 1;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + this.translateManager.translate('intent.card.movements.simple_response.pre_%concept%_%import%', [movements[i].concepto, movements[i].importe])
            };
            return this.translateManager.translate('intent.card.movements.simple_response_%number%_%movements%', [movements.length, response]);
        } else {
            return this.translateManager.translate('intent.card.movements.no_movements');
        }
    }

    public static generateMovementsCardTable(movements) {
        const tmp: TableOptions = {
            dividers: true,
            columns: [this.translateManager.translate('intent.card.movements.table.column.first'), this.translateManager.translate('intent.card.movements.table.column.second'), this.translateManager.translate('intent.card.movements.table.column.third')],
            rows: []
        };
        movements.forEach((detail) => {
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("../translate.manager");
const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg';
class CardDFManager {
    static generateCardsSimpleResponseScreen(cards) {
        return this.translateManager.translate('intent.card.simple_response.screen_%number%', [cards.length]);
    }
    static generateCardsSimpleResponseNoScreen(cards) {
        let response = ' ';
        cards.forEach(card => {
            response = response + card.last4Numbers + ", ";
        });
        return this.translateManager.translate('intent.card.simple_response.no_screen_%number%_%cards%', [cards.length, response]);
    }
    static generateCardsCarousel(cards) {
        if (cards.length > 1) {
            const tmp = {
                title: this.translateManager.translate('intent.card.list.title'),
                items: {}
            };
            cards.forEach((card) => {
                tmp.items[card.contract] = {
                    title: card.contract,
                    description: `**** **** **** **** ${card.last4Numbers}`,
                    image: {
                        url: cardUrlImage,
                        accessibilityText: card.contract
                    }
                };
            });
            return (new actions_on_google_1.Carousel(tmp));
        }
        else {
            return this.translateManager.translate('intent.card.balance_%card%_%balance%', [cards[0].last4Numbers, cards[0].availableBalance]);
        }
    }
    static generateSelectedCardSimpleResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.selected_card_%card%', [card.last4Numbers]);
        }
        else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }
    static generateBalanceCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.balance_%card%_%balance%', [card.last4Numbers, card.availableBalance]);
        }
        else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }
    static generateBlockCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.block_%card%', [card.last4Numbers]);
        }
        else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }
    static generateSettlementCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.settlement%card%_%date%', [card.last4Numbers, card.nextSettlementDate]);
        }
        else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }
    static generateLimitsCardResponse(card) {
        if (card) {
            return this.translateManager.translate('intent.card.limit%card%_%authorized_limit%_%credit_limit%', [card.last4Numbers, card.authorizedLimit, card.creditLimit]);
        }
        else {
            return this.translateManager.translate('intent.card.null_response');
        }
    }
    static generateMovementsCardSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + this.translateManager.translate('intent.card.movements.simple_response.pre_%concept%_%import%', [movements[i].concept, movements[i].amount]);
            }
            ;
            return this.translateManager.translate('intent.card.movements.simple_response_%number%_%movements%', [movements.length, response]);
        }
        else {
            return this.translateManager.translate('intent.card.movements.no_movements');
        }
    }
    static generateMovementsCardTable(movements) {
        const tmp = {
            dividers: true,
            columns: [this.translateManager.translate('intent.card.movements.table.column.first'), this.translateManager.translate('intent.card.movements.table.column.second'), this.translateManager.translate('intent.card.movements.table.column.third')],
            rows: []
        };
        movements.forEach((detail) => {
            tmp.rows.push({
                cells: [detail.concept, detail.date, detail.amount + ' €'],
                dividerAfter: true
            });
        });
        return new actions_on_google_1.Table(tmp);
    }
    static generateCardHelpSimpleResponseScreen() {
        return this.translateManager.translate('intent.card.help.screen');
    }
    static generateCardHelpSimpleResponseNoScreen() {
        return this.translateManager.translate('intent.card.help.no_screen');
    }
}
CardDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.CardDFManager = CardDFManager;
//# sourceMappingURL=card.manager.js.map
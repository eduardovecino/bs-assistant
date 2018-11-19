"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("../translate.manager");
const ssml_gib_1 = require("ssml-gib");
class CardDFManager {
    static generateCardsSimpleResponseScreen(cards) {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.simple_response.screen_%number%', [cards.length])]);
    }
    static generateCardsSimpleResponseNoScreen(cards) {
        let response = ' ';
        cards.forEach(card => {
            response = response + card.last4Numbers + ", ";
        });
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.simple_response.no_screen_%number%_%cards%', [cards.length, response])]);
    }
    static generateCardsCarousel(cards) {
        if (cards.length > 1) {
            const tmp = {
                title: this.translateManager.translate('intent.card.list.title'),
                items: {}
            };
            cards.forEach((card) => {
                tmp.items[card.productNumber] = {
                    title: card.description,
                    description: `**** **** **** **** ${card.last4Numbers}`,
                    image: {
                        url: card.image,
                        accessibilityText: card.description
                    }
                };
            });
            return (new actions_on_google_1.Carousel(tmp));
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.balance_%card%_%balance%', [cards[0].last4Numbers, cards[0].balance])]);
        }
    }
    static generateSelectedCardSimpleResponse(last4Numbers) {
        if (last4Numbers) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.selected_card_%card%', [last4Numbers])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }
    static generateBalanceCardResponse(informationCard, last4Numbers) {
        if (last4Numbers) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.balance_%card%_%balance%', [last4Numbers, informationCard.availableBalance])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }
    static generateBlockCardResponse(informationCard, last4Numbers) {
        if (last4Numbers) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.block_%card%', [last4Numbers])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }
    static generateSettlementCardResponse(informationCard, last4Numbers) {
        if (last4Numbers) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.settlement%card%_%date%', [last4Numbers, informationCard.nextSettlementDate])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }
    static generateLimitsCardResponse(informationCard, last4Numbers) {
        if (last4Numbers) {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.limit%card%_%authorized_limit%_%credit_limit%', [last4Numbers, informationCard.authorizedLimit, informationCard.creditLimit])]);
        }
        else {
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }
    static generateMovementsCardSimpleResponse(movements) {
        console.log("PTG");
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.simple_response.pre_%concept%_%import%', [movements[i].concept, movements[i].amount])]);
            }
            ;
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.simple_response_%number%_%movements%', [movements.length, response])]);
        }
        else {
            console.log("ENTRO324");
            return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.no_movements')]);
        }
    }
    static generateMovementsCardTable(movements) {
        const tmp = {
            dividers: true,
            columns: [this.translateManager.translate('intent.card.movements.table.column.first'), this.translateManager.translate('intent.card.movements.table.column.second'), this.translateManager.translate('intent.card.movements.table.column.third')],
            rows: []
        };
        let length = (movements.length > 10) ? 10 : movements.length;
        for (let i = 0; i < length; i++) {
            tmp.rows.push({
                cells: [movements[i].concept, movements[i].date, movements[i].amount + ' €'],
                dividerAfter: true
            });
        }
        return new actions_on_google_1.Table(tmp);
    }
    static generateMovementsCardListSimpleResponse(movements) {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.list.simple_response_%number%', [movements.length])]);
    }
    static generateMovementsCardList(movements) {
        const tmp = {
            title: this.translateManager.translate('intent.card.movements.list.title'),
            items: {}
        };
        let length = (movements.length > 12) ? 12 : movements.length;
        for (let i = 0; i < length; i++) {
            tmp.items[i] = {
                title: movements[i].concept,
                description: ('Importe: ' + movements[i].amount + '€' + '\n' + 'Fecha: ' + movements[i].date)
            };
        }
        return (new actions_on_google_1.List(tmp));
    }
    static generateCardHelpSimpleResponseScreen() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.help.screen')]);
    }
    static generateCardHelpSimpleResponseNoScreen() {
        return ssml_gib_1.Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.help.no_screen')]);
    }
}
CardDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.CardDFManager = CardDFManager;
//# sourceMappingURL=card.manager.js.map
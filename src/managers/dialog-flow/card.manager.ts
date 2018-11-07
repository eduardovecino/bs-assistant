import { Table, TableOptions, Carousel } from "actions-on-google";
import { TranslateManager } from "../translate.manager";
import { Ssml } from 'ssml-gib';


const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg'

export class CardDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generateCardsSimpleResponseScreen(cards) {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.simple_response.screen_%number%', [cards.length])]);
    }

    public static generateCardsSimpleResponseNoScreen(cards) {
        let response = ' ';
        cards.forEach(card => {
            response = response + card.last4Numbers + ", ";
        });
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.simple_response.no_screen_%number%_%cards%', [cards.length, response])]);
    }

    public static generateCardsCarousel(cards) {
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
                        url: cardUrlImage,
                        accessibilityText: card.description
                    }
                };
            });
            return (new Carousel(tmp));
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.balance_%card%_%balance%', [cards[0].last4Numbers, cards[0].balance])])
        }
    }

    public static generateSelectedCardSimpleResponse(last4Numbers) {
        if (last4Numbers) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.selected_card_%card%', [last4Numbers])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }

    public static generateBalanceCardResponse(informationCard, last4Numbers) {
        if (informationCard) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.balance_%card%_%balance%', [last4Numbers, informationCard.availableBalance])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }

    public static generateBlockCardResponse(informationCard, last4Numbers) {
        if (informationCard) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.block_%card%', [last4Numbers])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }

    public static generateSettlementCardResponse(informationCard, last4Numbers) {
        if (informationCard) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.settlement%card%_%date%', [last4Numbers, informationCard.nextSettlementDate])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }

    public static generateLimitsCardResponse(informationCard, last4Numbers) {
        if (informationCard) {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.limit%card%_%authorized_limit%_%credit_limit%', [last4Numbers, informationCard.authorizedLimit, informationCard.creditLimit])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.null_response')]);
        }
    }

    public static generateMovementsCardSimpleResponse(movements) {
        let response = ' ';
        let length = (movements.length > 3) ? 3 : movements.length;
        if (movements) {
            for (let i = 0; i < length; i++) {
                response = response + Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.simple_response.pre_%concept%_%import%', [movements[i].concept, movements[i].amount])])
            };
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.simple_response_%number%_%movements%', [movements.length, response])]);
        } else {
            return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.movements.no_movements')]);
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
                    cells: [detail.concept, detail.date, detail.amount+' €'],
                    dividerAfter: true
                }
            );
        });
        return new Table(tmp);
    }

    public static generateCardHelpSimpleResponseScreen() {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.help.screen')]);
    }

    public static generateCardHelpSimpleResponseNoScreen() {
        return Ssml.wrapSsmlSpeak([this.translateManager.translate('intent.card.help.no_screen')]);
    }
}
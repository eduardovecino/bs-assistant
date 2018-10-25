"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const card_manager_1 = require("../../managers/data/card.manager");
const card_manager_2 = require("../../managers/dialog-flow/card.manager");
const suggestion_manager_1 = require("../../managers/dialog-flow/suggestion.manager");
const translate_manager_1 = require("../../managers/translate.manager");
class CardIntents {
    constructor() {
        this.cardService = new card_service_1.CardService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        const Contexts = {
            selected_card: 'selected_card',
            selected_account: 'selected_account'
        };
        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', (conv) => __awaiter(this, void 0, void 0, function* () {
            let cards = yield this.cardService.getCards();
            conv.contexts.delete(Contexts.selected_account);
            if (cards) {
                const cardsSimpleResponse = card_manager_2.CardDFManager.generateCardsSimpleResponse(cards);
                const cardsCarousel = card_manager_2.CardDFManager.generateCardsCarousel(cards);
                conv.ask(cardsSimpleResponse);
                conv.ask(cardsCarousel);
            }
            else {
                conv.ask(this.translateManager.translate('intent.card.null_response'));
            }
        }));
        //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, input, option) => __awaiter(this, void 0, void 0, function* () {
            let cards = yield this.cardService.getCards();
            const cardSelected = card_manager_1.CardManager.getCardByOption(cards, option);
            conv.contexts.set(Contexts.selected_card, 5);
            if (cardSelected) {
                const response = card_manager_2.CardDFManager.generateSelectedCardSimpleResponse(cardSelected);
                conv.ask(response + this.translateManager.translate('intent.card.help'));
                conv.ask(suggestion_manager_1.SuggestionDFManager.generateCardSuggestions());
            }
            else {
                conv.ask(this.translateManager.translate('intent.card.selected_card.failure_%card%', option));
            }
            //BLOQUEAR TARJETA SELECCIONADA
            app.intent('Bloquear tarjeta - seleccionada', (conv) => {
                this.cardBlock(cardSelected, conv);
            });
            //SALDO TARJETA SELECCIONADA
            app.intent('Saldo tarjeta - seleccionada', (conv) => {
                this.cardBalance(cardSelected, conv);
            });
            // MOVIMIENTOS TARJETA SELECCIONADA
            app.intent('Movimientos tarjeta - seleccionada', (conv) => {
                let movements = cardSelected.detalleMesActual;
                this.cardMovements(movements, conv);
            });
            //FECHA LIQUIDACION TARJETA SELECCIONADA
            app.intent('Fecha liquidacion - seleccionada', (conv) => {
                this.cardSettlement(cardSelected, conv);
            });
            //LIMITES TARJETA SELECCIONADA
            app.intent('Limites - seleccionada', (conv) => {
                this.cardLimits(cardSelected, conv);
            });
            //AYUDA TARJETAS
            app.intent('ayuda - tarjetas', (conv) => {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const cardHelpSimpleResponseScreen = card_manager_2.CardDFManager.generateCardHelpSimpleResponseScreen();
                    conv.ask(cardHelpSimpleResponseScreen);
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateCardSuggestions());
                }
                else {
                    const cardHelpSimpleResponseNoScreen = card_manager_2.CardDFManager.generateCardHelpSimpleResponseNoScreen();
                    conv.ask(cardHelpSimpleResponseNoScreen);
                }
            });
        }));
        //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => __awaiter(this, void 0, void 0, function* () {
            let card = yield this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardBlock(card, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //SALDO TARJETA
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => __awaiter(this, void 0, void 0, function* () {
            let card = yield this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardBalance(card, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //FECHA LIQUIDACION TARJETA
        app.intent('Fecha Liquidación', (conv, { last4CardNumbers }, { tipo_tarjeta }) => __awaiter(this, void 0, void 0, function* () {
            let card = yield this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardSettlement(card, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //LIMITES TARJETA
        app.intent('Límites', (conv, { last4CardNumbers }, { tipo_tarjeta }) => __awaiter(this, void 0, void 0, function* () {
            let card = yield this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardLimits(card, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
        //MOVIMIENTOS
        app.intent('Movimientos Tarjetas', (conv, { last4CardNumbers }, { tipo_tarjeta }) => __awaiter(this, void 0, void 0, function* () {
            let card = yield this.cardService.getCard(last4CardNumbers);
            let movements = card.currentMonthDetail;
            if (card) {
                this.cardMovements(movements, conv);
            }
            else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        }));
    }
    cardBalance(card, conv) {
        const response = card_manager_2.CardDFManager.generateBalanceCardResponse(card);
        conv.ask(response);
    }
    cardBlock(card, conv) {
        const response = card_manager_2.CardDFManager.generateBlockCardResponse(card);
        conv.ask(response);
    }
    cardSettlement(card, conv) {
        const response = card_manager_2.CardDFManager.generateSettlementCardResponse(card);
        conv.ask(response);
    }
    cardLimits(card, conv) {
        const response = card_manager_2.CardDFManager.generateLimitsCardResponse(card);
        conv.ask(response);
    }
    cardMovements(movements, conv) {
        const cardMovementsSimpleResponse = card_manager_2.CardDFManager.generateMovementsCardSimpleResponse(movements);
        conv.ask(cardMovementsSimpleResponse);
        if (movements.length > 1) {
            const cardMovementsTable = card_manager_2.CardDFManager.generateMovementsCardTable(movements);
            conv.ask(cardMovementsTable);
        }
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
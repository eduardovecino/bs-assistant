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
const format_manager_1 = require("../../managers/format.manager");
const ssml_gib_1 = require("ssml-gib");
class CardIntents {
    constructor() {
        this.cardService = new card_service_1.CardService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        // const nullResponse = `No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta`;
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
        // //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, input, option) => {
            this.cardService.getCards().then(cards => {
                const cardSelected = card_manager_1.CardManager.getCardByOption(cards, option);
                const lastNumbers = format_manager_1.FormatManager.getLast4numbers(cardSelected.cuentaRelacionada);
                conv.contexts.set(Contexts.selected_card, 5);
                console.log('hola hola' + Contexts.selected_account);
                if (cardSelected) {
                    conv.ask(ssml_gib_1.Ssml.wrapSsmlSpeak([`Has seleccionado la tarjeta finalizada en ${cardSelected.cuentaRelacionada}, el saldo es de ${cardSelected.saldoDisponible} €. ${ssml_gib_1.Ssml.break({ s: 3 })} ¿Quieres saber algo más a cerca de tus tarjetas?`]));
                }
                else {
                    conv.ask(`No podemos mostrar la tarjeta`);
                }
                app.intent('Bloquear tarjeta - seleccionada', (conv) => {
                    conv.ask(`Tu tarjeta finalizada en: ${cardSelected.cuentaRelacionada}. Ha sido bloqueada exitosamente, para desbloquearla deberás utilizar la APP del Banco Sabadell`);
                });
                app.intent('Saldo tarjeta - seleccionada', (conv) => {
                    conv.ask(`El saldo de tu tarjeta ${cardSelected.cuentaRelacionada} es de ${cardSelected.saldoDisponible} €`);
                });
                app.intent('Fecha liquidacion - seleccionada', (conv) => {
                    conv.ask(`La fecha próxima de liquidación de tu tarjeta finalizada en ${cardSelected.cuentaRelacionada} es de ${cardSelected.fechaProxiLiquidacion} €`);
                });
                app.intent('Limites - seleccionada', (conv) => {
                    conv.ask(`Los límites de tu tarjeta finalizada en ${cardSelected.cuentaRelacionada} son, limite autorizado: ${cardSelected.limiteAutorizado} € y limite crédito: ${cardSelected.limiteCredito} €`);
                });
                app.intent('ayuda - tarjetas', (conv) => {
                    conv.ask(this.translateManager.translate('intent.card.help'));
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateCardSuggestions());
                });
            });
        });
        //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`Tu tarjeta con el número de contrato: ${card.contrato}. Ha sido bloqueada exitosamente, para desbloquearla deberás utilizar la APP del Banco Sabadell`);
                }
                else {
                    conv.ask(this.translateManager.translate('intent.account.null_response'));
                }
            });
        });
        //SALDO TARJETA
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`El saldo de tu tarjeta ${last4CardNumbers} es de ${card.saldoDisponible} €`);
                    conv.ask(this.translateManager.translate('intent.card.help'));
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
                }
                else {
                    conv.ask(this.translateManager.translate('intent.account.null_response'));
                }
            });
        });
        //FECHA LIQUIDACION TARJETA
        app.intent('Fecha Liquidación', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`La fecha próxima de liquidación de tu tarjeta finalizada en ${last4CardNumbers} es ${card.fechaProxiLiquidacion}`);
                    conv.ask(this.translateManager.translate('intent.card.help'));
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
                }
                else {
                    conv.ask(this.translateManager.translate('intent.account.null_response'));
                }
            });
        });
        //LIMITES TARJETA
        app.intent('Límites', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`Los límites de tu tarjeta finalizada en ${last4CardNumbers} son, limite autorizado: ${card.limiteAutorizado} € y limite crédito: ${card.limiteCredito} €`);
                    conv.ask(this.translateManager.translate('intent.card.help'));
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
                }
                else {
                    conv.ask(this.translateManager.translate('intent.account.null_response'));
                }
            });
        });
        //MOVIMIENTOS
        app.intent('Movimientos Tarjetas', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = card_manager_2.CardDFManager.generateMovementsTable(card);
                    conv.ask(`Aquí tienes los movimientos`);
                    conv.ask(movementsTable);
                }
                else {
                    conv.ask(this.translateManager.translate('intent.account.null_response'));
                }
            });
        });
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
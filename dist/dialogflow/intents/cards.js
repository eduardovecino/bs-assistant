"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const card_manager_1 = require("../../managers/data/card.manager");
const card_manager_2 = require("../../managers/dialog-flow/card.manager");
const format_manager_1 = require("../../managers/format.manager");
const suggestion_manager_1 = require("../../managers/dialog-flow/suggestion.manager");
const ssml_gib_1 = require("ssml-gib");
class CardIntents /*extends BaseIntent*/ {
    constructor() {
        this.cardService = new card_service_1.CardService();
    }
    intents(app) {
        const nullResponse = `No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta`;
        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            this.cardService.getCards().then(cards => {
                let response = "Tienes " + cards.length + " tarjetas. Terminadas en:";
                if (cards) {
                    cards.forEach(card => {
                        response = response + format_manager_1.FormatManager.getLast4numbers(card.cuentaRelacionada) + ", ";
                    });
                    const carouselOfCards = card_manager_2.CardDFManager.cardsCarousel(cards);
                    conv.ask(response + "¿Cúal deseas seleccionar?");
                    conv.ask(carouselOfCards);
                }
                else {
                    conv.ask(`No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros`);
                }
            });
        });
        // //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, input, option) => {
            this.cardService.getCards().then(cards => {
                const cardSelected = card_manager_1.CardManager.getCardByOption(cards, option);
                if (cardSelected) {
                    const lastNumbers = format_manager_1.FormatManager.getLast4numbers(cardSelected.cuentaRelacionada);
                    conv.ask(ssml_gib_1.Ssml.wrapSsmlSpeak([`Has seleccionado la tarjeta finalizada en ${lastNumbers}, el saldo es de ${cardSelected.saldoDisponible} €. ${ssml_gib_1.Ssml.break({ s: 3 })} ¿Quieres saber algo más a cerca de tus tarjetas?`]));
                }
                else {
                    conv.ask(`No podemos mostrar la tarjeta`);
                }
            });
        });
        app.intent('Tarjeta seleccionada - yes', (conv, input, output) => {
            conv.ask('Hola');
        });
        app.intent('Tarjeta seleccionada - no', (conv, input, output) => {
            conv.close(`Nos vemos pronto ${conv.user.profile.displayName}`);
        });
        // //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv) => {
            conv.ask(`Tu tarjeta ha sido bloqueada, para desbloquearla deberás utilizar la APP del Banco Sabadell`);
        });
        //SALDO TARJETA
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`El saldo de tu tarjeta ${last4CardNumbers} es de ${card.saldoDisponible} €`);
                    conv.ask(suggestionResponse);
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //FECHA LIQUIDACION TARJETA
        app.intent('Fecha Liquidación', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`La fecha próxima de liquidación de tu tarjeta finalizada en ${last4CardNumbers} es ${card.fechaProxiLiquidacion}`);
                    conv.ask(suggestionResponse);
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //LIMITES TARJETA
        app.intent('Límites', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`Los límites de tu tarjeta finalizada en ${last4CardNumbers} son, limite autorizado: ${card.limiteAutorizado} € y limite crédito: ${card.limiteCredito} €`);
                    conv.ask(suggestionResponse);
                    conv.ask(suggestion_manager_1.SuggestionDFManager.generateSuggestions());
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //MOVIMIENTOS
        app.intent('Movimientos', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = card_manager_2.CardDFManager.generateMovementsTable(card);
                    conv.ask(`Aquí tienes los movimientos`);
                    conv.ask(movementsTable);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
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
        const Contexts = {
            selected_card: 'selected_card',
            selected_account: 'selected_account'
        };
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
                const lastNumbers = format_manager_1.FormatManager.getLast4numbers(cardSelected.cuentaRelacionada);
                conv.contexts.set(Contexts.selected_card, 5);
                conv.contexts.delete(Contexts.selected_account, 5);
                console.log('hola hola' + Contexts.selected_account);
                if (cardSelected) {
                    conv.ask(ssml_gib_1.Ssml.wrapSsmlSpeak([`Has seleccionado la tarjeta finalizada en ${cardSelected.cuentaRelacionada}, el saldo es de ${cardSelected.saldoDisponible} €. ${ssml_gib_1.Ssml.break({ s: 3 })} ¿Quieres saber algo más a cerca de tus tarjetas?`]));
                }
                else {
                    conv.ask(`No podemos mostrar la tarjeta`);
                }
                app.intent('Bloquear tarjeta - seleccionada', (conv) => {
                    conv.ask(`Tu tarjeta con el número de contrato: ${cardSelected.contrato}. Ha sido bloqueada exitosamente, para desbloquearla deberás utilizar la APP del Banco Sabadell`);
                });
                app.intent('Saldo tarjeta - seleccionada', (conv) => {
                    conv.ask(`El saldo de tu tarjeta ${cardSelected.contrato} es de ${cardSelected.saldoDisponible} €`);
                });
                app.intent('Fecha liquidacion - seleccionada', (conv) => {
                    conv.ask(`La fecha próxima de liquidación de tu tarjeta finalizada en ${cardSelected.contrato} es de ${cardSelected.fechaProxiLiquidacion} €`);
                });
                app.intent('Limites - seleccionada', (conv) => {
                    conv.ask(`Los límites de tu tarjeta finalizada en ${cardSelected.contrato} son, limite autorizado: ${cardSelected.limiteAutorizado} € y limite crédito: ${cardSelected.limiteCredito} €`);
                });
                app.intent('ayuda - tarjetas', (conv) => {
                    conv.ask(suggestionResponse);
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
                    conv.ask(nullResponse);
                }
            });
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
        app.intent('Movimientos Tarjetas', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
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
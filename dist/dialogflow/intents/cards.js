"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const card_manager_1 = require("../../managers/card.manager");
class CardIntents /*extends BaseIntent*/ {
    constructor() {
        this.cardService = new card_service_1.CardService();
    }
    intents(app) {
        const nullResponse = 'No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros';
        const suggestionResponse = 'Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta';
        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            // if (cards.length > 1) {
            //     var voice = 'Tus tarjetas son' + ' '
            //     const tmp = {
            //         title: 'Mis Tarjetas',
            //         items: {}
            //     };
            //     cards.forEach((card) => {
            //         voice = voice + ' ' + card.contrato + ',';
            //         tmp.items[card.contrato] = {
            //             title: card.contrato,
            //             description: card.cuentaRelacionada,
            //             image: {
            //                 url: cardUrlImage,
            //                 accessibilityText: card.contrato
            //             }
            //         };
            //     });
            //     conv.ask(new Carousel(tmp));
            //     conv.ask(voice);
            //    conv.ask('Puedes preguntame por los últimos movimientos, fecha liquidación, limites o bloquear tarjeta');
            // } else {
            //    conv.ask('El saldo  de tu tarjeta ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible + ' €');
            //    conv.ask('Puedes preguntame por los últimos movimientos, fecha liquidación, limites o bloquear tarjeta');
            // }
        });
        // //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, input, option) => {
            // cards.forEach((card) => {
            //     if (cards.contrato === option) {
            //         conv.ask('Has seleccionado la tarjeta' + card.cuentaRelacionada + ' con un saldo disponible de ' + card.saldoDisponible + ' €');
            //         conv.ask('Puedes preguntame por los últimos movimientos, fecha liquidación, limites o bloquear tarjeta');
            //     }
            // });
        });
        // //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv) => {
            conv.ask('Tu tarjeta ha sido bloqueada, para desbloquearla deberás utilizar la APP del Banco Sabadell');
        });
        //SALDO TARJETA
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCard(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask('El saldo de tu tarjeta ' + card.cuentaRelacionada + ' es de ' + card.saldoDisponible + ' €');
                    conv.ask(suggestionResponse);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //FECHA LIQUIDACION TARJETA
        app.intent('Fecha Liquidación', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCard(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask('La fecha próxima de liquidación de tu tarjeta ' + card.cuentaRelacionada + ' es ' + card.fechaProxiLiquidacion);
                    conv.ask(suggestionResponse);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        //LIMITES TARJETA
        app.intent('Límites', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCard(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask('Los límites de tu tarjeta' + card.cuentaRelacionada + ' son, limite autorizado ' + card.limiteAutorizado + ' €, limite crédito ' + card.limiteCredito + ' €');
                    conv.ask(suggestionResponse);
                }
                else {
                    conv.ask(nullResponse);
                }
            });
        });
        app.intent('Movimientos', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCard(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = card_manager_1.CardManager.generateMovementsTable(card);
                    conv.ask('Aquí tienes los movimientos');
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
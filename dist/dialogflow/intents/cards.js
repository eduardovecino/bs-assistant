"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const card_manager_1 = require("../../managers/card.manager");
class CardIntents /*extends BaseIntent*/ {
    constructor() {
        this.cardService = new card_service_1.CardService();
    }
    intents(app) {
        const cards = this.cardService.getCards();
        const notLogged = 'Para esta opción debes iniciar sesión con tú usuario';
        const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg';
        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            this.cardService.getCards().then(cards => {
                if (cards) {
                    const carouselOfCards = card_manager_1.CardManager.cardsCarousel(cards);
                    conv.ask('Aquí tienes las tarjetas');
                    conv.ask(carouselOfCards);
                }
                else {
                    conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
                }
            });
        });
        // //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, option) => {
            this.cardService.getCards().then(cards => {
                if (cards) {
                    const cardsSelected = card_manager_1.CardManager.cardSelect(cards, option);
                    conv.ask(cardsSelected);
                }
                else {
                    conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
                }
            });
        });
        // //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv) => {
            conv.ask('Tu tarjeta ha sido bloqueada, para desbloquearla deberás utilizar la APP del Banco Sabadell');
        });
        //SALDO TARJETA
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            // if (cards.length === 1) {
            //     conv.ask('El saldo de tu tarjeta' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible + ' €');
            // } else {
            //     for (let i = 0; i < cards.length; i++) {
            //         const card4Numbers = card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 4) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 3) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 2) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 1);
            //         if (parseInt(last4CardNumbers) === parseInt(card4Numbers)) {
            //             conv.ask('El saldo  de tu tarjeta ' + card.cuentaRelacionada + ' es de ' + card.saldoDisponible + ' €');
            //             conv.ask('Puedes preguntame por los últimos movimientos, fecha liquidación, limites o bloquear tarjeta');
            //             break;
            //         } else if (cards.length - 1 === index) {
            //             conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
            //         }
            //     }
            // }
        });
        //FECHA LIQUIDACION TARJETA
        app.intent('Fecha Liquidación Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            // if (cards.length === 1) {
            //     conv.ask('La fecha próxima de liquidación de tu tarjeta' + cards[0].cuentaRelacionada + ' es ' + cards[0].fechaProxiLiquidacion);
            // } else {
            //     for (let i = 0; i < cards.length; i++) {
            //         const card4Numbers = card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 4) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 3) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 2) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 1);
            //         if (parseInt(last4CardNumbers) === parseInt(card4Numbers)) {
            //             conv.ask('La fecha próxima de liquidación de tu tarjeta ' + card.cuentaRelacionada + ' es ' + card.fechaProxiLiquidacion);
            //             conv.ask('Puedes preguntame por los últimos movimientos, fecha liquidación, limites o bloquear tarjeta');
            //             break;
            //         } else if (cards.length - 1 === i) {
            //             conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
            //         }
            //     }
            // }
        });
        //LIMITES TARJETA
        app.intent('Fecha Límites', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            // if (cards.length === 1) {
            //     conv.ask('Los límites de tu tarjeta' + cards[0].cuentaRelacionada + ' son, limite autorizado ' + cards[0].limiteAutorizado + ' €, limite crédito ' + cards[0].limiteCredito + ' €');
            // } else {
            //     for(let i=0; i<cards.length; i++){
            //         const card4Numbers = card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 4) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 3) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 2) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 1);
            //         if (parseInt(last4CardNumbers) === parseInt(card4Numbers)) {
            //             conv.ask('Los límites de tu tarjeta' + cards[0].cuentaRelacionada + ' son, limite autorizado ' + card.limiteAutorizado + ' €, limite crédito ' + card.limiteCredito + ' €');
            //             conv.ask('Puedes preguntame por los últimos movimientos, fecha liquidación, limites o bloquear tarjeta');
            //             break;
            //         } else if (cards.length - 1 === i) {
            //             conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
            //         }
            //     }
            // }
        });
        app.intent('Movimientos', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCard(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = card_manager_1.CardManager.generateMovementsTable(card);
                    conv.ask('Aquí tienes los movimientos');
                    conv.ask(movementsTable);
                }
                else {
                    conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
                }
            });
        });
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
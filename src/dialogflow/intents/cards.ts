import { CardService } from '../../services/card.service';
import { BasicCard, Carousel, Button, Table, Image, TableOptions } from 'actions-on-google';
import { CardManager } from '../../managers/card.manager';


export class CardIntents /*extends BaseIntent*/ {

    private cardService: CardService = new CardService();

    public intents(app): void {

        const cards = this.cardService.getCards();
        const notLogged = 'Para esta opción debes iniciar sesión con tú usuario';
        const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg'

        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            this.cardService.getCards().then(cards => {
                if (cards) {
                    const carouselOfCards = CardManager.cardsCarousel(cards);

                    conv.ask('Aquí tienes las tarjetas');
                    conv.ask(carouselOfCards);
                } else {
                    conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
                }
            });

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


        app.intent('Movimientos', (conv, { last4CardNumbers }, { tipo_tarjeta } ) => {
            this.cardService.getCard(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = CardManager.generateMovementsTable(card);

                    conv.ask('Aquí tienes los movimientos');
                    conv.ask(movementsTable);
                } else {
                    conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros');
                }
            });
        });
    }
}

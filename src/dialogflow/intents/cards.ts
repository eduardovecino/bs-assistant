import { CardService } from '../../services/card.service';
import { CardManager } from '../../managers/data/card.manager';
import { CardDFManager } from '../../managers/dialog-flow/card.manager';
import { FormatManager } from '../../managers/format.manager';
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager"
import { Ssml } from 'ssml-gib';

export class CardIntents /*extends BaseIntent*/ {

    private cardService: CardService = new CardService();

    public intents(app): void {

        const nullResponse = `No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta`;
        const cardCloseResponse = ['Nos vemos pronto', 'Que vaya bien', 'Hasta la próxima'];

        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            this.cardService.getCards().then(cards => {
                let response = "Tienes " + cards.length + " tarjetas. Terminadas en:";

                if (cards) {
                    cards.forEach(card => {
                        response = response + FormatManager.getLast4numbers(card.cuentaRelacionada) + ", ";
                    })
                    const carouselOfCards = CardDFManager.cardsCarousel(cards);
                    conv.ask(response + "¿Cúal deseas seleccionar?");
                    conv.ask(carouselOfCards);
                } else {
                    conv.ask(`No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros`);
                }
            });
        });

        // //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, input, option) => {
            this.cardService.getCards().then(cards => {
                const cardSelected = CardManager.getCardByOption(cards, option);
                if (cardSelected) {
                    const lastNumbers = FormatManager.getLast4numbers(cardSelected.cuentaRelacionada);
                    conv.ask(Ssml.wrapSsmlSpeak([`Has seleccionado la tarjeta finalizada en ${lastNumbers}, el saldo es de ${cardSelected.saldoDisponible} €. ${Ssml.break({ s: 3 })} ¿Quieres saber algo más a cerca de tus tarjetas?`]));
                } else {
                    conv.ask(`No podemos mostrar la tarjeta`);
                }
            });
        })

        app.intent('Tarjeta seleccionada - yes', (conv, input, output) =>{
            conv.ask('¿Quieres saber el saldo de tarjeta, quieres bloquearla, saber su fecha de liquidación, sus límites o ver los movimientos?')
        }) 


        app.intent('Tarjeta seleccionada - no', (conv, input, output) => {
                var cardCloseResponseResult = cardCloseResponse[Math.floor(Math.random() * cardCloseResponse.length)];
            conv.close(cardCloseResponseResult);
        }) 

        //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv) => {
            conv.ask(`Tu tarjeta ha sido bloqueada, para desbloquearla deberás utilizar la APP del Banco Sabadell`);
        });


        //SALDO TARJETA
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`El saldo de tu tarjeta ${last4CardNumbers} es de ${card.saldoDisponible} €`);
                    conv.ask(suggestionResponse);
                    conv.ask(SuggestionDFManager.generateSuggestions());
                } else {
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
                    conv.ask(SuggestionDFManager.generateSuggestions());
                } else {
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
                    conv.ask(SuggestionDFManager.generateSuggestions());
                } else {
                    conv.ask(nullResponse);
                }
            });
        });

        //MOVIMIENTOS
        app.intent('Movimientos', (conv, { last4CardNumbers }, { tipo_tarjeta } ) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = CardDFManager.generateMovementsTable(card);
                    conv.ask(`Aquí tienes los movimientos`);
                    conv.ask(movementsTable);
                } else {
                    conv.ask(nullResponse);
                }
            });
        });
    }
}

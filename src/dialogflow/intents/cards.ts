import { CardService } from '../../services/card.service';
import { CardManager } from '../../managers/data/card.manager';
import { CardDFManager } from '../../managers/dialog-flow/card.manager';
import { FormatManager } from '../../managers/format.manager';
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager"


export class CardIntents /*extends BaseIntent*/ {

    private cardService: CardService = new CardService();

    public intents(app): void {

        const nullResponse = `No se ha encontrado ninguna tarjeta, prueba en decir los 4 últimos numeros`;
        const suggestionResponse = `Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta`;


        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            this.cardService.getCards().then(cards => {
                if (cards) {
                    const carouselOfCards = CardDFManager.cardsCarousel(cards);
                    conv.ask(`Aquí tienes las tarjetas`);
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
                    conv.ask(`Has seleccionado la tarjeta finalizada en ${lastNumbers}, el saldo es de ${cardSelected.saldoDisponible} €`);
                } else {
                    conv.ask(`No podemos mostrar la tarjeta`);
                }
            });
        })


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

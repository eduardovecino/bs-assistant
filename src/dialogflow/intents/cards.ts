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

        const Contexts = {
            selected_card: 'selected_card',
            selected_account: 'selected_account'
        }

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
            const lastNumbers = FormatManager.getLast4numbers(cardSelected.cuentaRelacionada);
            conv.contexts.set(Contexts.selected_card, 5);
            conv.contexts.delete(Contexts.selected_account, 5);
            console.log(Contexts.selected_account);

        
                if (cardSelected) {
                    conv.ask(Ssml.wrapSsmlSpeak([`Has seleccionado la tarjeta finalizada en ${cardSelected.cuentaRelacionada}, el saldo es de ${cardSelected.saldoDisponible} €. ${Ssml.break({ s: 3 })} ¿Quieres saber algo más a cerca de tus tarjetas?`]));
                } else {
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
                        conv.ask(`Los límites de tu tarjeta finalizada en ${cardSelected.contrato} son, limite autorizado: ${cardSelected.limiteAutorizado} € y limite crédito: ${cardSelected.limiteCredito } €`);
                    });

                app.intent('ayuda - tarjetas', (conv) => {
                    conv.ask(suggestionResponse);
                    });  
            });
        })


        //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    conv.ask(`Tu tarjeta con el número de contrato: ${card.contrato}. Ha sido bloqueada exitosamente, para desbloquearla deberás utilizar la APP del Banco Sabadell`);
                } else {
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
        app.intent('Movimientos Tarjetas', (conv, { last4CardNumbers }, { tipo_tarjeta } ) => {
            this.cardService.getCardByInputs(last4CardNumbers).then(card => {
                if (card) {
                    const movementsTable = CardDFManager.generateMovementsTable(card);
                    conv.ask(`Aquí tienes los movimientos`);
                    conv.ask(movementsTable);
                } else {
                    conv.ask(nullResponse);
                }
            });
    })
}
}

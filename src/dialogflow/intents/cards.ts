import { CardService } from '../../services/card.service';
import { CardManager } from '../../managers/data/card.manager';
import { CardDFManager } from '../../managers/dialog-flow/card.manager';
import { SuggestionDFManager } from "../../managers/dialog-flow/suggestion.manager"
import { TranslateManager } from "../../managers/translate.manager";
import { CardModel } from '../../models/card.model';

export class CardIntents {

    private cardService: CardService = new CardService();
    public translateManager: TranslateManager = TranslateManager.getInstance();


    public intents(app): void {

        const Contexts = {
            selected_card: 'selected_card',
            selected_account: 'selected_account'
        }

        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', async (conv) => {
            let cards = await this.cardService.getCards();
            conv.contexts.delete(Contexts.selected_account);
            if(cards) {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const cardsSimpleResponseScreen = CardDFManager.generateCardsSimpleResponseScreen(cards);
                    const cardsCarousel = CardDFManager.generateCardsCarousel(cards);
                    conv.ask(cardsSimpleResponseScreen);
                    conv.ask(cardsCarousel);
                } else {
                    const cardsSimpleResponseNoScreen = CardDFManager.generateCardsSimpleResponseNoScreen(cards);
                    conv.ask(cardsSimpleResponseNoScreen);
                }
            } else {
                conv.ask(this.translateManager.translate('intent.card.null_response'));
            }
        });

        //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', async (conv, input, option) => {
            let cards = await this.cardService.getCards();
            const cardSelected = CardManager.getCardByOption(cards, option);
            conv.contexts.set(Contexts.selected_card, 5);
            let informationCard: CardModel = await this.cardService.getCard(cardSelected.last4Numbers);
            if (informationCard) {
                const response = CardDFManager.generateSelectedCardSimpleResponse(cardSelected);
                conv.ask(response);
                conv.ask(SuggestionDFManager.generateCardSuggestions());
            } else {
                conv.ask(this.translateManager.translate('intent.card.selected_card.failure_%card%', cardSelected.description));
            }
            
            //BLOQUEAR TARJETA SELECCIONADA
            app.intent('Bloquear tarjeta - seleccionada', (conv) => {
                this.cardBlock(informationCard, conv);
            });  
            
            //SALDO TARJETA SELECCIONADA
            app.intent('Saldo tarjeta - seleccionada', (conv) => {
                this.cardBalance(cardSelected, informationCard, conv);
            });
            
            // MOVIMIENTOS TARJETA SELECCIONADA
            app.intent('Movimientos tarjeta - seleccionada', (conv) => {
                let movements = informationCard.currentMonthDetail;
                this.cardMovements(movements, conv);
            });

            //FECHA LIQUIDACION TARJETA SELECCIONADA
            app.intent('Fecha liquidacion - seleccionada', (conv) => {
                this.cardSettlement(informationCard, conv);
            });

            //LIMITES TARJETA SELECCIONADA
            app.intent('Limites - seleccionada', (conv) => {
                this.cardLimits(informationCard, conv);
            });

            //AYUDA TARJETAS
            app.intent('ayuda - tarjetas', (conv) => {
                if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                    const cardHelpSimpleResponseScreen = CardDFManager.generateCardHelpSimpleResponseScreen();
                    conv.ask(cardHelpSimpleResponseScreen);
                    conv.ask(SuggestionDFManager.generateCardSuggestions());
                } else {
                    const cardHelpSimpleResponseNoScreen = CardDFManager.generateCardHelpSimpleResponseNoScreen();
                    conv.ask(cardHelpSimpleResponseNoScreen);
                }
            });
        })

        //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', async (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            let card = await this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardBlock(card, conv)
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });

        //SALDO TARJETA
        app.intent('Saldo Tarjeta', async (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            let card = await this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardBalance(card, card, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });
        
        //FECHA LIQUIDACION TARJETA
        app.intent('Fecha Liquidación', async (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            let card = await this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardSettlement(card, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });

        //LIMITES TARJETA
        app.intent('Límites', async (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            let card = await this.cardService.getCard(last4CardNumbers);
            if (card) {
                this.cardLimits(card, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        });

        //MOVIMIENTOS
        app.intent('Movimientos Tarjetas', async (conv, { last4CardNumbers }, { tipo_tarjeta } ) => {
            let card = await this.cardService.getCard(last4CardNumbers);
            let movements = card.currentMonthDetail;
            if (card) {
                this.cardMovements(movements, conv);
            } else {
                conv.ask(this.translateManager.translate('intent.account.null_response'));
            }
        })
    }

    private cardBalance(informationCard, cardSelected, conv) {
        const response = CardDFManager.generateBalanceCardResponse(informationCard, cardSelected);
        conv.ask(response);
    }

    private cardBlock(card, conv) {
        const response = CardDFManager.generateBlockCardResponse(card);
        conv.ask(response);
    }

    private cardSettlement(card, conv) {
        const response = CardDFManager.generateSettlementCardResponse(card);
        conv.ask(response);
    }

    private cardLimits(card, conv) {
        const response = CardDFManager.generateLimitsCardResponse(card);
        conv.ask(response);
    }

    private cardMovements(movements, conv) {
        const cardMovementsSimpleResponse = CardDFManager.generateMovementsCardSimpleResponse(movements);
        conv.ask(cardMovementsSimpleResponse);
        if (movements.length > 1){
            const cardMovementsTable = CardDFManager.generateMovementsCardTable(movements);
            conv.ask(cardMovementsTable);
        }
    }    
}

import { CardService } from '../../services/card.service';
import { BasicCard, Carousel, Button } from 'actions-on-google';


export class CardIntents /*extends BaseIntent*/ {

    private cardService: CardService = new CardService();

    public intents(app): void {

        const cards = this.cardService.getCard();
        const notLogged = 'Para esta opción debes iniciar sesión con tú usuario';
        const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg'

        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
           if (cards.getLength > 1) {
                var voice = 'Tus tarjetas son' + ' '
                const tmp = {
                    title: 'Mis Tarjetas',
                    items: {}
                };
                cards.forEach((cards) => {
                    voice = voice + ' ' + cards.contrato + ',';
                    tmp.items[cards.contrato] = {
                        title: cards.contrato,
                        description: cards.cuentaRelacionada,
                        image: {
                            url: cardUrlImage,
                            accessibilityText: cards.contrato
                        }
                    };
                });
                conv.ask(new Carousel(tmp));
                conv.ask(voice);

            } else {
               conv.ask(new BasicCard({
                   title: cards.contrato,
                   text: 'Información básica de la Tarjeta',
                   image: {
                       url: cardUrlImage,
                       accessibilityText: cards.contrato
                   },
                   buttons: new Button({
                       title: 'Abrir APP',
                       url: 'http://eduvecino.com/GA_BMA/app_saba.php',
                   })
               }));
            }
        }); 
        

        // //TARJETA SELECCIONADA
        app.intent('Tarjeta seleccionada', (conv, input, option) => {
                cards.forEach((cards) => {
                    if (cards.contracto === option) {
                        conv.ask('Has seleccionado la ' + cards.contracto + ' con ' + cards.cuentaRelacionada + ' ');
                        conv.ask('Puedes obtener el listado de movimientos o bloquear una tarjeta');
                        conv.ask(new BasicCard({
                            title: cards.contracto,
                            image: {
                                url: cardUrlImage,
                                accessibilityText: cards.contracto
                            },
                            text: cards.cuentaRelacionada,
                            buttons: new Button({
                                title: 'Abrir APP',
                                url: 'http://www.eduvecino.com/GA_BMA/app.php',
                            })
                        })
                        );
                    }
                });
        });


        // //BLOQUEAR TARJETA
        app.intent('Bloquear tarjeta', (conv) => {
                conv.ask('Tu tarjeta ha sido bloqueada, para desbloquearla deberás utilizar la APP del Banco Sabadell');
           
        });

    }
}


 
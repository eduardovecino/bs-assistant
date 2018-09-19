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

           if (cards.length > 1) {
                var voice = 'Tus tarjetas son' + ' '
                const tmp = {
                    title: 'Mis Tarjetas',
                    items: {}
                };
                cards.forEach((card) => {
                    voice = voice + ' ' + card.contrato + ',';
                    tmp.items[card.contrato] = {
                        title: card.contrato,
                        description: card.cuentaRelacionada,
                        image: {
                            url: cardUrlImage,
                            accessibilityText: card.contrato
                        }
                    };
                });
                conv.ask(new Carousel(tmp));
                conv.ask(voice);
            } else {
               conv.ask(new BasicCard({
                   title: cards[0].contrato,
                   text: 'Información básica de la Tarjeta',
                   image: {
                       url: cardUrlImage,
                       accessibilityText: cards[0].contrato
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
                cards.forEach((card) => {
                    if (cards.contrato === option) {
                        conv.ask('Has seleccionado la ' + card.contrato + ' con ' + card.cuentaRelacionada + 'Puedes obtener el listado de movimientos o bloquear una tarjeta');
                        conv.ask('Puedes obtener el listado de movimientos o bloquear una tarjeta');
                        conv.ask(new BasicCard({
                            title: card.contrato,
                            image: {
                                url: cardUrlImage,
                                accessibilityText: card.contrato
                            },
                            text: card.cuentaRelacionada,
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

        //Saldo Tarjeta
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers },  { tipo_tarjeta }) => {
            if (cards.length === 1) {
                conv.ask('El saldo de tu ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible);
            } else {
                const encontrada = 0;
                cards.forEach((card, i) => {
                    const card4Numbers = card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 4) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 3) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 2) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 1);
                    if (parseInt(last4CardNumbers) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */ ) {
                        const encontrada = 1;
                        conv.ask('El saldo  de la ' + card.cuentaRelacionada + ' es de ' + card.saldoDisponible);
                    } else if( encontrada === 0 && cards.length === i){
                        conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir el tipo de cuenta o los 4 últimos numeros');
                    }
                });
            }
         });
    }
}
 
import { CardService } from '../../services/card.service';
import { BasicCard, Carousel, Button, Table, List } from 'actions-on-google';


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
        app.intent('Saldo Tarjeta', (conv, { last4CardNumbers }, { tipo_tarjeta }) => {
            let encontrada = 0;
            if (cards.length === 1) {
                conv.ask('El saldo de tu ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible);
            } else {
                cards.forEach((card, index) => {
                    const card4Numbers = card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 4) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 3) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 2) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 1);
                    if (parseInt(last4CardNumbers) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                        encontrada = 1;
                        conv.ask('El saldo  de la ' + card.cuentaRelacionada + ' es de ' + card.saldoDisponible);
                    } else if (encontrada === 0 && cards.length -1 === index) {
                        conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir el tipo de cuenta o los 4 últimos numeros');
                    }
                });
            }
        });   


        //MOVIMIENTOS DE TARJETA
        app.intent('Movimientos', (conv) => {
            conv.ask('Tus últimos movimientos de tarjertas son:' + cards[1].detalleMesActual.concepto);
            // conv.ask(new Table({
            //     title: 'Tarjeta:',
            //     subtitle: 'Últimos movimientos:',
            //     image: {
            //         url: 'https://www.comparativadebancos.com/wp-content/uploads/2013/07/banco-sabadell-logo.png',
            //         accessibilityText: 'Actions on Google'
            //     },
            //     columns: [
            //         {
            //             header: 'Concepto',
            //             align: 'CENTER',
            //         },
            //         {
            //             header: 'Fecha',
            //             align: 'LEADING',
            //         },
            //         {
            //             header: 'Importe',
            //             align: 'TRAILING',
            //         },
            //     ],
            //     rows: [
            //         {
            //             cells: [cards[0].detalleMesActual.concepto, cards[0].detalleMesActual.fecha, cards[0].detalleMesActual.importe],
            //             dividerAfter: false,
            //         },
            //         {
            //             cells: ['Farmacia Pepita', '15/07/2018', '6€'],
            //             dividerAfter: true,
            //         },
            //         {
            //             cells: ['Txocoa', '15/07/2018', '14€'],
            //         },
            //     ],

            // }))
        });
    }
}
 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_service_1 = require("../../services/card.service");
const actions_on_google_1 = require("actions-on-google");
class CardIntents /*extends BaseIntent*/ {
    constructor() {
        this.cardService = new card_service_1.CardService();
    }
    intents(app) {
        const cards = this.cardService.getCard();
        const notLogged = 'Para esta opción debes iniciar sesión con tú usuario';
        const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg';
        //CARROUSEL DE TARJETAS
        app.intent('Tarjetas', conv => {
            if (cards.length > 1) {
                var voice = 'Tus tarjetas son' + ' ';
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
                conv.ask(new actions_on_google_1.Carousel(tmp));
                conv.ask(voice);
            }
            else {
                conv.ask(new actions_on_google_1.BasicCard({
                    title: cards[0].contrato,
                    text: 'Información básica de la Tarjeta',
                    image: {
                        url: cardUrlImage,
                        accessibilityText: cards[0].contrato
                    },
                    buttons: new actions_on_google_1.Button({
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
                    conv.ask(new actions_on_google_1.BasicCard({
                        title: card.contrato,
                        image: {
                            url: cardUrlImage,
                            accessibilityText: card.contrato
                        },
                        text: card.cuentaRelacionada,
                        buttons: new actions_on_google_1.Button({
                            title: 'Abrir APP',
                            url: 'http://www.eduvecino.com/GA_BMA/app.php',
                        })
                    }));
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
            }
            else {
                cards.forEach((card, index) => {
                    const card4Numbers = card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 4) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 3) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 2) + card.cuentaRelacionada.charAt(card.cuentaRelacionada.length - 1);
                    if (parseInt(last4CardNumbers) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                        encontrada = 1;
                        conv.ask('El saldo  de la ' + card.cuentaRelacionada + ' es de ' + card.saldoDisponible);
                    }
                    else if (encontrada === 0 && cards.length - 1 === index) {
                        conv.ask('No se ha encontrado ninguna tarjeta, prueba en decir el tipo de cuenta o los 4 últimos numeros');
                    }
                });
            }
        });
        //MOVIMIENTOS DE TARJETA
        app.intent('Movimientos', (conv) => {
            conv.ask('hola hola');
            conv.ask(new actions_on_google_1.Table({
                title: 'Cuenta/Tarjeta X',
                subtitle: 'Últimos movimientos:',
                image: {
                    url: 'https://www.vectorlogo.es/wp-content/uploads/2015/10/logo-vector-banco-mediolanum.jpg',
                    accessibilityText: 'Actions on Google'
                },
                columns: [
                    {
                        header: 'Concepto',
                        align: 'CENTER',
                    },
                    {
                        header: 'Fecha',
                        align: 'LEADING',
                    },
                    {
                        header: 'Importe',
                        align: 'TRAILING',
                    },
                ],
                rows: [
                    {
                        cells: ['Amazon', '16/07/2018', '234€'],
                        dividerAfter: false,
                    },
                    {
                        cells: ['Farmacia Pepita', '15/07/2018', '6€'],
                        dividerAfter: true,
                    },
                    {
                        cells: ['Txocoa', '15/07/2018', '14€'],
                    },
                ],
            }));
        });
        // app.intent('Movimientos', (conv) => {
        //     if (logged === '1') {
        //         var voice = 'Tus cuentas son' + ' ';
        //         const tmp = {
        //             title: 'Mis Cuentas' + ' ',
        //             items: {}
        //         };
        //         accounts.forEach((account) => {
        //             voice = voice + ' ' + account.name + ',';
        //             tmp.items[account.id] = {
        //                 title: account.name,
        //                 description: account.description,
        //                 image: {
        //                     url: account.url,
        //                     accessibilityText: account.name
        //                 }
        //             };
        //         });
        //         conv.ask(new List(tmp));
        //         conv.ask(voice);
        //         conv.ask('Puedes preguntame por el saldo o los movimientos de una cuenta');
        //     } else {
        //         conv.ask(notLogged);
        //         suggestions(conv);
        //     }
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
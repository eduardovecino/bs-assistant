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
                conv.ask(new actions_on_google_1.Carousel(tmp));
                conv.ask(voice);
            }
            else {
                conv.ask(new actions_on_google_1.BasicCard({
                    title: cards.contrato,
                    text: 'Información básica de la Tarjeta',
                    image: {
                        url: cardUrlImage,
                        accessibilityText: cards.contrato
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
            cards.forEach((cards) => {
                if (cards.contrato === option) {
                    conv.ask('Has seleccionado la ' + cards.contrato + ' con ' + cards.cuentaRelacionada + 'Puedes obtener el listado de movimientos o bloquear una tarjeta');
                    conv.ask('Puedes obtener el listado de movimientos o bloquear una tarjeta');
                    conv.ask(new actions_on_google_1.BasicCard({
                        title: cards.contrato,
                        image: {
                            url: cardUrlImage,
                            accessibilityText: cards.contrato
                        },
                        text: cards.cuentaRelacionada,
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
            if (cards.length === 1) {
                conv.ask('El saldo de tu ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible);
            }
            else {
                cards.forEach((cards) => {
                    // const iban4Numbers = account.iban.charAt(account.iban.length - 3)+account.iban.charAt(account.iban.length -2)+account.iban.charAt(account.iban.length-1)+account.iban.charAt(account.iban.length)
                    const card4Numbers = cards.cuentaRelacionada.charAt(cards.cuentaRelacionada.length - 4) + cards.cuentaRelacionada.charAt(cards.cuentaRelacionada.length - 3) + cards.cuentaRelacionada.charAt(cards.cuentaRelacionada.length - 2) + cards.cuentaRelacionada.charAt(cards.cuentaRelacionada.length - 1);
                    if (parseInt(last4CardNumbers) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                        // conv.ask(iban4Numbers + last4numbers);
                        conv.ask('El saldo  de la ' + cards.cuentaRelacionada + ' es de ' + cards.saldoDisponible);
                    }
                    else {
                        conv.ask('No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros');
                    }
                });
            }
        });
    }
}
exports.CardIntents = CardIntents;
//# sourceMappingURL=cards.js.map
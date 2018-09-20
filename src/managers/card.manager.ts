import { Table, TableOptions, Carousel } from "actions-on-google";


const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg'

export class CardManager {


    constructor() {
        
    }

    public static getCardByLast4(cards, last4): any {
        for (let i = 0; i < cards.length; i++) {
            const card4Numbers = cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 4) + cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 3) + cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 2) + cards[i].cuentaRelacionada.charAt(cards[i].cuentaRelacionada.length - 1);
            if (parseInt(last4) === parseInt(card4Numbers) /*|| tipo_tarjeta === cards.--- */) {
                return cards[i];
            }
        }
        return null;
    }

    public static generateMovementsTable(card) {
        const tmp: TableOptions = {
            dividers: true,
            columns: ['Concepto', 'Fecha', 'Importe'],
            rows: []
        };
        card.detalleMesActual.forEach((detail) => {
            tmp.rows.push(
                {
                    cells: [detail.concepto, detail.fecha, detail.importe],
                    dividerAfter: true
                }
            );
        });

        return new Table(tmp);

    }

    public static cardsCarousel(cards) {
        if (cards.length >1){
            const tmp = {
                title: 'Mis Tarjetas',
                items: {}
            };
            cards.forEach((card) => {
                tmp.items[card.contrato] = {
                    title: card.contrato,
                    description: card.cuentaRelacionada,
                    image: {
                        url: cardUrlImage,
                        accessibilityText: card.contrato
                    }
                };
            });
            return (new Carousel(tmp));
        } else {
           return ('El saldo  de tu tarjeta ' + cards[0].cuentaRelacionada + ' es de ' + cards[0].saldoDisponible + ' €');
        }
    }

    public static cardSelect(cards, option) {
        cards.forEach((card) => {
            if (parseInt(cards.contrato) === parseInt(option)) {
                return ('Has seleccionado la tarjeta' + card.cuentaRelacionada + ' con un saldo disponible de ' + card.saldoDisponible + ' €');
            } else {
                return ('No podemos mostrar la tarjeta' + cards.contrato);

            }
        })

    }
}
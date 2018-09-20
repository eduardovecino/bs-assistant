import { Table, TableOptions, Carousel } from "actions-on-google";


const cardUrlImage = 'https://www.busconomico.com/Images/Blog/BSCard.jpg'

export class CardDFManager {


    constructor() {
        
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
}
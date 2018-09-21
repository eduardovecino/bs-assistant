import { BrowseCarousel} from "actions-on-google";


export class InformationDFManager {

    constructor() {
    }

    public static generateOfficesBrowseCarousel(offices) {
        const tmp =  {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://www.busconomico.com/Images/Blog/BSCard.jpg`;
            tmp.items.push(
                {
                    title: office.id,
                    url: mapUrl,
                    description: office.address,
                    image: {
                        url: 'https://www.busconomico.com/Images/Blog/BSCard.jpg',
                        accessibilityText: office.id
                    }
                }
            );
        });
        return (new BrowseCarousel(tmp));
    }
}
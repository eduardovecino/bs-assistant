import { BrowseCarousel} from "actions-on-google";


export class InformationDFManager {

    constructor() {
    }

    public static generateOfficesBrowseCarousel(offices) {
        const tmp =  {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://maps.google.com/?q=${office.latitude},${office.longitude}`;
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
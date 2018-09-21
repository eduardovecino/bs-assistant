import { BrowseCarousel} from "actions-on-google";


export class InformationDFManager {

    constructor() {
    }

    public static generateOfficesBrowseCarousel(offices) {
        const tmp =  {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://www.xataka.com/`;
            tmp.items.push(
                {
                    title: office.id,
                    url: mapUrl,
                    description: office.address,
                    image: {
                        url: '',
                        accessibilityText: office.id
                    }
                }
            );
        });
        return (new BrowseCarousel(tmp));
    }
}
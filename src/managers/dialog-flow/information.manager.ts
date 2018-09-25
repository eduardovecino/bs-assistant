import { BrowseCarousel, Image, BrowseCarouselItem} from "actions-on-google";


export class InformationDFManager {

    constructor() {
    }

    public static generateOfficesBrowseCarousel(offices) {
        const tmp =  {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://maps.google.com/?q=${office.latitude},${office.longitude}`;
            tmp.items.push( new BrowseCarouselItem(
                {
                    title: office.id,
                    url: mapUrl,
                    description: office.address,
                    // image: new Image ({
                    //     url: 'https://www.busconomico.com/Images/Blog/BSCard.jpg',
                    //     alt: office.id
                    // })
                })
            );
        });
        return (new BrowseCarousel(tmp));
    }
}
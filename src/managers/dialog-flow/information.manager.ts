import { BrowseCarousel, Image, BrowseCarouselItem} from "actions-on-google";
import { TranslateManager } from "../translate.manager";


export class InformationDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generateOfficesSimpleResponse(offices) {
        let response;
        let lenght = (offices.length > 3) ? 3 : offices.length + 1;
        for (let i=0 ; i<lenght; i++){
            response = offices[i].address + ", ";
        }
        return this.translateManager.translate('intent.information.simple_response_%offices%', response);
    };

    public static generateOfficesBrowseCarousel(offices) {
        const tmp =  {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://maps.google.com/?q=${office.point.lat},${office.point.lng}`;
            tmp.items.push( new BrowseCarouselItem(
                {
                    title: office.name,
                    url: mapUrl,
                    description: office.address,
                    // image: new Image ({
                    //     url: office.image,
                    //     alt: office.name
                    // })
                })
            );
        });
        return (new BrowseCarousel(tmp));
    };
}
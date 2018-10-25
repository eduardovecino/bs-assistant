import { BrowseCarousel, Image, BrowseCarouselItem, BasicCard, Button} from "actions-on-google";
import { TranslateManager } from "../translate.manager";


export class InformationDFManager {

    public static translateManager: TranslateManager = TranslateManager.getInstance();

    public static generateOfficesSimpleResponse(offices) {
        let response = ' ';
        let length = (offices.length > 3) ? 3 : offices.length + 1;
        for (let i=0 ; i<length; i++){
            response = response + offices[i].address + ", ";
        }
        return this.translateManager.translate('intent.information.offices.simple_response_%offices%', [response]);
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

    public static generateOpenAppSimpleResponseScreen() {
        return this.translateManager.translate('intent.information.open_app.simple_response.screen');
    }

    public static generateOpenAppSimpleResponseNoScreen() {
        return this.translateManager.translate('intent.information.open_app.simple_response.no_screen');
    }

    public static generateOpenAppBasicCard() {
        return new BasicCard({
            title: '',
            image: {
                url: 'https://farm8.staticflickr.com/7428/9357809422_cfd8088a54.jpg',
                accessibilityText: this.translateManager.translate('intent.information.open_app.basic_card.title')
            },
            text: '',
            buttons: new Button({
                title: this.translateManager.translate('intent.information.open_app.basic_card.title'),
                url: 'http://eduvecino.com/GA_BMA/app_saba.php',
            })
        })
    }

    public static generateContactSimpleResponseScreen() {
        return this.translateManager.translate('intent.information.contact.simple_response.screen');
    }
}
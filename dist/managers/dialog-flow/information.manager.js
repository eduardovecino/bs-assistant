"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
class InformationDFManager {
    constructor() {
    }
    static generateOfficesBrowseCarousel(offices) {
        const tmp = {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://www.google.com/maps/place/El+Patio+de+Mi+Casa+Clot/@41.4104223,2.1907937,15z/data=!4m8!1m2!2m1!1smi+casa!3m4!1s0x12a4a32698dcb1eb:0x12cc38232c06459d!8m2!3d41.4068526!4d2.1888659`;
            tmp.items.push(new actions_on_google_1.BrowseCarouselItem({
                title: office.id,
                url: mapUrl,
                description: office.address,
                image: new actions_on_google_1.Image({
                    url: 'https://www.busconomico.com/Images/Blog/BSCard.jpg',
                    alt: office.id
                })
            }));
        });
        return (new actions_on_google_1.BrowseCarousel(tmp));
    }
}
exports.InformationDFManager = InformationDFManager;
//# sourceMappingURL=information.manager.js.map
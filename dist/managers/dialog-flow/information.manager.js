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
            const mapUrl = `https://maps.google.com/?q=${office.point.lat},${office.point.lng}`;
            tmp.items.push(new actions_on_google_1.BrowseCarouselItem({
                title: office.name,
                url: mapUrl,
                description: office.address,
                image: new actions_on_google_1.Image({
                    url: office.image,
                    alt: office.name
                })
            }));
        });
        return (new actions_on_google_1.BrowseCarousel(tmp));
    }
}
exports.InformationDFManager = InformationDFManager;
//# sourceMappingURL=information.manager.js.map
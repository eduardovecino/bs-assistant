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
            const mapUrl = `https://www.xataka.com/`;
            tmp.items.push({
                title: office.id,
                url: mapUrl,
                description: office.address,
                image: {
                    url: '',
                    accessibilityText: office.id
                }
            });
        });
        return (new actions_on_google_1.BrowseCarousel(tmp));
    }
}
exports.InformationDFManager = InformationDFManager;
//# sourceMappingURL=information.manager.js.map
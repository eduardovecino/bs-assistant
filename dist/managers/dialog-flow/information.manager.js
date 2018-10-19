"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
const translate_manager_1 = require("../translate.manager");
class InformationDFManager {
    static generateOfficesSimpleResponse(offices) {
        let response = ' ';
        let length = (offices.length > 3) ? 3 : offices.length + 1;
        for (let i = 0; i < length; i++) {
            response = response + offices[i].address + ", ";
        }
        return this.translateManager.translate('intent.information.simple_response_%offices%', [response]);
    }
    ;
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
            }));
        });
        return (new actions_on_google_1.BrowseCarousel(tmp));
    }
    ;
}
InformationDFManager.translateManager = translate_manager_1.TranslateManager.getInstance();
exports.InformationDFManager = InformationDFManager;
//# sourceMappingURL=information.manager.js.map
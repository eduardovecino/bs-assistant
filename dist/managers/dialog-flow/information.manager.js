"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
class InformationDFManager {
    constructor() {
    }
    static generateOfficesSimpleResponse(offices) {
        let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
        offices.forEach((office) => {
            response = response + office.name + " en " + office.address + ", ";
        });
        response = response + "¿Cúal quieres seleccionar?";
        return response;
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
            }));
        });
        return (new actions_on_google_1.BrowseCarousel(tmp));
    }
}
exports.InformationDFManager = InformationDFManager;
//# sourceMappingURL=information.manager.js.map
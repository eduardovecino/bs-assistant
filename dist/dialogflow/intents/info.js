"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const information_service_1 = require("../../services/information.service");
const information_manager_1 = require("../../managers/dialog-flow/information.manager");
const translate_manager_1 = require("../../managers/translate.manager");
class InfoIntents /*extends BaseIntent*/ {
    constructor() {
        this.informationService = new information_service_1.InformationService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        app.intent('Oficinas Cercanas', (conv) => __awaiter(this, void 0, void 0, function* () {
            const latitude = conv.device.location.coordinates.latitude;
            const longitude = conv.device.location.coordinates.longitude;
            let offices;
            offices = yield this.informationService.getOffices(latitude, longitude);
            if (offices) {
                let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
                offices.forEach(office => {
                    response = response + office.name + " en " + office.address + ", ";
                });
                const carouselOfOffices = information_manager_1.InformationDFManager.generateOfficesBrowseCarousel(offices);
                conv.ask(response + "¿Cúal quieres seleccionar?");
                conv.ask(carouselOfOffices);
            }
            else {
                console.log("No funciona el servicio");
                conv.ask("No funciona el servicio");
            }
        }));
    }
}
exports.InfoIntents = InfoIntents;
//# sourceMappingURL=info.js.map
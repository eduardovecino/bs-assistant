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
class InfoIntents /*extends BaseIntent*/ {
    constructor() {
        this.informationService = new information_service_1.InformationService();
    }
    intents(app) {
        app.intent('Oficinas Cercanas', (conv) => __awaiter(this, void 0, void 0, function* () {
            let offices;
            offices = yield this.informationService.getOffices();
            if (offices) {
                console.log("Localizaciones cajeros" + JSON.stringify(offices));
                conv.ask("Localizaciones cajeros" + JSON.stringify(offices));
            }
            else {
                console.log("No funciona el servicio");
                conv.ask("No funciona el servicio");
            }
            // let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
            // if (offices) {
            //     offices.forEach(office => {
            //         response = response + office.id + " en " + office.address + ", ";
            //     })
            //     const carouselOfOffices = InformationDFManager.generateOfficesBrowseCarousel(offices);
            //     conv.ask(response + "¿Cúal quieres seleccionar?");
            //     conv.ask(carouselOfOffices);
            // } else {
            //     conv.ask(`No podemos mostrar las oficinas cercanas en este momento, vuelve a intentarlo`);
            // }
        }));
    }
}
exports.InfoIntents = InfoIntents;
//# sourceMappingURL=info.js.map
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
class InfoIntents {
    constructor() {
        this.informationService = new information_service_1.InformationService();
        this.translateManager = translate_manager_1.TranslateManager.getInstance();
    }
    intents(app) {
        //OFICINAS
        app.intent('Oficinas Cercanas', (conv) => __awaiter(this, void 0, void 0, function* () {
            const latitude = conv.device.location.coordinates.latitude;
            const longitude = conv.device.location.coordinates.longitude;
            let offices = yield this.informationService.getOffices(latitude, longitude);
            if (offices) {
                const officesSimpleResponse = information_manager_1.InformationDFManager.generateOfficesSimpleResponse(offices);
                const carouselOfOffices = information_manager_1.InformationDFManager.generateOfficesBrowseCarousel(offices);
                conv.ask(officesSimpleResponse);
                conv.ask(carouselOfOffices);
            }
            else {
                conv.ask(this.translateManager.translate('intent.service.failure'));
            }
        }));
        //ABRIR APP
        app.intent('Abrir App', (conv) => __awaiter(this, void 0, void 0, function* () {
            if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
                const openAppSimpleResponseScreen = information_manager_1.InformationDFManager.generateOpenAppSimpleResponseScreen();
                console.log("INFO1" + openAppSimpleResponseScreen);
                const openAppBasicCard = information_manager_1.InformationDFManager.generateOpenAppBasicCard();
                console.log("INFO2" + openAppBasicCard);
                conv.ask(openAppSimpleResponseScreen);
                conv.ask(openAppBasicCard);
            }
            else {
                const openAppSimpleResponseNoScreen = information_manager_1.InformationDFManager.generateOpenAppSimpleResponseNoScreen();
                conv.ask(openAppSimpleResponseNoScreen);
            }
        }));
    }
}
exports.InfoIntents = InfoIntents;
//# sourceMappingURL=info.js.map
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
const rest_manager_1 = require("../managers/data/rest.manager");
const account_manager_1 = require("../managers/data/account.manager");
const account_model_1 = require("../models/account.model");
const movement_model_1 = require("../models/movement.model");
class AccountService extends rest_manager_1.RestManager {
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.getApiBSabadell('/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista', 'mock/accounts/get-accounts.json');
            const accounts = [];
            results.forEach(result => accounts.push(new account_model_1.AccountModel(result)));
            return accounts;
        });
    }
    getAccount(last4) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield this.getAccounts();
            const account = account_manager_1.AccountManager.getAccountByLast4(accounts, last4);
            return account;
        });
    }
    getMovementsAccounts(account) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO Quitar los limites de la fecha para mostrar los últimos movimientos
            // /ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos
            const results = yield this.getApiBSabadell(`/ResourcesServerBS/oauthservices/v1.0.0/cuentasvista/${account}/movimientos?fechaDesde=01-01-2016&fechaHasta=01-10-2018`, `mock/accounts/get-movements-accounts.json`);
            const movements = [];
            console.log('results', results);
            if (results) {
                results.forEach(result => movements.push(new movement_model_1.MovementModel(result)));
            }
            ;
            return movements;
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
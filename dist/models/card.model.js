"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardModel {
    constructor(data) {
        this.fromJSON(data);
    }
    get contract() {
        return this._contract;
    }
    set contract(value) {
        this._contract = value;
    }
    get relatedAccount() {
        return this._relatedAccount;
    }
    set relatedAccount(value) {
        this._relatedAccount = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get currentSettlementDate() {
        return this._currentSettlementDate;
    }
    set currentSettlementDate(value) {
        this._currentSettlementDate = value;
    }
    get nextSettlementDate() {
        return this._nextSettlementDate;
    }
    set nextSettlementDate(value) {
        this._nextSettlementDate = value;
    }
    get monthlyPayment() {
        return this._monthlyPayment;
    }
    set monthlyPayment(value) {
        this._monthlyPayment = value;
    }
    get ibanBic() {
        return this._ibanBic;
    }
    set ibanBic(value) {
        this._ibanBic = value;
    }
    get totalAmount() {
        return this._totalAmount;
    }
    set totalAmount(value) {
        this._totalAmount = value;
    }
    get totalAmountToSettle() {
        return this._totalAmountToSettle;
    }
    set totalAmountToSettle(value) {
        this._totalAmountToSettle = value;
    }
    get authorizedLimit() {
        return this._authorizedLimit;
    }
    set authorizedLimit(value) {
        this._authorizedLimit = value;
    }
    get creditLimit() {
        return this._creditLimit;
    }
    set creditLimit(value) {
        this._creditLimit = value;
    }
    get currentPeriodOperations() {
        return this._currentPeriodOperations;
    }
    set currentPeriodOperations(value) {
        this._currentPeriodOperations = value;
    }
    get previousBalancePostponed() {
        return this._previousBalancePostponed;
    }
    set previousBalancePostponed(value) {
        this._previousBalancePostponed = value;
    }
    get availableBalance() {
        return this._availableBalance;
    }
    set availableBalance(value) {
        this._availableBalance = value;
    }
    get disposedBalance() {
        return this._disposedBalance;
    }
    set disposedBalance(value) {
        this._disposedBalance = value;
    }
    get totalOperPendLiquiCurrent() {
        return this._totalOperPendLiquiCurrent;
    }
    set totalOperPendLiquiCurrent(value) {
        this._totalOperPendLiquiCurrent = value;
    }
    get totalOperPendNextLiquidation() {
        return this._totalOperPendNextLiquidation;
    }
    set totalOperPendNextLiquidation(value) {
        this._totalOperPendNextLiquidation = value;
    }
    get totalOperNextLiquidation() {
        return this._totalOperNextLiquidation;
    }
    set totalOperNextLiquidation(value) {
        this._totalOperNextLiquidation = value;
    }
    get currentMonthDetail() {
        return this._currentMonthDetail;
    }
    set currentMonthDetail(value) {
        this._currentMonthDetail = value;
    }
    fromJSON(data) {
        this._contract = data.contrato;
        this._relatedAccount = data.cuentaRelacionada;
        this._state = data.estado;
        this._currentSettlementDate = data.fechaLiquiActual;
        this._nextSettlementDate = data.fechaProxiLiquidacion;
        this._monthlyPayment = data.formaPargoMensual;
        this._ibanBic = data.ibanBic;
        this._totalAmount = data.importeTotal;
        this._totalAmountToSettle = data.importeTotalLiquidar;
        this._authorizedLimit = data.limiteAutorizado;
        this._creditLimit = data.limiteCredito;
        this._currentPeriodOperations = data.operPeriodActual;
        this._previousBalancePostponed = data.saldoAplazadoAnterior;
        this._availableBalance = data.saldoDisponible;
        this._disposedBalance = data.saldoDispuesto;
        this._totalOperPendLiquiCurrent = data.totalOperPendLiquiActual;
        this._totalOperPendNextLiquidation = data.totalOperPendProxiLiquidacion;
        this._totalOperNextLiquidation = data.totalOperProximLiquidacion;
        this._currentMonthDetail = data.detalleMesActual.map(detail => ({
            concept: detail.concepto,
            date: detail.fecha,
            amount: detail.importe,
            location: detail.poblacion
        }));
    }
    toJSON() {
        return {};
    }
}
exports.CardModel = CardModel;
//# sourceMappingURL=card.model.js.map
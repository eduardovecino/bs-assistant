import { FormatManager } from '../managers/format.manager';


export class CardModel {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _contract: string;
    get contract(): string {
        return this._contract;
    }
    set contract(value: string) {
        this._contract = value;
    }

    private _relatedAccount: string;
    get relatedAccount(): string {
        return this._relatedAccount;
    }
    set relatedAccount(value: string) {
        this._relatedAccount = value;
    }

    private _state: string;
    get state(): string {
        return this._state;
    }
    set state(value: string) {
        this._state = value;
    }

    private _currentSettlementDate: string;
    get currentSettlementDate(): string {
        return this._currentSettlementDate;
    }
    set currentSettlementDate(value: string) {
        this._currentSettlementDate = value;
    }

    private _nextSettlementDate: string;
    get nextSettlementDate(): string {
        return this._nextSettlementDate;
    }
    set nextSettlementDate(value: string) {
        this._nextSettlementDate = value;
    }

    private _monthlyPayment: string;
    get monthlyPayment(): string {
        return this._monthlyPayment;
    }
    set monthlyPayment(value: string) {
        this._monthlyPayment = value;
    }

    private _ibanBic: string;
    get ibanBic(): string {
        return this._ibanBic;
    }
    set ibanBic(value: string) {
        this._ibanBic = value;
    }

    private _totalAmount: string;
    get totalAmount(): string {
        return this._totalAmount;
    }
    set totalAmount(value: string) {
        this._totalAmount = value;
    }

    private _totalAmountToSettle: string;
    get totalAmountToSettle(): string {
        return this._totalAmountToSettle;
    }
    set totalAmountToSettle(value: string) {
        this._totalAmountToSettle = value;
    }

    private _authorizedLimit: string;
    get authorizedLimit(): string {
        return this._authorizedLimit;
    }
    set authorizedLimit(value: string) {
        this._authorizedLimit = value;
    }

    private _creditLimit: string;
    get creditLimit(): string {
        return this._creditLimit;
    }
    set creditLimit(value: string) {
        this._creditLimit = value;
    }

    private _currentPeriodOperations: string;
    get currentPeriodOperations(): string {
        return this._currentPeriodOperations;
    }
    set currentPeriodOperations(value: string) {
        this._currentPeriodOperations = value;
    }

    private _previousBalancePostponed: string;
    get previousBalancePostponed(): string {
        return this._previousBalancePostponed;
    }
    set previousBalancePostponed(value: string) {
        this._previousBalancePostponed = value;
    }

    private _availableBalance: string;
    get availableBalance(): string {
        return this._availableBalance;
    }
    set availableBalance(value: string) {
        this._availableBalance = value;
    }

    private _disposedBalance: string;
    get disposedBalance(): string {
        return this._disposedBalance;
    }
    set disposedBalance(value: string) {
        this._disposedBalance = value;
    }

    private _totalOperPendLiquiCurrent: string;
    get totalOperPendLiquiCurrent(): string {
        return this._totalOperPendLiquiCurrent;
    }
    set totalOperPendLiquiCurrent(value: string) {
        this._totalOperPendLiquiCurrent = value;
    }

    private _totalOperPendNextLiquidation: string;
    get totalOperPendNextLiquidation(): string {
        return this._totalOperPendNextLiquidation;
    }
    set totalOperPendNextLiquidation(value: string) {
        this._totalOperPendNextLiquidation = value;
    }

    private _totalOperNextLiquidation: string;
    get totalOperNextLiquidation(): string {
        return this._totalOperNextLiquidation;
    }
    set totalOperNextLiquidation(value: string) {
        this._totalOperNextLiquidation = value;
    }

    private _currentMonthDetail: {
        concept: string,
        date: string,
        amount: string,
        location: string
    };
    get currentMonthDetail() {
        return this._currentMonthDetail;
    }
    set currentMonthDetail(value) {
        this._currentMonthDetail = value;
    }

    get last4Numbers(): string {
        return FormatManager.getLast4numbers(this.relatedAccount);
    }

    fromJSON(data: any) {
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
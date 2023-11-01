import { LoanSchedule } from './types/LoanSchedule';
import { LoanType } from './types/LoanType';

class Loan {
    private _principal: number;
    private _interestRate: number;
    private _maturityDate: Date;
    private _loanType: LoanType;
    private _loanStartDate: Date;

    constructor(principal: number, interestRate: number, maturityDate: Date, loanType: LoanType, loanStartDate: Date = new Date()) {
        this._principal = principal;
        this._interestRate = interestRate;
        this._maturityDate = maturityDate;
        this._loanType = loanType;
        this._loanStartDate = loanStartDate;
    }

    get principal(): number {
        return this._principal;
    }

    set principal(principal: number) {
        this._principal = principal;
    }

    get interestRate(): number {
        return this._interestRate;
    }

    set interestRate(interestRate: number) {
        this._interestRate = interestRate;
    }

    get maturityDate(): Date {
        return this._maturityDate;
    }

    set maturityDate(maturityDate: Date) {
        this._maturityDate = maturityDate;
    }

    get loanType(): LoanType {
        return this._loanType;
    }

    set loanType(loanType: LoanType) {
        this._loanType = loanType;
    }

    get loanStartDate(): Date {
        return this._loanStartDate;
    }

    set loanStartDate(loanStartDate: Date) {
        this._loanStartDate = loanStartDate;
    }

    getLoanDetails(): object {
        return {
            principal: this.principal,
            interestRate: this.interestRate,
            maturityDate: this.maturityDate,
            loanType: this.loanType,
            loanStartDate: this.loanStartDate,
        };
    }

    getLoanSchedule(calculator: any): LoanSchedule[] {
        return calculator.calculateSchedule(this);
    }
}

export { Loan };

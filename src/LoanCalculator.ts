import { addMonths, format } from 'date-fns';
import { LoanSchedule } from './types/LoanSchedule';
import { LoanType } from './types/LoanType';
import { Loan } from './Loan';

class LoanCalculator {
    calculateSchedule(loan: Loan): LoanSchedule[] {
        const principal = loan.principal;
        const interestRate = loan.interestRate;
        const maturityDate = loan.maturityDate;
        const loanType = loan.loanType;
        const loanStartDate = loan.loanStartDate;

        switch (loanType) {
            case LoanType.Spitzer:
                return this.calculateSpitzerSchedule(principal, interestRate, maturityDate, loanStartDate);
            case LoanType.EqualPrincipal:
                return this.calculateEqualPrincipalSchedule(principal, interestRate, maturityDate, loanStartDate);
            case LoanType.Balloon:
                return this.calculateBalloonPaymentSchedule(principal, interestRate, maturityDate, loanStartDate);
            default:
                throw new Error('Invalid loan type');
        }
    }

    private calculateSpitzerSchedule(principal: number, interestRate: number, maturityDate: Date, loanStartDate: Date): LoanSchedule[] {
        const schedule: LoanSchedule[] = [];
        let remainingPrincipal = principal;
        let currentDate = loanStartDate;
        const monthlyInterestRate = interestRate / 12 / 100;
        const monthsRemaining = this.getMonthsRemaining(currentDate, maturityDate);

        for (let i = 0; i < monthsRemaining; i++) {
            const interestPayment = remainingPrincipal * monthlyInterestRate;
            const monthlyPayment = principal * (monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -monthsRemaining));
            const principalPayment = monthlyPayment - interestPayment;
            remainingPrincipal -= principalPayment;

            schedule.push({
                month: format(currentDate, 'MM/yyyy'),
                payment: monthlyPayment,
                interest: interestPayment,
                remainingPrincipal: remainingPrincipal,
            });

            currentDate = addMonths(currentDate, 1);
        }

        return schedule;
    }

    private calculateEqualPrincipalSchedule(principal: number, interestRate: number, maturityDate: Date, loanStartDate: Date): LoanSchedule[] {
        const schedule: LoanSchedule[] = [];
        let remainingPrincipal = principal;
        let currentDate = loanStartDate;
        const monthlyInterestRate = interestRate / 12 / 100;
        const monthsRemaining = this.getMonthsRemaining(currentDate, maturityDate);
        const principalPayment = principal / monthsRemaining;

        for (let i = 0; i < monthsRemaining; i++) {
            const interestPayment = remainingPrincipal * monthlyInterestRate;
            const monthlyPayment = principalPayment + interestPayment;
            remainingPrincipal -= principalPayment;

            schedule.push({
                month: format(currentDate, 'MM/yyyy'),
                payment: monthlyPayment,
                interest: interestPayment,
                remainingPrincipal: remainingPrincipal,
            });

            currentDate = addMonths(currentDate, 1);
        }

        return schedule;
    }

    private calculateBalloonPaymentSchedule(principal: number, interestRate: number, maturityDate: Date, loanStartDate: Date): LoanSchedule[] {
        const schedule: LoanSchedule[] = [];
        let currentDate = loanStartDate;
        const monthlyInterestRate = interestRate / 12 / 100;
        const monthsRemaining = this.getMonthsRemaining(currentDate, maturityDate);

        for (let i = 0; i < monthsRemaining - 1; i++) {
            const interestPayment = principal * monthlyInterestRate;
            const monthlyPayment = interestPayment;
            principal -= monthlyPayment;

            schedule.push({
                month: format(currentDate, 'MM/yyyy'),
                payment: monthlyPayment,
                interest: interestPayment,
                remainingPrincipal: principal,
            });

            currentDate = addMonths(currentDate, 1);
        }

        // Final payment includes the remaining principal without interest
        const finalPayment = principal;
        schedule.push({
            month: format(currentDate, 'MM/yyyy'),
            payment: finalPayment,
            interest: 0,
            remainingPrincipal: 0, // Principal is fully paid
        });

        return schedule;
    }

    private getMonthsRemaining(startDate: Date, endDate: Date): number {
        return Math.max(0, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));
    }
}

export { LoanCalculator };

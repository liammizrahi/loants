import { Loan } from './loan';
import { LoanCalculator } from './loanCalculator';
import { LoanSchedule } from './base/LoanSchedule';
import { LoanType } from './base/LoanType';

// Create a sample loan
const principal = 10000;
const interestRate = 5; // 5% interest rate
const maturityDate = new Date('2024-10-01');
const loanType = LoanType.Spitzer;
const loanStartDate = new Date('2023-10-01');

const loan = new Loan(principal, interestRate, maturityDate, loanType, loanStartDate);

// Create a loan calculator
const calculator = new LoanCalculator();

// Calculate the loan schedule
const schedule: LoanSchedule[] = loan.getLoanSchedule(calculator);

// Display loan details
console.log('Loan Details:');
console.log(loan.getLoanDetails());

// Display loan schedule
console.log('\nLoan Schedule:');
schedule.forEach((entry, index) => {
    console.log(`#${index + 1}:`);
    console.log('Month:', entry.month);
    console.log('Payment Amount:', entry.payment.toFixed(2));
    console.log('Interest Amount:', entry.interest.toFixed(2));
    console.log('Remaining Principal:', entry.remainingPrincipal.toFixed(2));
    console.log('------------------------');
});

# Loan Calculation Module

This module provides a TypeScript implementation for calculating loan schedules in different styles, including Spitzer, Equal Principal, and Balloon Payment loans.

## Features

- Calculate loan schedules for various loan types.
- Retrieve loan details and schedules.

## Installation

Install this module using npm:

```bash
npm install your-package-name
```

## Usage

```typescript
const { Loan, LoanCalculator, LoanType } = require('your-package-name');

// Create a Loan instance
const loan = new Loan(principal, interestRate, maturityDate, LoanType.Spitzer, loanStartDate);

// Get loan details
const loanDetails = loan.getLoanDetails();

// Calculate the loan schedule
const calculator = new LoanCalculator();
const loanSchedule = loan.getLoanSchedule(calculator);

// Use loanDetails and loanSchedule as needed
```
## API


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


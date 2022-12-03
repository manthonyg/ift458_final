//Author: Michael Grandori
// About: Business logic of generating Present Value of a given loan

function PV(interestRate, monthlyPayment, loanTermYears, loanAmount, loanType) {

  console.log({interestRate, monthlyPayment, loanTermYears, loanAmount, loanType})
  const totalPayments = loanTermYears * 12;

  const endOfMonthValue =
    ((monthlyPayment / interestRate) *
      (1 - Math.pow(1 + interestRate, -totalPayments)) *
      (1 + interestRate)) /
    interestRate;

  const beginningOfMonthValue =
    (monthlyPayment / interestRate) *
    (1 - Math.pow(1 + interestRate, -totalPayments));

  switch (loanType) {
    case "BOM":
      return beginningOfMonthValue + loanAmount;
    case "EOM":
      return endOfMonthValue + loanAmount;
    default:
      return beginningOfMonthValue + loanAmount;
  }
}

module.exports = PV;

const Loan = require('../models/loanModel');
const PV = require('../utilities/PV');


/**
 * 
 * @param {express req} req 
 * @param {express res} res 
 * @description will get a list of loans belonging to the currently logged in user
 */
exports.getMyLoans = async (req, res) => {
  try {
    // EXECUTE QUERY
    const userLoans = Loan.find({user: res.locals.user.id })
    const loans = await userLoans;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: loans.length,
      loans
    
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

/**
 * 
 * @param {express req} req 
 * @param {express res} res 
 * @description will create a loan with a calculated PV associated with the currently logged in user
 */
exports.createLoan = async  (req, res) => {
  try {
    const {
      loanName,
      loanDescription,
      loanTermYears,
      loanInterestRate,
      loanMonthlyPayment,
      loanAmount,
      loanType
    } = req.body;

    const loanPV = PV(loanInterestRate, loanMonthlyPayment, loanTermYears, loanAmount, loanType) 
    console.log({loanPV})
    const newLoan = await Loan.create({
      loanName,
      loanDescription,
      loanTermYears,
      loanInterestRate,
      loanMonthlyPayment,
      loanAmount,
      loanType,
      loanPV,
      user: res.locals.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        loan: newLoan
      }
    })
  } catch (err) {
    console.log({err})
    res.status(400).json({
      status: 'fail',
      message: JSON.stringify(err)
    });
  }
};
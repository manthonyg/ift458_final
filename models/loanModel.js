const mongoose = require('mongoose');
Schema = mongoose.Schema
const loanSchema = new mongoose.Schema(
  {
    loanName:{
        type: String,
    },
    loanDescription: {
        type: String,
    },
    loanAddress: {
      type: String,
    },
    loanTermYears: {
        type: Number
    },
    loanInterestRate: {
        type: Number
    },
    loanMonthlyPayment: {
        type: Number
    },
    loanType: {
      type: String
    },
    loanAmount: {
      type: Number
    },
    loanPV: {
      type: Number
    },
    user: {
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
});
const Loan = mongoose.model('loans', loanSchema);

module.exports = Loan;
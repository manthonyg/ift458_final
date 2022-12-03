// Author: Michael Grandori
// About: This is the API controller views- uses the express render function to create the HTML content dynamically
// with whatever local variables we provide it


const loans = require('../dev-data/data/loans.json');

exports.getLandingPage = async (req, res) => {
  res.status(200).render('overview', {
    title: `Over View`,
    user: res.locals.user
  });
};

exports.getLoans = async (req, res) => {
  res.status(200).render('loans', {
    loans: loans
  })
};

exports.getLoan = async (req, res) => {
  res.status(200).render('Loan', {
    title: `Get Loan`
  });
};
exports.createNewLoan = async (req, res) => {
  res.status(200).render('newLoan', {
    title: `Create New Loan`
  });
};

exports.getSignInForm = (req, res) => {
  res.status(200).render('signIn', {
    title: 'Sign in New User'
  });
};
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignupForm = async (req, res) => {
  console.log('hit get signup form')
  res.status(200).render('newUser', {
    title: 'Signup'
  })
}


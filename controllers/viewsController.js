

exports.getLandingPage = async (req, res) => {
  res.status(200).render('overview', {
    title: `Over View`
  
  });
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


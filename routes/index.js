const loanRouter = require('./loanRoutes');
const authRouter = require('./authRoutes');

const LoanRoutes = {
  web: loanRouter.web,
  api: loanRouter.api
};

const AuthRoutes = {
  web: authRouter.web,
  api: authRouter.api
};

module.exports = {
  LoanRoutes, 
  AuthRoutes
};
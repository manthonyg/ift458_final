const express = require('express');
const loanController = require('../controllers/loanController');
const loanServlet = require('../servlet/loanServlet');

const api = express.Router();
const web = express.Router();

api.post('/loan', loanController.createLoan);
api.get('/', loanController.getMyLoans);

web.post('/loan', loanServlet.createLoan);
web.get('/', loanServlet.getMyLoans);

module.exports = {
  web,
  api
};

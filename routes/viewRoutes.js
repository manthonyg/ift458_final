//Author: Michael Grandori
// About: View routes to be generated dynamically by express and served as HTML

const express = require('express');
const viewsController = require('../controllers/viewsController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

router.get('/', jwtMiddleware, viewsController.getLandingPage);
router.get('/loan/:loanId', jwtMiddleware, viewsController.getLoan);
router.get('/loans', jwtMiddleware, viewsController.getLoans);
router.get('/newLoan', jwtMiddleware, viewsController.createNewLoan);
router.get('/login', viewsController.getLoginForm);
router.get('/signin', viewsController.getSignInForm);
router.get('/signup', viewsController.getSignupForm);


module.exports = router;

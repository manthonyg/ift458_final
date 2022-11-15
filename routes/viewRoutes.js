const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getLandingPAge);
router.get('/loans', viewsController.getLoans);
router.get('/login', viewsController.getLoginForm);
router.get('/signin', viewsController.getSignInForm);


module.exports = router;

const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getLandingPAge);
router.get('/Course', viewsController.getCourse);
router.get('/login', viewsController.getLoginForm);
router.get('/signIn', viewsController.getSignInForm);


module.exports = router;

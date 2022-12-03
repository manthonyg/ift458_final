const express = require('express');
const authController = require('./../controllers/authController');
const authServlet = require('./../servlet/authServlet');

const api = express.Router();
const web = express.Router();

// to hit our API
api.post('/signup', authController.signup);
api.post('/login', authController.login);
api.post('/logout', authController.logout);

// to hit out web layer that will reach out to our API
web.post('/signup', authServlet.signup);
web.post('/login', authServlet.login);
web.post('/logout', authServlet.logout);

module.exports = {
  web,
  api
}

//Author: Michael Grandori
// About: Either gets token from Authorization header or off of request cookie and verifies
// it was not tampered with by checking signature against the secret. Uses the payload
// to extract user information and store it in local variable.


const jwt = require('jsonwebtoken');
const AppError = require('../utilities/appError');

/**
 * 
 * @param {express req} req 
 * @param {express res} res 
 * @param {express next} next 
 * @description jwt middleware will check to see if either
 * an authorization header or cookie contains a valid signed 
 * JWT that has user session information attached to it
 */
const jwtMiddleware = (req, res, next) => {
  let token ;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1].replace(';', '');
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    next(new AppError("Invalid session"));
  }

  if (jwt.verify(token, process.env.JWT_SECRET)) {
    const userInfo = jwt.decode(token, process.env.JWT_SECRET);
    res.locals.user = userInfo;
    next();
  }
  else {
    next(new AppError("Invalid session"))
  }
}

module.exports = jwtMiddleware;
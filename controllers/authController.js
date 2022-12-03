// Author: Michael Grandori
// About: This is the API controller for auth routes- namely things like logging in, signing up, JWT session, and anything related to authentication/authorization

const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utilities/appError');
const mongoErrorMiddleware = require('./../middleware/mongoErrorMiddleware');

const signToken = (id, email, firstName, lastName) => {
  return jwt.sign({ id: id, email: email, firstName: firstName, lastName: lastName }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {

  const token = signToken(user._id, user.email, user.firstName, user.lastName);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(200).json({user});
};

exports.signup = async (req, res, next) => {
  console.log('req body in the controller', req.body)

  try {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  user.password = undefined;

  return res.status(201).json({
    status: 'success',
    user: user
  });

} catch(error) {
  mongoErrorMiddleware(error, req, res)
}

}

exports.login = async (req, res, next) => {
  console.log('hit login')
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(404).json({
      error: new AppError('Incorrect email or password', 401)}
    )
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({status: 'success'});
};
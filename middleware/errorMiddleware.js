// Author: Michael Grandori
// About: Catches fall through errors in the express app and redirects to /login

const errorMiddleware = (err, req, res, next) => {
 const errMessage = err.message;

 switch(errMessage) {
  case 'Invalid Session':
    return res.redirect('/login');
  default:
    return res.redirect('/login');
 }
}

module.exports = errorMiddleware;
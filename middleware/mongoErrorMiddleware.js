//Author: Michael Grandori
// About: A helper middleware to extract MongoDB specific errors and provide information
// to the user about what went wrong with retrieving or storing data

//handle email duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  res.status(code).json({messages: error, fields: field});
}
//handle field formatting
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map(el => el.message);
  let fields = Object.values(err.errors).map(el => el.path);
  let code = 400;
  if(errors.length > 1) {
    const formattedErrors = errors.join('')
    res
        .status(code)
        .json({error: formattedErrors});
    } else {
         res
           .status(code)
           .json({messages: errors, fields: fields})
    }
}
//error controller function
module.exports = (err, req, res, next) => {
try {
   if(err.name === 'ValidationError') return err = handleValidationError(err, res);
   if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
   } catch(err) {
       res
         .status(500)
         .send('An unknown error occurred.');
}
}
//Author: Michael Grandori
// About: Loan servlet provides an intermediate request step that will reach out to the API and serve the correct content
// html page through PUG back to the client/browser


const fetch = require('node-fetch');




exports.createLoan = async (req, res, next) => {

  try {
  const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`
  const response = await fetch(`${baseUrl}/api/v1/loans/loan`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
      'cookie': `jwt=${req.cookies.jwt}`}
  });
  const data = await response.json();

  switch(true) {
    case response.status === 400:
      return res.render('newLoan', {
        error: data
      });
  }

 res.redirect('/');

  } catch(error) {
    console.log('caught error')
    return res.status(400).render('newLoan', {
      error: ['There was a problem creating your loan']
    });
  }
}

exports.getMyLoans = async (req, res, next) => {

  try {
  const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`
  const response = await fetch(`${baseUrl}/api/v1/loans`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'cookie': `jwt=${req.cookies.jwt}`
    },
    
  });
  const data = await response.json();

  console.log(data.loans)
  return res.render('loans', {
        loans: data
      });
  } catch(error) {
    console.log('caught error in /loans')
    return res.status(400).render('loans', {
      error: ['There was a problem getting your loans']
    });
  }
}
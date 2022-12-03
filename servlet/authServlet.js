//Author: Michael Grandori
// About: Auth servlet provides an intermediate request step that will reach out to the API and serve the correct content
// html page through PUG back to the client/browser

const fetch = require('node-fetch');
var setCookie = require('set-cookie-parser');



exports.signup = async (req, res, next) => {
 
  try {
  const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`
  const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();

  switch(true) {
    case response.status === 409:
    case response.status === 400:
      return res.render('newUser', {
        error: data
      });
  }

  // Now redirect the user to login
  res.redirect('/login');
 
  } catch(error) {
    return res.status(400).render('newUser', {
      error: error
    });
  }
}


exports.login = async (req, res, next) => {
 
  try {
  const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`
  const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();

  switch(true) {
    case response.status === 409:
    case response.status === 400:
      return res.render('login', {
        error: data
      });
  }

  const sessionCookie = setCookie.parseString(response.headers.get('set-cookie'));

  res.cookie(sessionCookie.name, sessionCookie.value, {expires: sessionCookie.expires, httpOnly: sessionCookie.httpOnly})

  res.redirect('/');
 
  } catch(error) {
    return res.status(400).render('login', {
      error: error
    });
  }
}

exports.logout = async (req, res, next) => {
 
  try {
  const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`
  const response = await fetch(`${baseUrl}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  res.cookie('jwt', 'loggedout');
  res.redirect('/login');
 
  } catch(error) {
    return res.status(400).render('login', {
      error: error
    });
  }
}

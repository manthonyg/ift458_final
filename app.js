const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser')

// routers 
const viewRouter = require('./routes/viewRoutes');
const { LoanRoutes, AuthRoutes } = require('./routes');
const jwtMiddleware = require('./middleware/jwtMiddleware');

const app = express();

// parse cookies
app.use(cookieParser());

// parse urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// set view engine for PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// 3) VIEW ROUTER
// this serves our PUG files from our 
// /views directory
app.use('/', viewRouter);


// 4 SERVLET ROUTER
// this is a servlet within our app to hit our api
// and generate the new view based on the response.
// this is built so the logic between the API and 
// the app do not become tightly coupled
app.use('/servlet/auth', AuthRoutes.web);
app.use('/servlet/loans', jwtMiddleware, LoanRoutes.web);

// 5 API ROUTER
// this is our isolated API that can be used via a client
// CLI like postman or consumed by our web app.
app.use('/api/v1/auth', AuthRoutes.api );
app.use('/api/v1/loans', jwtMiddleware, LoanRoutes.api);

// ERROR HANDLER
app.use(errorMiddleware);

module.exports = app;

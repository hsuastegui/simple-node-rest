// Import Dependencies
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Connect to DB
const mongoose = require('./models/db');
const GQLSchema = require('./models/GQLSchema');

// Import Controllers
const index = require('./controllers/index');
const products = require('./controllers/products');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Logger
app.use(logger('dev'));
// Parse information from POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static Assets
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/api/products', products);
app.use('/graphql', graphqlHTTP({
  schema: GQLSchema,
  graphiql: true
}));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running in http://localhost:${PORT}`);
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// connect to dbs
var openBikesDB = require('./db/openBikesDB');
var usersDB = require('./db/usersDB');

var indexRouter = require('./routes/index');
var addBikeRouter = require('./routes/addBike');
var addUserRouter = require('./routes/addUser');
var getBikesRouter = require('./routes/getBikes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addBike', addBikeRouter);
app.use('/addUser', addUserRouter);
app.use('/getBikes', getBikesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
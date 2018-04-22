const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const logger = require('morgan');
var bodyParser = require('body-parser');

var orders = require('./routes/orders');
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', orders);
app.use('/users', users);
app.use('/goods', goods);

app.use(cookieSession({
  name: 'session',
  keys: ['azhou'],  //secret keys
  //cookie options
  maxAge: 24 * 60 * 60 * 1000 //存储24小时
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

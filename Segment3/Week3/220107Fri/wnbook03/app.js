/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-07 19:55:32 Fri
 * @LastEditTime: 2022-01-11 18:17:36 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

var bookRouter = require('./routes/bookRouter');
var usersRouter = require('./routes/userRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/book', bookRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

let server = app.listen(3000, () => {
  console.log(`服务器端已经开启(${server.address().port})...`);
});

// model.exports = app;

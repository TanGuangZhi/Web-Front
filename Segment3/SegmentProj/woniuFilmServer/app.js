/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:25 Thu
 * @LastEditTime: 2022-03-02 20:37:01 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoutes');
var cinemaRoutes = require('./routes/cinemaRoutes');
let cinemaRoomRoutes = require('./routes/cinemaRoomRoutes');
let filmRoutes = require('./routes/filmRoutes');
let orderRoutes = require('./routes/orderRoutes');
let commentRoutes = require('./routes/commentRoutes');

var app = express();
var allowCrossDomain = function (req, res, next) {
  // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）   
  res.header("Access-Control-Allow-Origin", "*");
  // 设置允许跨域访问的请求头
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
  // 设置允许跨域访问的请求类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/cinema', cinemaRoutes);
app.use('/cinemaRoom', cinemaRoomRoutes);
app.use('/film', filmRoutes);
app.use('/order', orderRoutes);
app.use('/comment', commentRoutes);

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



// let server = app.listen(3000, () => {
//   console.log(`服务器已经开启(${server.address().port})...`);
// });


module.exports = app;

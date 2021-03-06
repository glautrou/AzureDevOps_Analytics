var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');

var indexRouter = require('./routes/index');
var applicationsRouter = require('./routes/applications');
var sonarRouter = require('./routes/sonar');
var azdevRouter = require('./routes/azdev');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (app.get('env') === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/applications', applicationsRouter);
app.use('/sonar', sonarRouter);
app.use('/azdev', azdevRouter);

if (app.get('env') === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '_client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '_client/build', 'index.html'));
  });
}

app.use('/', indexRouter);

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

console.log('Environment: ' + config.get('env'));

module.exports = app;

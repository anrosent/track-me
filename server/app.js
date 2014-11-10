var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Init routes
var routes = require('./routes/index');

// Init app
var app = express();

// Init middleware
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Init logging to append-only file
var reqLog = fs.createWriteStream(__dirname + '/logs/requests.log', {
    flags: 'a'
});

app.use(logger({
    stream: reqLog,
}));

// Connect routes
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: true
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: true
    });
});


module.exports = app;

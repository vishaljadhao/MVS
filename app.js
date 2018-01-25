var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    routes = require('./server/routes/index'),
    auth = require('./server/routes/auth'),
    users = require('./server/routes/users'),
    partners = require('./server/routes/partners'),
    app = express(),
    passport = require('passport'),
    expressSession = require('express-session'),
    dbConfig = require('./db'),
    flash = require('connect-flash'),
    emailService = require('./server/services/email.js'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto'),
    User = require('./server/models/user-model'),
    partnerModel = require('./server/models/partner-model');

// view engine setup
app.set('views', path.join(__dirname, 'client/views'));
// app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// Connect to MongoDB
mongoose.connect(dbConfig.url);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));
app.locals.basedir = path.join(__dirname, 'client/public');

// Configuring Passport
app.use(expressSession({
    secret: 'MVSSecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash());

// Initialize Passport
var initPassport = require('./server/passport/init');
initPassport(passport);

app.use('/', routes);
app.use('/auth', auth);
app.use('/api/aspirants', users);
app.use('/api/providers', partners);

emailService.init(app);

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) done(err);
        if (user) {
            done(null, user);
        } else {
            partnerModel.findById(id, function(err, user) {
                if (err) done(err);
                done(null, user);
            })
        }
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
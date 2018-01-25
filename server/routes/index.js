var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    // res.redirect('/');
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.render('index', {
        title: 'Vehicle Services',
        message: err,
        info: info
    });
}

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

/* GET SignIn Page */
router.get('/sign-in', function(req, res) {
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.render('sign-in', {
        message: err,
        info: info
    });
});

/* GET Forgot Page */
router.get('/forgot', function(req, res) {
    var err = req.flash('message')[0];
    res.render('forgot', {
        user: req.user,
        message: err
    });
});

/* GET SignUp Page */
router.get('/sign-up', function(req, res) {
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.render('sign-up', {
        message: err,
        info: info
    });
});

/* GET UserHome Page */
router.get('/', isAuthenticated, function(req, res) {
    var success = req.flash('success')[0], homePage = 'home';
    if (req.user.role == 'serviceProvider')
        homePage = 'partner-dashboard';
    res.render(homePage, {
        user: req.user,
        success: success
    });
});

/* GET User Booking Page */
router.get('/providers/:id', isAuthenticated, function(req, res) {
    var success = req.flash('success')[0];
    res.render('booking', {
        user: req.user,
        success: success
    });
});


/* GET User Dashboard Page */
router.get('/dashboard', isAuthenticated, function(req, res) {
    var success = req.flash('success')[0];
    res.render('dashboard', {
        user: req.user,
        success: success
    });
});

/* GET User Dashboard Page */
router.get('/account', isAuthenticated, function(req, res) {
    var success = req.flash('success')[0];
    res.render('account', {
        user: req.user,
        success: success
    });
});

/* GET Partner Page */
router.get('/partner', function(req, res) {
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.render('partner', {
        message: err,
        info: info
    });
});

/* GET Partner SignIn Page */
router.get('/partner-signin', function(req, res) {
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.render('partner-signin', {
        message: err,
        info: info
    });
});

router.get('/partner-registration', function(req, res) {
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.render('partner-registration', {
        message: err,
        info: info
    });
});

/* GET Partner Dashboard Page */
router.get('/partner-dashboard', isAuthenticated, function(req, res) {
    var success = req.flash('success')[0];
    res.render('partner-dashboard', {
        user: req.user,
        success: success
    });
});


/* GET Partner Settings Page */
router.get('/partner-settings', isAuthenticated, function(req, res) {
    var success = req.flash('success')[0];
    res.render('partner-settings', {
        user: req.user,
        success: success
    });
});


module.exports = router;

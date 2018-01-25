var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    async = require('async'),
    crypto = require('crypto'),
    bCrypt = require('bcrypt-nodejs'),
    User = require('../models/user-model'),
    env = process.env.NODE_ENV || "development",
    config = require('../../config/config.json')[env],
    emailService = require('../services/email.js');

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var resetUrl = 'http://' + req.headers.host + '/reset/' + token;
            emailService.resetPasswordLink(user.email, user.fullName, token);
            req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            res.redirect('/');
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', function(req, res) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function(err, user) {
        var token = req.params.token;
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {
            token: token,
            user: req.user
        });
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                user.password = createHash(req.body.password);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
            });
        },
        function(user, done) {
            emailService.passwordChanged(user.email, user.fullName);
            req.flash('success', 'Success! Your password linked with ' + user.email + ' has been changed.');
            res.redirect('/');
        }
    ], function(err) {
        res.redirect('/');
    });
});

/* Handle Partner Login POST */
router.post('/partner-login', passport.authenticate('partner-login', {
    successRedirect: '/partner-dashboard',
    failureRedirect: '/partner-signin',
    failureFlash: true
}));

/* Handle Partner Registration POST */
router.post('/partner-signup', passport.authenticate('partner-signup', {
    successRedirect: '/partner-dashboard',
    failureRedirect: '/partner',
    failureFlash: true
}));

// Generates hash using bCrypt
var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* Handle Logout */
router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;